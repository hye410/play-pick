"use client";
import type { CombinedData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
const { LIKED_CONTENTS } = QUERY_KEYS;

const useLikedContentsStatus = (userId: User["id"], userLikes?: Array<USER_LIKES_TYPE>) => {
  const queryClient = useQueryClient();
  const { fetchFailedData } = useFetchFailedData(userId);
  const cachedLikedContents: Array<CombinedData> = queryClient.getQueryData([LIKED_CONTENTS, userId]) ?? [];
  const cachedSuccessIds = new Set(cachedLikedContents.map((content) => content.id));
  const cachedFailedIds = new Set(fetchFailedData.map((data) => data.id));

  const dataToFetch =
    userLikes?.filter((like) => !cachedSuccessIds.has(like.id) && !cachedFailedIds.has(like.id)) ?? [];

  return {
    dataToFetch,
    fetchFailedData,
  };
};
export default useLikedContentsStatus;
