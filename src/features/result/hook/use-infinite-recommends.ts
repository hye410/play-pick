"use client";

import { useMemo } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getSurveyResult } from "@/features/result/api/server-actions";
import type { Answer } from "@/types/survey-types";
import type { ResultState } from "@/types/server-action-return-type";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { RESULT_MESSAGE } from "@/constants/message-constants";
const { RESULTS } = QUERY_KEYS;
const { FETCH_ADDITIONAL_RECOMMENDS_FAIL } = RESULT_MESSAGE;
const useInfiniteRecommends = (queries: Answer, initialResultData: ResultState) => {
  const initialData = useMemo(() => {
    return initialResultData.recommends
      ? {
          pages: [{ recommends: initialResultData.recommends, totalPages: initialResultData.totalPages || 1 }],
          pageParams: [1],
        }
      : undefined;
  }, [initialResultData]);

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [RESULTS],
    queryFn: async ({ pageParam }) => {
      const res = await getSurveyResult(queries, pageParam);
      if (res.success) return { recommends: res.recommends, totalPages: res.totalPages };
      else throw new Error(FETCH_ADDITIONAL_RECOMMENDS_FAIL);
    },
    initialPageParam: 1,
    initialData,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      return lastPageParam < lastPage.totalPages ? lastPageParam + 1 : undefined;
    },
  });

  return {
    data,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};

export default useInfiniteRecommends;
