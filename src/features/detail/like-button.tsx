"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { useAuthStatus } from "@/hook/use-auth-status";
import { useUserLike } from "@/hook/use-user-like";
import { FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import { GoHeart, GoHeartFill } from "react-icons/go";

const { WARNING } = ALERT_TYPE;

type LikeButton = {
  contentId: FilteredDetailData["id"];
};

const LikeButton = ({ contentId }: LikeButton) => {
  const { user } = useAuthStatus();
  const { isUserLike } = useUserLike(contentId);

  const handleLike = async () => {
    if (!user) {
      return alert({
        type: WARNING,
        message: "로그인이 필요합니다.",
      });
    } else {
    }
  };
  return (
    <button onClick={handleLike}>
      {isUserLike ? <GoHeartFill aria-label="찜 버튼" /> : <GoHeart aria-label="찜 해제 버튼" />}
    </button>
  );
};

export default LikeButton;
