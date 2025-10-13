// isUserLike의 상태를 업데이트 하는 mutation
"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { DEFAULT_ERROR_MESSAGE, TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { addToUserLikes } from "@/features/detail/api/server-actions";
import { alert } from "@/utils/alert";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
const { IS_LIKED } = QUERY_KEYS;
const { SUCCESS, ERROR } = ALERT_TYPE;
const { UNKNOWN_ERROR } = DEFAULT_ERROR_MESSAGE;
const { REQUIRE_SIGN_IN } = TOGGLE_LIKES_MESSAGE;
const useAddUserLikeMutation = (userId: User["id"]) => {
  const queryClient = useQueryClient();
  const handleAddToUserLikes = async (contentToAdd: USER_LIKES_TYPE) => {
    if (!userId) throw new Error(REQUIRE_SIGN_IN);
    const { id, type } = contentToAdd;
    const res = await addToUserLikes({ contentId: id, contentType: type, userId });
    if (!res.success) throw new Error(res.message || UNKNOWN_ERROR);
    return res.message;
  };

  const handleOptimisticUpdate = async (contentToAdd: USER_LIKES_TYPE) => {
    if (!userId) throw new Error(REQUIRE_SIGN_IN);
    const { id: contentId } = contentToAdd;
    //현재 진행 중인 쿼리가 있다면 취소시켜주고 (충돌 방지)
    await queryClient.cancelQueries({ queryKey: [IS_LIKED, userId, contentId] });
    //롤백을 위해 현재 상태도 따로 저장해주자
    const prevLikedState = queryClient.getQueryData([IS_LIKED, userId, contentId]);

    // 그 다음 낙관적 업데이트를 실행하자
    queryClient.setQueryData([IS_LIKED, userId, contentId], (existingState: boolean) => !existingState);

    // 에러 발생 시 롤백하기 위해 이전 상태를 반환
    return { prevLikedState };
  };

  const { mutate } = useMutation({
    onMutate: (contentToAdd: USER_LIKES_TYPE) => handleOptimisticUpdate(contentToAdd),
    mutationFn: (contentToAdd: USER_LIKES_TYPE) => handleAddToUserLikes(contentToAdd),
    onSuccess: (successMessage) => {
      alert({
        type: SUCCESS,
        message: successMessage as string,
      });
    },
    onError: (error, content, context) => {
      const contentId = content.id;
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

export default useAddUserLikeMutation;
