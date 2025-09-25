"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getUserLikes } from "@/features/detail/api/server-actions";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const { USER_LIKES } = QUERY_KEYS;

const useUserLikesQuery = (userId: User["id"] | null) => {
  const {
    data: userLikes,
    isLoading: isUserLikesLoading,
    isError: isUserLikesError,
    error: userLikesError,
  } = useQuery<Array<USER_LIKES_TYPE>, Error>({
    queryKey: [USER_LIKES, userId],
    queryFn: async () => {
      const res = await getUserLikes(userId!);
      if (res.success) return res.userLikes ?? [];
      else if (!res.success && res.message) throw new Error(res.message);
    },
    enabled: !!userId,
    refetchOnWindowFocus: true,
  });

  return {
    userLikes,
    isUserLikesLoading,
    isUserLikesError,
    userLikesError,
  };
};

export default useUserLikesQuery;
