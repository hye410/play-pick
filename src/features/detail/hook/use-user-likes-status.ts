"use client";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition, useOptimistic } from "react";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { useLikedContentMutation } from "@/features/my-page/hook/use-liked-contents-mutation";
import { addToUserLikes, deleteFromUserLikes } from "@/features/detail/api/server-actions";
import { useUserLikesQuery } from "@/hook/use-user-likes-query";
import type { FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { alert } from "@/utils/alert";

const { ERROR, SUCCESS } = ALERT_TYPE;
const { USER_LIKES } = QUERY_KEYS;

export const useUserLikesStatus = (
  contentId: FilteredDetailData["id"],
  contentType: FilteredDetailData["type"],
  user: User | null,
) => {
  if (!user) return;
  const userId = user.id;
  const queryClient = useQueryClient();
  const { userLikes, isUserLikesError, userLikesErrorMessage } = useUserLikesQuery(userId!);

  if (isUserLikesError) {
    alert({
      type: ERROR,
      message: userLikesErrorMessage as string,
    });
  }

  const likedIds = userLikes?.map(({ id }) => id);
  const isLikedContent = likedIds?.some((id) => id === contentId) ?? false;
  const [isOptimisticLiked, addOptimisticToggle] = useOptimistic(isLikedContent);
  const { getLikedContentMutate } = useLikedContentMutation(userId!);

  const handleToggle = () => {
    startTransition(async () => {
      addOptimisticToggle(!isOptimisticLiked);
      if (isOptimisticLiked) await handleRemoveFromUserLikes();
      else await handleAddToUserLikes();
    });
  };

  const handleAddToUserLikes = async () => {
    const res = await addToUserLikes({ contentType, contentId, userId });
    if (res.success) {
      getLikedContentMutate({ id: contentId, type: contentType });
      alert({
        type: SUCCESS,
        message: res.message as string,
      });
    } else {
      addOptimisticToggle(isOptimisticLiked);
      alert({
        type: ERROR,
        message: res.message as string,
      });
    }
  };

  const handleRemoveFromUserLikes = async () => {
    const res = await deleteFromUserLikes(userId, contentId);
    if (res.success) {
      //queryKey가 연결되어 있어서 userLikes 캐싱만 처리해도 liked_contents캐싱은 자동으로 해결될 거 같음
      queryClient.invalidateQueries({ queryKey: [USER_LIKES, userId] });
      alert({
        type: SUCCESS,
        message: res.message as string,
      });
    } else {
      addOptimisticToggle(isOptimisticLiked);
      alert({
        type: ERROR,
        message: res.message as string,
      });
    }
  };

  return {
    handleToggle,
    isCurrentLiked: isOptimisticLiked,
  };
};
