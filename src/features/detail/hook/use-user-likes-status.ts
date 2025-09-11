"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { toggleLikeStatus } from "@/features/detail/api/server-service";
import type { FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import { startTransition, useOptimistic } from "react";
import { useAuthStatus } from "@/hook/use-auth-status";

const { ERROR, SUCCESS, WARNING } = ALERT_TYPE;

export const useUserLikesStatus = (
  contentType: FilteredDetailData["type"],
  contentId: FilteredDetailData["id"],
  isLikedContent: boolean,
) => {
  const { user } = useAuthStatus();
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
        const res = await toggleLikeStatus(contentType, contentId, isLikedContent);
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
