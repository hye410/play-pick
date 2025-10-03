"use client";

import { ALERT_TYPE } from "@/constants/alert-constants";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { deleteFromUserLikes } from "@/features/detail/api/server-actions";
import { alert } from "@/utils/alert";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const { IS_LIKED } = QUERY_KEYS;
const { SUCCESS, ERROR } = ALERT_TYPE;
const { UNKNOWN_ERROR } = DEFAULT_ERROR_MESSAGE;

const useDeleteUserLikeMutation = (userId: User["id"]) => {
  const queryClient = useQueryClient();

  type IdToDelete = USER_LIKES_TYPE["id"];

  const handleOptimisticUpdate = async (contentId: IdToDelete) => {
    // 먼저 실행 중인 동기화 모두 취소
    await queryClient.cancelQueries({ queryKey: [IS_LIKED, userId, contentId] });

    // 기존에 캐싱된 데이터를 실패 시 롤백할 수 있도록 미리 빼놓자
    const prevLikedState = queryClient.getQueryData([IS_LIKED, userId, contentId]);

    // 낙관적 업데이트를 하자
    queryClient.setQueryData([IS_LIKED, userId, contentId], (existingState: boolean) => !existingState);
    return { prevLikedState };
  };

  const handleRemoveFromUserLikes = async (contentId: IdToDelete) => {
    const res = await deleteFromUserLikes(userId, contentId);
    if (!res.success) throw new Error(res.message || UNKNOWN_ERROR);
    return res.message;
  };

  const { mutate } = useMutation({
    onMutate: (idToDelete: IdToDelete) => handleOptimisticUpdate(idToDelete),
    mutationFn: (idToDelete: IdToDelete) => handleRemoveFromUserLikes(idToDelete),
    onSuccess: (successMessage) => alert({ type: SUCCESS, message: successMessage as string }),
    onError: (error, contentId, context) => {
      const prevLikedState = context?.prevLikedState;
      if (prevLikedState !== undefined) queryClient.setQueryData([IS_LIKED, userId, contentId], () => prevLikedState);

      alert({
        type: ERROR,
        message: error.message,
      });
    },
  });

  return {
    mutate,
  };
};

export default useDeleteUserLikeMutation;
