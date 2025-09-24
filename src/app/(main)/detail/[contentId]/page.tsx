import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getUserLikes } from "@/features/detail/api/server-actions";
import DetailContent from "@/features/detail/detail-content";
import { filterDetailMovieData, filterDetailTvData } from "@/features/detail/utils/filter-detail-contents";
import type { CombinedData } from "@/types/contents-types";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { createServerSupabase } from "@/utils/supabase-server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

type DetailContentProps = {
  params: Promise<{
    contentId: string;
  }>;
  searchParams: Promise<{
    type: CombinedData["type"];
  }>;
};
const { USER_LIKES } = QUERY_KEYS;
const { FETCH_ERROR } = DEFAULT_ERROR_MESSAGE;

const DetailContentPage = async ({ params, searchParams }: DetailContentProps) => {
  const { contentId } = await params;
  const { type } = await searchParams;
  const queryClient = new QueryClient();
  const supabase = await createServerSupabase();
  const options = {
    method: API_METHOD.GET,
    headers: TMDB_API_HEADER,
  };

  const res = await fetch(`${TMDB_BASE_URL}/${type}/${contentId}?language=ko-KR&page=1`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(FETCH_ERROR);
  const content = type === "movie" ? filterDetailMovieData(data) : filterDetailTvData(data);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isInitLiked = false;

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: [USER_LIKES, user.id],
      queryFn: async () => {
        const res = await getUserLikes(user.id);
        if (res.success) {
          const userLikes: Array<USER_LIKES_TYPE> = res.userLikes;
          const likedId = userLikes.map(({ id }) => id);
          isInitLiked = likedId.some((id) => id === Number(contentId));
          return userLikes;
        } else if (!res.success && res.message) {
          throw new Error(res.message);
        }
      },
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <article className="flex h-full items-center justify-center">
        <h3 className="hidden">{content.title} 상세 페이지</h3>
        <DetailContent content={content} user={user} isInitLiked={isInitLiked} />
      </article>
    </HydrationBoundary>
  );
};

export default DetailContentPage;
