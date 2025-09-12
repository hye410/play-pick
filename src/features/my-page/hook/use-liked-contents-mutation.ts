"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleContentData } from "@/features/my-page/api/services";
import { CombinedData } from "@/types/contents-types";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { User } from "@supabase/supabase-js";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { alert } from "@/utils/alert";
import { deleteUserLikesStatus } from "@/features/detail/api/services";

type LikedContent = {
  id: CombinedData["id"];
  type: CombinedData["type"];
};
const { LIKED_CONTENTS } = QUERY_KEYS;
const { ERROR } = ALERT_TYPE;

export const useLikedContentMutation = (
  userId: User["id"],
  addOptimisticToggle: (isOptimisticLiked: boolean) => void,
  contentId: CombinedData["id"],
) => {
  const queryClient = useQueryClient();
  const { mutate: getLikedContentMutate, isError: isGetLikedContentError } = useMutation<
    CombinedData,
    Error,
    LikedContent
  >({
    mutationFn: async (likedContent: LikedContent) => await getSingleContentData(likedContent.id, likedContent.type),
    onSuccess: (data) => {
      queryClient.setQueryData<Array<CombinedData>>([LIKED_CONTENTS, userId], (oldData) =>
        oldData ? [...oldData, data] : [data],
      );
    },
    onError: async (error) => {
      addOptimisticToggle(false);
      try {
        await deleteUserLikesStatus(userId, contentId);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_LIKES, userId] });
        alert({
          type: ERROR,
          message: "콘텐츠 정보를 가져오는 데 실패하여 찜 상태가 취소되었습니다.",
        });
      } catch (dbError) {
        console.error("DB 롤백 실패:", dbError);
        alert({
          type: ERROR,
          message: "찜 상태 동기화에 실패했습니다. 페이지를 새로고침해 주세요.",
        });
      }
    },
  });

  return {
    getLikedContentMutate,
    isGetLikedContentError,
  };
};
