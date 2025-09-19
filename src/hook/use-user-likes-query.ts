"use client";
import { A_DAY } from "@/constants/fetch-time-constants";
import { USER_LIKES_MESSAGE } from "@/constants/message-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getUserLikes } from "@/features/detail/api/server-actions";
import type { UserLikesState } from "@/types/server-action-return-type";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
const { USER_LIKES } = QUERY_KEYS;
const { FETCH_FAIL } = USER_LIKES_MESSAGE;

export const useUserLikesQuery = (userId: User["id"]) => {
  const { data: response, isLoading: isUserLikesLoading } = useQuery<UserLikesState, Error>({
    queryKey: [USER_LIKES, userId],
    queryFn: () => getUserLikes(userId),
    enabled: !!userId,
    staleTime: A_DAY,
  });

  const userLikes: Array<USER_LIKES_TYPE> = response?.success ? response.userLikes : [];

  return {
    userLikes,
    isUserLikesLoading,
    isUserLikesError: response?.success === false,
    userLikesErrorMessage: !response?.success ? response?.message : null,
  };
};
