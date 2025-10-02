import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { checkIsUserLikes } from "@/features/detail/api/server-actions";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
const { UNKNOWN_ERROR } = DEFAULT_ERROR_MESSAGE;
const { IS_LIKED } = QUERY_KEYS;
const useCheckUserLikes = (userId: User["id"] | null, contentId: USER_LIKES_TYPE["id"]) => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [IS_LIKED, userId, contentId],
    queryFn: async () => {
      const res = await checkIsUserLikes(userId!, contentId);
      if (!res.success) throw new Error(res.message || UNKNOWN_ERROR);
      else return res.isUserLikes;
    },
    enabled: !!userId && !!contentId,
  });

  return {
    isUserLike: data,
    isLoading,
    isError,
    error,
  };
};

export default useCheckUserLikes;
