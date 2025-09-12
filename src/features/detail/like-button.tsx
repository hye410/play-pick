"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { useUserLikesStatus } from "@/features/detail/hook/use-user-likes-status";
import type { FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import type { User } from "@supabase/supabase-js";
import { GoHeart, GoHeartFill } from "react-icons/go";

type LikeButton = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  user: User | null;
};
const { WARNING } = ALERT_TYPE;
const LikeButton = ({ contentId, contentType, user }: LikeButton) => {
  const requireSignIn = () => {
    return alert({
      type: WARNING,
      message: "로그인이 필요합니다.",
    });
  };
  if (!user)
    return (
      <button onClick={requireSignIn}>
        <GoHeart aria-label="찜 버튼" />
      </button>
    );

  const { handleToggle, isCurrentLiked } = useUserLikesStatus(contentId, contentType, user);

  return (
    <button onClick={handleToggle}>
      {isCurrentLiked ? <GoHeartFill aria-label="찜 해제 버튼" /> : <GoHeart aria-label="찜 버튼" />}
    </button>
  );
};

export default LikeButton;
