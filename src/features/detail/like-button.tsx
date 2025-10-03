"use client";
import useUserLikesStatus from "@/features/detail/hook/use-user-likes-status";
import type { FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { GoHeart, GoHeartFill } from "react-icons/go";

type LikeButton = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  user: User | null;
  isInitLiked: boolean;
};

const LikeButton = ({ contentId, contentType, user, isInitLiked }: LikeButton) => {
  const { handleChange, isLiked } = useUserLikesStatus({ contentId, contentType, user, isInitLiked });

  return (
    <button onClick={handleChange}>
      {isLiked ? <GoHeartFill aria-label="찜 해제 버튼" /> : <GoHeart aria-label="찜 버튼" />}
    </button>
  );
};

export default LikeButton;
