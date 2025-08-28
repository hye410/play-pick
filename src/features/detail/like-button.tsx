"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { useAuthStatus } from "@/hook/use-auth-status";
import type { FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

const { WARNING } = ALERT_TYPE;

type LikeButton = {
  contentId: FilteredDetailData["id"];
  initialLikeStatus: boolean;
};

const LikeButton = ({ initialLikeStatus }: LikeButton) => {
  const { user } = useAuthStatus();
  const [isLiked, setIsLiked] = useState<boolean>(initialLikeStatus);
  const handleLike = async () => {
    if (!user) {
      return alert({
        type: WARNING,
        message: "로그인이 필요합니다.",
      });
    } else {
      // 찜 추가
      // 찜 해제
    }
  };
  return (
    <button onClick={handleLike}>
      {isLiked ? <GoHeartFill aria-label="찜 버튼" /> : <GoHeart aria-label="찜 해제 버튼" />}
    </button>
  );
};

export default LikeButton;

// const { isUserLike } = useUserLike(contentId);
