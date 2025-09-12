import { QUERY_KEYS } from "@/constants/query-keys-constants";
import type { CombinedData } from "@/types/contents-types";
import { useQuery } from "@tanstack/react-query";
import { getLikedContents } from "@/features/my-page/api/services";
import type { User } from "@supabase/supabase-js";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { A_DAY } from "@/constants/fetch-time-constants";

const { LIKED_CONTENTS } = QUERY_KEYS;
export const useLikedContentsQuery = (userId: User["id"], initialUserLikes: Array<USER_LIKES_TYPE>) => {
  const {
    data: likedContents,
    isLoading: isLikedContentsLoading,
    error: likedContentsError,
  } = useQuery<Array<CombinedData>, Error>({
    queryKey: [LIKED_CONTENTS, userId],
    queryFn: () => getLikedContents(initialUserLikes),
    enabled: !!initialUserLikes && initialUserLikes.length > 0,
    staleTime: A_DAY,
  });

  return {
    likedContents,
    isLikedContentsLoading,
    likedContentsError,
  };
};
