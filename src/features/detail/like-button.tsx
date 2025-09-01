"use client";
import { useUserLike } from "@/hook/use-user-like";
import type { FilteredDetailData } from "@/types/contents-types";
import { GoHeart, GoHeartFill } from "react-icons/go";

type LikeButton = {
  contentId: FilteredDetailData["id"];
  isInitialLiked: boolean;
};

const LikeButton = ({ contentId, isInitialLiked }: LikeButton) => {
  const { handleToggle, isLiked } = useUserLike(contentId, isInitialLiked);

  return (
    <button onClick={handleToggle}>
      {isLiked ? <GoHeartFill aria-label="찜 버튼" /> : <GoHeart aria-label="찜 해제 버튼" />}
    </button>
  );
};

export default LikeButton;
