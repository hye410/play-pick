"use client";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getSingleContentData } from "@/features/my-page/api/server-actions";
import { useUserLikesQuery } from "@/hook/use-user-likes-query";
import type { CombinedData } from "@/types/contents-types";
import type { LikedContentState } from "@/types/server-action-return-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type LikedContent = {
  id: CombinedData["id"];
  type: CombinedData["type"];
};
const { LIKED_CONTENTS } = QUERY_KEYS;

export const useLikedContentMutation = (userId: User["id"]) => {
  const queryClient = useQueryClient();
  const { userLikes } = useUserLikesQuery(userId);
  const { mutate: getLikedContentMutate, isError: isGetLikedContentError } = useMutation<
    LikedContentState,
    Error,
    LikedContent
  >({
    mutationFn: async (likedContent: LikedContent) => await getSingleContentData(likedContent.id, likedContent.type),
    onSuccess: (res) => {
      if (res.success) {
        queryClient.setQueryData<Array<CombinedData>>([LIKED_CONTENTS, userId, userLikes], (oldData) =>
          oldData ? [...oldData, res.content] : [res.content],
        );

        // queryClient.invalidateQueries({ queryKey: [LIKED_CONTENTS, userId, userLikes] });
      } //실패처리는 따로 하지 않음 > 실패 시 마이페이지 진입 시 한 번 더 fetch를 시도할 예정이라 유저가 현재 에러가 난 것을 인지할 필요가 없음
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: [USER_LIKES, userId] });
    // },
    // onError: async (error) => {
    //   addOptimisticToggle(false);
    //   alert({
    //     type: ERROR,
    //     message: error.message,
    //   });
    //   // try {
    //   //   await deleteFromUserLikes(userId, contentId);
    //   //   queryClient.invalidateQueries({ queryKey: [USER_LIKES, userId] });
    //   //   alert({
    //   //     type: ERROR,
    //   //     message: SINGLE_CONTENT_FETCH_FAIL,
    //   //   });
    //   // } catch (dbError) {
    //   //   console.error("DB 롤백 실패:", dbError);
    //   //   alert({
    //   //     type: ERROR,
    //   //     message: dbError as string,
    //   //   });
    //   // }
    // }, -> 하나의 데이터 패칭을 좋아요 눌렀을 때 실패했어도 마이페이지에서 다시 전체 데이터 패칭 시도하니까 거기서 처리해도 될 거 같음
  });

  return {
    getLikedContentMutate,
    isGetLikedContentError,
  };
};
