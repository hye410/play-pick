import { ALERT_TYPE } from "@/constants/alert-constants";
import { TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";
import useAddUserLikeMutation from "@/hook/use-add-user-like-mutation";
import useCheckUserLikes from "@/hook/use-check-user-likes";
import useDeleteUserLikeMutation from "@/hook/use-delete-user-like-mutation";
import type { FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { alert } from "@/utils/alert";
import { useEffect, useState } from "react";

const { WARNING } = ALERT_TYPE;

const { REQUIRE_SIGN_IN } = TOGGLE_LIKES_MESSAGE;
type UserLikesStatus = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  user: User | null;
  isInitLiked: boolean;
};
const useUserLikesStatus = ({ contentId, contentType, user, isInitLiked }: UserLikesStatus) => {
  const userId = user?.id ?? null;
  const { mutate: addToUserLikes } = useAddUserLikeMutation(userId!);
  const { mutate: deleteFromUserLikes } = useDeleteUserLikeMutation(userId!);
  const { isUserLike } = useCheckUserLikes(user?.id!, contentId);
  const [isLiked, setIsLiked] = useState(isInitLiked);

  useEffect(() => {
    setIsLiked(isUserLike || false);
  }, [isUserLike]);

  const handleChange = () => {
    if (!user || !userId)
      return alert({
        type: WARNING,
        message: REQUIRE_SIGN_IN,
      });
    if (!isUserLike) addToUserLikes({ id: contentId, type: contentType });
    else deleteFromUserLikes(contentId);
  };

  const handleRemoveFromUserLikes = async () => {
    deleteFromUserLikes(contentId);

    // queryClient.setQueryData([LIKED_CONTENTS, userId], (oldData: USER_LIKES_BY_INFINITE_TYPE) => {
    //   if (!oldData) return oldData;
    //   const updatedPages = oldData.pages.map((page: { contents: Array<CombinedData> }) => ({
    //     ...page,
    //     contents: page.contents.filter(({ id }) => id !== contentId),
    //   }));
    //   return {
    //     ...oldData,
    //     pages: updatedPages,
    //   };
    // });
  };

  return {
    handleChange,
    isLiked,
  };
};

export default useUserLikesStatus;
