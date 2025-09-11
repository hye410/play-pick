"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { useUserLikesQuery } from "@/hook/use-user-likes-query";
import type { FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition, useOptimistic } from "react";
import { deleteUserLikesStatus, postUserLikesStatus } from "../api/services";

const { ERROR, SUCCESS, WARNING } = ALERT_TYPE;
const { USER_LIKES } = QUERY_KEYS;
export const useUserLikesStatus = (
  contentId: FilteredDetailData["id"],
  contentType: FilteredDetailData["type"],
  user: User | null,
) => {
  const queryClient = useQueryClient();
  const { userLikes } = useUserLikesQuery(user?.id!);
  const likedIds = userLikes?.map(({ id }) => id);
  const isLikedContent = likedIds?.some((id) => id === contentId) ?? false;

  const [isOptimisticLiked, addOptimisticToggle] = useOptimistic(isLikedContent);

  const handleToggle = () => {
    if (!user) {
      return alert({
        type: WARNING,
        message: "로그인이 필요합니다.",
      });
    }
    startTransition(async () => {
      addOptimisticToggle(!isOptimisticLiked);
      try {
        const resultMessage = isOptimisticLiked
          ? await deleteUserLikesStatus(user.id, contentId)
          : await postUserLikesStatus({
              contentType,
              contentId,
              userId: user.id,
            });
        if (user) queryClient.invalidateQueries({ queryKey: [USER_LIKES, user.id] });
        alert({
          type: SUCCESS,
          message: resultMessage,
        });
      } catch (error) {
        addOptimisticToggle(isOptimisticLiked);
        alert({
          type: ERROR,
          message: error as string,
        });
      }
    });
  };
  return {
    handleToggle,
    isCurrentLiked: isOptimisticLiked,
  };
};
