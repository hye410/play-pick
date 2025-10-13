import { ALERT_TYPE } from "@/constants/alert-constants";
import { TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import useAddUserLikeMutation from "@/hook/use-add-user-like-mutation";
import useCheckUserLikes from "@/hook/use-check-user-likes";
import useDeleteUserLikeMutation from "@/hook/use-delete-user-like-mutation";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import type { USER_LIKES_BY_INFINITE_TYPE } from "@/types/user-likes-type";
import { alert } from "@/utils/alert";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const { WARNING } = ALERT_TYPE;
const { REQUIRE_SIGN_IN } = TOGGLE_LIKES_MESSAGE;
const { LIKED_CONTENTS } = QUERY_KEYS;
type UserLikesStatus = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  userId: User["id"] | null;
  isInitLiked: boolean;
};
const useUserLikesStatus = ({ contentId, contentType, userId, isInitLiked }: UserLikesStatus) => {
  const { mutate: addToUserLikes } = useAddUserLikeMutation(userId!);
  const { mutate: deleteFromUserLikes } = useDeleteUserLikeMutation(userId!);
  const { isUserLike } = useCheckUserLikes(userId!, contentId);
  const [isLiked, setIsLiked] = useState(isInitLiked);
  const queryClient = useQueryClient();
  useEffect(() => {
    setIsLiked(isUserLike || false);
  }, [isUserLike]);

  const handleChange = () => {
    if (!userId)
      return alert({
        type: WARNING,
        message: REQUIRE_SIGN_IN,
      });
    if (!isUserLike) addToUserLikes({ id: contentId, type: contentType });
    else handleRemoveFromUserLikes(contentId);
  };

  const handleRemoveFromUserLikes = async (contentId: UserLikesStatus["contentId"]) => {
    deleteFromUserLikes(contentId);
    queryClient.setQueryData([LIKED_CONTENTS, userId], (oldData: USER_LIKES_BY_INFINITE_TYPE) => {
      if (!oldData) return oldData;
      const updatedPages = oldData.pages.map((page: { contents: Array<CombinedData> }) => ({
        ...page,
        contents: page.contents.filter(({ id }) => id !== contentId),
      }));
      return {
        ...oldData,
        pages: updatedPages,
      };
    });
  };

  return {
    handleChange,
    isLiked,
    isUserLike,
  };
};

export default useUserLikesStatus;
