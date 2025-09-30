import { A_DAY } from "@/constants/fetch-time-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getLikedContents } from "@/features/my-page/api/server-actions";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";

const { LIKED_CONTENTS, FAIL_CONTENTS } = QUERY_KEYS;

const useLikedContentsQuery = (userId: User["id"], dataToFetch?: Array<USER_LIKES_TYPE>) => {
  const queryClient = useQueryClient();
  const { checkIsFailedData } = useFetchFailedData(userId);

  const {
    data: myContents,
    isLoading,
    isError,
    error,
  } = useQuery<Array<CombinedData>, Error>({
    queryKey: [LIKED_CONTENTS, userId],
    queryFn: async () => {
      const cachedContents: Array<CombinedData> = queryClient.getQueryData([LIKED_CONTENTS, userId]) ?? [];
      const res = await getLikedContents(dataToFetch!);
      if (!res.success) {
        // fetch 실패 시
        // 1. 먼저 FAIL_CONTENTS에 이미 캐싱되어 있는지 확인
        let newFetchFailedData: Array<USER_LIKES_TYPE> = [];
        res.contents.failedData.forEach((data: USER_LIKES_TYPE) => {
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

        return [...cachedContents, ...res.contents.validData];
      }
      // 3. 모든 데이터 fetch 성공 시 LIKED_CONTENTS에 캐싱
      return [...cachedContents, ...res.contents];
    },
    enabled: !!dataToFetch && dataToFetch.length > 0,
    staleTime: A_DAY,
    retry: false,
  });

  return {
    myContents,
    isLoading,
    isError,
    error,
  };
};

export default useLikedContentsQuery;
