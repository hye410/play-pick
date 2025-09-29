"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";

const { FAIL_CONTENTS } = QUERY_KEYS;
const useFetchFailedData = (userId: User["id"]) => {
  const queryClient = useQueryClient();
  const fetchFailedData: Array<USER_LIKES_TYPE> = queryClient.getQueryData([FAIL_CONTENTS, userId]) ?? [];
  const checkIsFailedData = (idToCheck: USER_LIKES_TYPE["id"]) => fetchFailedData.some((data) => data.id === idToCheck);

  return {
    fetchFailedData,
    checkIsFailedData: (idToCheck: USER_LIKES_TYPE["id"]) => checkIsFailedData(idToCheck),
  };
};

export default useFetchFailedData;
