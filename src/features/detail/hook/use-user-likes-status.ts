"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { toggleLikeStatus } from "@/features/detail/api/server-service";
import { useAuthStatus } from "@/hook/use-auth-status";
import type { FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition, useOptimistic } from "react";

const { ERROR, SUCCESS, WARNING } = ALERT_TYPE;
const { USER_LIKES } = QUERY_KEYS;
export const useUserLikesStatus = (
  contentType: FilteredDetailData["type"],
  contentId: FilteredDetailData["id"],
  isLikedContent: boolean,
) => {
  const { user } = useAuthStatus();
  const [isOptimisticLiked, addOptimisticToggle] = useOptimistic(isLikedContent);
  const queryClient = useQueryClient();
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
        const res = await toggleLikeStatus(contentType, contentId, isLikedContent);
        if (user) queryClient.invalidateQueries({ queryKey: [USER_LIKES, user.id] });
        alert({
          type: SUCCESS,
          message: res.message,
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
