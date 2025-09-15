"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { useLikedContentMutation } from "@/features/my-page/hook/use-liked-contents-mutation";
import { useUserLikesQuery } from "@/hook/use-user-likes-query";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import { alert } from "@/utils/alert";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { startTransition, useOptimistic } from "react";
import { deleteUserLikesStatus, postUserLikesStatus } from "@/features/detail/api/services";
import { TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";

const { ERROR, SUCCESS } = ALERT_TYPE;
const { USER_LIKES, LIKED_CONTENTS } = QUERY_KEYS;
const { LIKES_ADD_SUCCESS } = TOGGLE_LIKES_MESSAGE;

export const useUserLikesStatus = (
  contentId: FilteredDetailData["id"],
  contentType: FilteredDetailData["type"],
  user: User | null,
) => {
  const userId = user?.id;
  const queryClient = useQueryClient();
  const { userLikes } = useUserLikesQuery(userId!);
  const likedIds = userLikes?.map(({ id }) => id);
  const isLikedContent = likedIds?.some((id) => id === contentId) ?? false;
  const [isOptimisticLiked, addOptimisticToggle] = useOptimistic(isLikedContent);
  const { getLikedContentMutate } = useLikedContentMutation(userId!, addOptimisticToggle, contentId);
  if (!user) return;

  const handleToggle = () => {
    startTransition(async () => {
      addOptimisticToggle(!isOptimisticLiked);
      try {
        let resultMessage: string = LIKES_ADD_SUCCESS;
        if (isOptimisticLiked) {
          resultMessage = await deleteUserLikesStatus(userId, contentId);
          queryClient.setQueryData<Array<CombinedData>>(
            [LIKED_CONTENTS, userId],
            (oldData) => oldData?.filter((content) => content.id !== contentId) || [],
          );
        } else {
          await postUserLikesStatus({
            contentType,
            contentId,
            userId: userId,
          });
          getLikedContentMutate({ id: contentId, type: contentType });
        }
        queryClient.invalidateQueries({ queryKey: [USER_LIKES, userId] });
        alert({
          type: SUCCESS,
          message: resultMessage,
        });
      } catch (error) {
        addOptimisticToggle(isOptimisticLiked);
        alert({
          type: ERROR,
          message: error as string,
        });
      }
    });
  };
  return {
    handleToggle,
    isCurrentLiked: isOptimisticLiked,
  };
};
