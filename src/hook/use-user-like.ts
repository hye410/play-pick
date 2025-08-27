"use client";

import { A_DAY } from "@/constants/fetch-time-constants";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getUserLikes } from "@/features/detail/api/services";
import { useQuery } from "@tanstack/react-query";
import { useAuthStatus } from "./use-auth-status";
import type { FilteredDetailData } from "@/types/contents-types";

const { LIKES } = QUERY_KEYS;
export const useUserLike = (contentId: FilteredDetailData["id"]) => {
  const { user } = useAuthStatus();

  const userId = user?.id;

  const { data: userLikes } = useQuery({
    queryKey: [LIKES, userId],
    queryFn: () => getUserLikes(userId),
    enabled: !!user,
    staleTime: A_DAY,
  });

  const isUserLike = userLikes ? userLikes.includes(contentId) : false;

  return {
    isUserLike,
  };
};
