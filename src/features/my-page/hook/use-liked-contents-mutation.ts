import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { usePendingLikesStore } from "@/store/use-pending-likes-store";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_BY_INFINITE_TYPE, USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLikedContents } from "@/features/my-page/api/server-actions";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";

const { FAIL_CONTENTS, LIKED_CONTENTS } = QUERY_KEYS;
const useLikedContentsMutation = (userId: User["id"]) => {
  const queryClient = useQueryClient();
  const { resetDataToFetch } = usePendingLikesStore();
  const { checkIsFailedData } = useFetchFailedData(userId);

  const { mutate, isError, error } = useMutation({
    mutationFn: async (dataToFetch: Array<USER_LIKES_TYPE>) => await getLikedContents(dataToFetch),
    onSuccess: (res) => {
      const fetchFailedData: Array<USER_LIKES_TYPE> = res.contents.failedData;
      const fetchSuccessfulData: Array<CombinedData> = res.contents.validData;
      if (!res.success) throw fetchFailedData;

      queryClient.setQueryData([LIKED_CONTENTS, userId], (oldData: USER_LIKES_BY_INFINITE_TYPE) => {
        if (!oldData) return;
        const oldContents = oldData.pages[0].contents;
        const newContents = [...fetchSuccessfulData, ...oldContents];

        const newFirstPage = {
          ...oldData.pages[0],
          contents: newContents,
        };

        const updatedPages = [newFirstPage, ...oldData.pages.slice(1)];
        return {
          ...oldData,
          pages: updatedPages,
        };
      });
      resetDataToFetch();
    },
    onError: (fetchFailedData: Array<USER_LIKES_TYPE>) => {
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
    },
  });

  return {
    getLikedContents: mutate,
    isError,
    error,
  };
};

export default useLikedContentsMutation;
