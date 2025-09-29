import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import useUserLikesQuery from "@/hook/use-user-likes-query";
import { addToUserLikes, deleteFromUserLikes } from "@/features/detail/api/server-actions";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { alert } from "@/utils/alert";
import useLikedContentMutation from "@/features/detail/hook/use-liked-content-mutation";
const { WARNING } = ALERT_TYPE;

const { USER_LIKES, LIKED_CONTENTS } = QUERY_KEYS;

type UserLikesStatus = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  user: User | null;
  isInitLiked: boolean;
};
const { SUCCESS, ERROR } = ALERT_TYPE;
const useUserLikesStatus = ({ contentId, contentType, user, isInitLiked }: UserLikesStatus) => {
  const userId = user?.id ?? null;
  const { userLikes } = useUserLikesQuery(userId);
  const { getLikedContentMutate } = useLikedContentMutation(userId);
  const [isLiked, setIsLiked] = useState(isInitLiked);
  const queryClient = useQueryClient();
  useEffect(() => {
    const isCurrentLiked: boolean = userLikes?.some((userLike) => userLike.id === contentId) ?? isInitLiked;
    setIsLiked(isCurrentLiked);
  }, [userLikes, isInitLiked, contentId]);

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
      getLikedContentMutate({ id: contentId, type: contentType });
      queryClient.invalidateQueries({ queryKey: [USER_LIKES, userId] });
      alert({
        type: SUCCESS,
        message: res.message as string,
      });
    } else {
      setIsLiked(false);
      alert({
        type: ERROR,
        message: res.message as string,
      });
    }
  };

  const handleRemoveFromUserLikes = async () => {
    if (!userId) return;
    setIsLiked(false);
    const res = await deleteFromUserLikes(userId, contentId);
    if (res.success) {
      queryClient.invalidateQueries({ queryKey: [USER_LIKES, userId] });
      queryClient.setQueryData([LIKED_CONTENTS, userId], (oldData: Array<CombinedData>) => {
        return oldData.filter((d) => d.id !== contentId);
      });
      alert({
        type: SUCCESS,
        message: res.message as string,
      });
    } else {
      setIsLiked(true);
      alert({
        type: ERROR,
        message: res.message as string,
      });
    }
  };

  return {
    handleChange,
    isLiked,
  };
};

export default useUserLikesStatus;
