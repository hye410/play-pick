import { QUERY_KEYS } from "@/constants/query-keys-constants";
import type { CombinedData } from "@/types/contents-types";
import type { LikedContentsState } from "@/types/server-action-return-type";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getLikedContents } from "@/features/my-page/api/server-actions";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";

const { FAIL_CONTENTS, LIKED_CONTENTS } = QUERY_KEYS;

const useLikedContentsMutation = (userId: User["id"]) => {
  const queryClient = useQueryClient();
  const { checkIsFailedData } = useFetchFailedData(userId);

  const {
    mutate: getMyContents,
    isError,
    error,
  } = useMutation<LikedContentsState, LikedContentsState, Array<USER_LIKES_TYPE>>({
    mutationFn: async (dataToFetch) => await getLikedContents(dataToFetch),
    onSuccess: (res) => {
      queryClient.setQueryData<Array<USER_LIKES_TYPE>>([LIKED_CONTENTS, userId], (oldData) => {
        const existingData = oldData ?? [];
        return [...existingData, ...res.contents];
      });
    },
    onError: (errorRes) => {
      //전체 실패 시
      if (errorRes.contents.length === 0) throw new Error(errorRes.message as string);

      //일부 실패 시
      const contents: { validData: Array<CombinedData> | []; failedData: Array<USER_LIKES_TYPE> | [] } =
        errorRes.contents;
      const validData = contents.validData;
      const failedData = contents.failedData;

      //성공한 데이터는 likedContents에 추가 캐싱함
      queryClient.setQueryData<Array<USER_LIKES_TYPE>>([LIKED_CONTENTS, userId], (oldData) => {
        const existingData = oldData ?? [];
        return [...existingData, ...validData];
      });

      //실패한 데이터는 기존에 캐싱된 데이터가 있는지 확인 후 추가 캐싱함
      let newFailedData: Array<USER_LIKES_TYPE> = [];
      failedData.forEach((data) => {
        if (!checkIsFailedData(data.id)) newFailedData.push(data);
      });
      queryClient.setQueryData<Array<USER_LIKES_TYPE>>([FAIL_CONTENTS, userId], (oldData) => {
        const existingData = oldData ?? [];
        return [...existingData, ...newFailedData];
      });
      throw new Error(errorRes.message as string);
    },
  });

  return {
    getMyContents,
    isError,
    error,
  };
};

export default useLikedContentsMutation;
