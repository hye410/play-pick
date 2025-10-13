"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import useLikedSingleContentMutation from "@/features/detail/hook/use-liked-single-content-mutation";
import useUserLikesStatus from "@/features/detail/hook/use-user-likes-status";
import type { FilteredDetailData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
const { LIKED_CONTENTS } = QUERY_KEYS;
type LikeButton = {
  contentId: FilteredDetailData["id"];
  contentType: FilteredDetailData["type"];
  userId: User["id"] | null;
  isInitLiked: boolean;
};

const LikeButton = ({ contentId, contentType, userId, isInitLiked }: LikeButton) => {
  const { handleChange, isLiked } = useUserLikesStatus({ contentId, contentType, userId, isInitLiked });
  const { getSingleContent } = useLikedSingleContentMutation(userId);
  const queryClient = useQueryClient();
  const isLikedRef = useRef(isLiked);
  useEffect(() => {
    isLikedRef.current = isLiked;
  }, [isLiked]);

  useEffect(() => {
    return () => {
      const currentLiked = isLikedRef.current;
      const updateCachedLikedContents = async () => {
        try {
          if (!userId) return;
          await getSingleContent({ id: contentId, type: contentType });
          queryClient.invalidateQueries({ queryKey: [LIKED_CONTENTS, userId] });
        } catch (error) {
          console.error(`${contentId}를 LICKED_CONTENTS에 캐싱하는데 실패했습니다.\n원인 => `, error);
        }
      };
      if (!isInitLiked && currentLiked) updateCachedLikedContents();
    };
  }, []);

  return (
    <button onClick={handleChange}>
      {isLiked ? <GoHeartFill aria-label="찜 해제 버튼" /> : <GoHeart aria-label="찜 버튼" />}
    </button>
  );
};

export default LikeButton;
