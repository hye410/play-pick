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
const { LIKED_CONTENTS, USER_LIKES } = QUERY_KEYS;

export const useLikedContentMutation = (userId: User["id"]) => {
  const queryClient = useQueryClient();

  const { mutate: getLikedContentMutate, isError: isGetLikedContentError } = useMutation<
    LikedContentState,
    Error,
    LikedContent
  >({
    mutationFn: async (likedContent: LikedContent) => await getSingleContentData(likedContent.id, likedContent.type),
    onSuccess: (res) => {
      queryClient.setQueryData<Array<CombinedData>>([LIKED_CONTENTS, userId], (oldData) =>
        oldData ? [...oldData, res.content] : [],
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [USER_LIKES, userId] });
    },
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
