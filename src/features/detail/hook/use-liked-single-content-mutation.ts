"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getSingleContentData } from "@/features/my-page/api/server-actions";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_BY_INFINITE_TYPE, USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { LIKED_CONTENTS, FAIL_CONTENTS } = QUERY_KEYS;

const useLikedSingleContentMutation = (userId: User["id"] | null) => {
  const queryClient = useQueryClient();
  const { checkIsFailedData } = useFetchFailedData(userId!);

  const fetchSingleData = async (contentToFetch: USER_LIKES_TYPE) => {
    if (!userId) return;
    const { id, type } = contentToFetch;
    const res = await getSingleContentData(id, type);
    if (res.success) return res.content;
    else throw new Error(res.message as string);
  };

  const { mutate, isError, error } = useMutation<CombinedData, Error, USER_LIKES_TYPE>({
    mutationFn: (contentToFetch) => fetchSingleData(contentToFetch),
    onSuccess: (content) => {
      // 1. 기존 FAIL_CONTENTS에 이미 캐싱되어 있는지 확인
      const wasFailedData = checkIsFailedData(content.id);
      // 1-2. 만약 기존에 FAIL_CONTENTS에 캐싱되어 있다면 이젠 fetch에 성공했으니까 삭제함
      if (wasFailedData) {
        queryClient.setQueryData<Array<USER_LIKES_TYPE>>([FAIL_CONTENTS, userId], (oldData) => {
          const existingData = oldData ?? [];
          return existingData.filter((data) => data.id !== content.id);
        });
      }
      // 2. fetch에 성공한 데이터를 LIKED_CONTENTS에 캐싱함
      queryClient.setQueryData([LIKED_CONTENTS, userId], (oldData: USER_LIKES_BY_INFINITE_TYPE) => {
        const existingData = oldData ?? { pages: [], pageParams: [1] };
        const firstPage = existingData.pages[0] || { contents: [], nextPage: undefined };
        const oldContents = firstPage.contents;
        const newContents = [content, ...oldContents];
        const newFirstPage = {
          ...firstPage,
          contents: newContents,
        };
        const updatedPages = [newFirstPage, ...existingData.pages.slice(1)];
        return {
          ...existingData,
          pages: updatedPages,
        };
      });
    },
    onError: (_, variables) => {
      // 1. 기존 FAIL_CONTENTS에 이미 캐싱되어 있는지 확인
      const wasFailedData = checkIsFailedData(variables.id);
      // 2. 기존 FAIL_CONTENTS에 캐싱되어 있지 않다면 추가로 캐싱함
      if (!wasFailedData)
        queryClient.setQueryData<Array<USER_LIKES_TYPE>>([FAIL_CONTENTS, userId], (oldData) => {
          const existingData = oldData ?? [];
          return [...existingData, variables];
        });
    },
  });

  return {
    getSingleContent: mutate,
    isError,
    error,
  };
};

export default useLikedSingleContentMutation;
