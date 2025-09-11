"use client";
import { A_DAY } from "@/constants/fetch-time-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getUserLikes } from "@/features/detail/api/services";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
const { USER_LIKES } = QUERY_KEYS;

export const useUserLikesQuery = (userId: User["id"]) => {
  const {
    data: userLikes,
    isLoading: isUserLikesLoading,
    error: userLikesError,
  } = useQuery<Array<USER_LIKES_TYPE>, Error>({
    queryKey: [USER_LIKES, userId],
    queryFn: () => getUserLikes(userId),
    enabled: !userId,
    staleTime: A_DAY,
  });
  return {
    userLikes,
    isUserLikesLoading,
    userLikesError,
  };
};
