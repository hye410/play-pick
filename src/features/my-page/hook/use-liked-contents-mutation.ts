"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleContentData } from "@/features/my-page/api/services";
import type { CombinedData } from "@/types/contents-types";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { User } from "@supabase/supabase-js";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { alert } from "@/utils/alert";
import { deleteUserLikesStatus } from "@/features/detail/api/services";
import { MY_CONTENTS_MESSAGE } from "@/constants/message-constants";

type LikedContent = {
  id: CombinedData["id"];
  type: CombinedData["type"];
};
const { LIKED_CONTENTS } = QUERY_KEYS;
const { ERROR } = ALERT_TYPE;
const { SINGLE_CONTENT_FETCH_FAIL } = MY_CONTENTS_MESSAGE;

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
    onError: async () => {
      addOptimisticToggle(false);
      try {
        await deleteUserLikesStatus(userId, contentId);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_LIKES, userId] });
        alert({
          type: ERROR,
          message: SINGLE_CONTENT_FETCH_FAIL,
        });
      } catch (dbError) {
        console.error("DB 롤백 실패:", dbError);
        alert({
          type: ERROR,
          message: dbError as string,
        });
      }
    },
  });

  return {
    getLikedContentMutate,
    isGetLikedContentError,
  };
};
