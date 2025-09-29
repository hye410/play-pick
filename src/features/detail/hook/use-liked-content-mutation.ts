"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getSingleContentData } from "@/features/my-page/api/server-actions";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";
import useUserLikesQuery from "@/hook/use-user-likes-query";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const { LIKED_CONTENTS, FAIL_CONTENTS } = QUERY_KEYS;

const useLikedContentMutation = (userId: User["id"] | null) => {
  const queryClient = useQueryClient();
  const { checkIsFailedData } = useFetchFailedData(userId!);
  const { userLikes } = useUserLikesQuery(userId);

  const asyncMutate = async (likedContent: USER_LIKES_TYPE) => {
    const res = await getSingleContentData(likedContent.id, likedContent.type);
    if (res.success) return res.content;
    else throw new Error(res.message as string);
  };
  const {
    mutate: getLikedContentMutate,
    isError,
    error,
  } = useMutation<CombinedData, Error, USER_LIKES_TYPE>({
    mutationFn: (likedContent) => asyncMutate(likedContent),
    onSuccess: (content) => {
      // 1. 기존 FAIL_CONTENTS에 이미 캐싱되어 있는지 확인
      const wasFailedData = checkIsFailedData(content.id);
      console.log("기존에 실패리스트에 있언사?", wasFailedData);
      // 1-2. 만약 기존에 FAIL_CONTENTS에 캐싱되어 있다면 이젠 fetch에 성공했으니까 삭제함
      if (wasFailedData) {
        queryClient.setQueryData<Array<USER_LIKES_TYPE>>([FAIL_CONTENTS, userId], (oldData) => {
          const existingData = oldData ?? [];
          return existingData.filter((data) => data.id !== content.id);
        });
      }
      // 2. fetch에 성공한 데이터를 LIKED_CONTENTS에 캐싱함
      queryClient.setQueryData<Array<CombinedData>>([LIKED_CONTENTS, userId], (oldData) => {
        const existingData = oldData ?? [];
        return [...existingData, content];
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
    getLikedContentMutate,
    isError,
    error,
  };
};

export default useLikedContentMutation;
