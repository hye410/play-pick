"use client";

import { A_DAY } from "@/constants/fetch-time-constants";
import { QUERY_KEYS } from "@/constants/query-keys";
import { serverToggleLike } from "@/features/detail/api/server-service";
import { deleteUserLike, getUserLikes, postUserLike } from "@/features/detail/api/services";
import type { FilteredDetailData } from "@/types/contents-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuthStatus } from "@/hook/use-auth-status";
import { alert } from "@/utils/alert";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { DEFAULT_ERROR_MESSAGE, TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";

const { LIKES } = QUERY_KEYS;
const { SUCCESS, ERROR } = ALERT_TYPE;
const { CLIENT_ERROR } = DEFAULT_ERROR_MESSAGE;
type ContentId = FilteredDetailData["id"];
export const useUserLike = (contentId: ContentId, initialLikes?: ContentId[]) => {
  const { user } = useAuthStatus();
  const queryClient = useQueryClient();
  const userId = user?.id;
  const { ADD_TO_LIKES, REMOVE_FROM_LIKES } = TOGGLE_LIKES_MESSAGE;
  const { data: userLikes } = useQuery({
    queryKey: [LIKES, userId],
    queryFn: () => getUserLikes(userId),
    enabled: !!user,
    staleTime: A_DAY,
    initialData: initialLikes,
  });
  const isLiked = userLikes?.includes(contentId) ?? false;
  const handleToggleLike = (contentId: ContentId) => {
    if (isLiked) return deleteUserLike(contentId);
    else return postUserLike(contentId);
  };

  const { mutate: toggleLike } = useMutation({
    mutationKey: [LIKES, userId],
    mutationFn: (contentId) => handleToggleLike(contentId),
    onMutate: async (contentId: ContentId) => {
      await queryClient.cancelQueries({ queryKey: [LIKES, userId] });
      const prevLikes = queryClient.getQueryData([LIKES, userId]);
      queryClient.setQueryData([LIKES, userId], (prevLikes: ContentId[]) => {
        const isAlreadyLiked = prevLikes.includes(contentId);
        if (isAlreadyLiked) {
          prevLikes = prevLikes.filter((id) => id !== contentId);
        } else {
          prevLikes = [...prevLikes, contentId];
        }
      });
      return { prevLikes };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [LIKES, userId] });
      serverToggleLike(contentId);
      alert({
        type: SUCCESS,
        message: isLiked ? REMOVE_FROM_LIKES : ADD_TO_LIKES,
      });
    },
    onError: (err, newTodo, context) => {
      if (context?.prevLikes) queryClient.setQueryData([LIKES, userId], context.prevLikes);
      alert({
        type: ERROR,
        message: CLIENT_ERROR,
      });
    },
  });

  return {
    isLiked,
    toggleLike,
  };
};
