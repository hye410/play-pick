"use client";

import { A_DAY } from "@/constants/fetch-time-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getUserLikesByPage } from "@/features/detail/api/server-actions";
import { getLikedContents } from "@/features/my-page/api/server-actions";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";

const { LIKED_CONTENTS, FAIL_CONTENTS } = QUERY_KEYS;

const useInfiniteLikedContents = (userId: User["id"]) => {
  const queryClient = useQueryClient();
  const { checkIsFailedData } = useFetchFailedData(userId);

  const { data, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: [LIKED_CONTENTS, userId],
    queryFn: async ({ pageParam = 1 }) => {
      // 현재 뷰포인트에서 필요한 유저의 찜 리스트만 요청
      const res = await getUserLikesByPage(userId, pageParam);
      const currentPageLikes: Array<USER_LIKES_TYPE> = res.userLikes;
      const nextPage = res.nextPage;
      // tmdb 데이터를 요청할 콘텐츠들을 걸러냄 -> 기존에 tmdb 데이터 fetch에 실패한 애들을 제외시킴(개별적 요청할것이라서)?
      const contentsToFetch = currentPageLikes.filter((like) => !checkIsFailedData(like.id));
      // 여러 콘텐츠의 tmdb 데이터를 요청
      const tmdbRes = await getLikedContents(contentsToFetch);
      const fetchFailedData: Array<USER_LIKES_TYPE> = tmdbRes.contents.failedData;
      const fetchSuccessfulData: Array<CombinedData> = tmdbRes.contents.validData;

      // fetch 실패 시 -> 실패한 콘텐츠들을 FAIL_CONTENTS에 캐싱함
      if (!tmdbRes.success) {
        // 1. 먼저 FAIL_CONTENTS에 이미 캐싱되어 있는지 확인
        const newFetchFailedData: Array<USER_LIKES_TYPE> = [];
        fetchFailedData.forEach((data: USER_LIKES_TYPE) => {
          //1-2. 캐싱되어 있지 않다면 newFetchFailedData에 추가
          if (!checkIsFailedData(data.id)) newFetchFailedData.push(data);
        });

        // 1-3. 기존 FAIL_CONTENTS에 캐싱된 데이터 외에 fetch 실패한 데이터가 더 있다면 -> FAIL_CONTENTS에 추가 캐싱함
        if (newFetchFailedData.length !== 0) {
          queryClient.setQueryData<Array<USER_LIKES_TYPE>>([FAIL_CONTENTS, userId], (oldData) => {
            const existingData = oldData ?? [];
            const newDataToCache = new Map<number, USER_LIKES_TYPE>();
            [...existingData, ...newFetchFailedData].forEach((item) => {
              newDataToCache.set(item.id, item);
            });
            return Array.from(newDataToCache.values());
          });
        }
      }
      return {
        // TMDB에서 성공적으로 가져온 현재 페이지의 콘텐츠
        contents: fetchSuccessfulData,
        nextPage,
      };
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    staleTime: A_DAY,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const myContents = data?.pages.flatMap((page) => page.contents) ?? [];

  return {
    myContents,
    isLoading,
    isError,
    error,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};

export default useInfiniteLikedContents;
