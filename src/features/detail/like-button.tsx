"use client";
import { useUserLikesStatus } from "@/features/detail/hook/use-user-likes-status";
import { useUserLikesQuery } from "@/hook/use-user-likes-query";
import type { FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { GoHeart, GoHeartFill } from "react-icons/go";

type LikeButton = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  userId?: User["id"];
};

const LikeButton = ({ contentId, contentType, userId }: LikeButton) => {
  const { userLikes } = useUserLikesQuery(userId!);
  const isLikedContent = userLikes?.some((like) => like.id === contentId) ?? false;
  const { handleToggle, isCurrentLiked } = useUserLikesStatus(contentType, contentId, isLikedContent);

  return (
    <button onClick={handleToggle}>
      {isCurrentLiked ? <GoHeartFill aria-label="찜 버튼" /> : <GoHeart aria-label="찜 해제 버튼" />}
    </button>
  );
};

export default LikeButton;
