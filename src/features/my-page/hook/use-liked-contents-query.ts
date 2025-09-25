import { A_DAY } from "@/constants/fetch-time-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getLikedContents } from "@/features/my-page/api/server-actions";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { alert } from "@/utils/alert";
import type { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";

const { LIKED_CONTENTS } = QUERY_KEYS;
const useLikedContentsQuery = (userId: User["id"], userLikes: Array<USER_LIKES_TYPE>) => {
  const {
    data: likedContents,
    isLoading: isLikedContentsLoading,
    isError: isLikedContentsError,
    error: likedContentsError,
  } = useQuery<Array<CombinedData>, Error>({
    queryKey: [LIKED_CONTENTS, userId],
    queryFn: async () => {
      const res = await getLikedContents(userLikes!);
      if (!res.success && res.message) alert({ type: "error", message: res.message as string });
      return res.contents;
    },
    enabled: !!userLikes && userLikes.length > 0,
    staleTime: A_DAY,
  });

  return {
    likedContents,
    isLikedContentsLoading,
    isLikedContentsError,
    likedContentsError,
  };
};

export default useLikedContentsQuery;
