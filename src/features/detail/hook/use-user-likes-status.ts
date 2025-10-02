import { ALERT_TYPE } from "@/constants/alert-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { addToUserLikes, deleteFromUserLikes } from "@/features/detail/api/server-actions";
import { usePendingLikesStore } from "@/store/use-pending-likes-store";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import type { USER_LIKES_BY_INFINITE_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { alert } from "@/utils/alert";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
const { LIKED_CONTENTS, IS_LIKED } = QUERY_KEYS;
const { SUCCESS, ERROR, WARNING } = ALERT_TYPE;
const { UNKNOWN_ERROR } = DEFAULT_ERROR_MESSAGE;
type UserLikesStatus = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  user: User | null;
  isInitLiked: boolean;
};
const useUserLikesStatus = ({ contentId, contentType, user, isInitLiked }: UserLikesStatus) => {
  const userId = user?.id ?? null;
  const { addToPendingLikes, removeFromPendingLikes } = usePendingLikesStore();
  const [isLiked, setIsLiked] = useState(isInitLiked);
  const queryClient = useQueryClient();

  const handleChange = () => {
    if (!user || !userId)
      return alert({
        type: WARNING,
        message: "로그인이 필요합니다.",
      });
    if (!isLiked) handleAddToUserLikes();
    else handleRemoveFromUserLikes();
  };

  const handleAddToUserLikes = async () => {
    if (!userId) return;
    setIsLiked(true);
    const res = await addToUserLikes({ contentType, contentId, userId });
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: [IS_LIKED, userId, contentId] });
      addToPendingLikes(contentId, contentType);
      alert({
        type: SUCCESS,
        message: res.message as string,
      });
    } else {
      setIsLiked(false);
      alert({
        type: ERROR,
        message: res.message || UNKNOWN_ERROR,
      });
    }
  };

  const handleRemoveFromUserLikes = async () => {
    if (!userId) return;
    setIsLiked(false);
    const res = await deleteFromUserLikes(userId, contentId);
    if (res.success) {
      alert({
        type: SUCCESS,
        message: res.message as string,
      });
      removeFromPendingLikes(contentId);
      queryClient.invalidateQueries({ queryKey: [IS_LIKED, userId, contentId] });
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
    } else {
      setIsLiked(true);
      alert({
        type: ERROR,
        message: res.message || UNKNOWN_ERROR,
      });
    }
  };

  return {
    handleChange,
    isLiked,
  };
};

export default useUserLikesStatus;
