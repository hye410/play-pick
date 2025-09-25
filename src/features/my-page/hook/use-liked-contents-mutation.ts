"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getSingleContentData } from "@/features/my-page/api/server-actions";
import type { CombinedData } from "@/types/contents-types";
import type { LikedContentState } from "@/types/server-action-return-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type LikedContent = {
  id: CombinedData["id"];
  type: CombinedData["type"];
};
const { LIKED_CONTENTS } = QUERY_KEYS;

const useLikedContentMutation = (userId: User["id"] | null) => {
  if (!userId) {
    return {
      getLikedContentMutate: () => {
        console.warn("userId가 없어서  getLikedContentMutate함수를 정상적으로 호출할 수 없습니다.");
      },
      isGetLikedContentError: false,
    };
  }

  const queryClient = useQueryClient();
  const { mutate: getLikedContentMutate, isError: isGetLikedContentError } = useMutation<
    LikedContentState,
    Error,
    LikedContent
  >({
    mutationFn: async (likedContent: LikedContent) => await getSingleContentData(likedContent.id, likedContent.type),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.setQueryData<Array<CombinedData>>([LIKED_CONTENTS, userId], (oldData) => {
          const existingData = oldData ?? [];
          return [...existingData, res.content];
        });
      } //실패처리는 따로 하지 않음 > 실패한다면 내 콘텐츠 진입 시 invalidateQueries를 통해 한 번 더 fetch를 시도할 예정이라 유저가 현재 에러가 난 것을 인지할 필요가 없음
    },
  });

  return {
    getLikedContentMutate,
    isGetLikedContentError,
  };
};

export default useLikedContentMutation;
