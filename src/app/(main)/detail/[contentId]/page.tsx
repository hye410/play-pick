import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { checkIsUserLikes } from "@/features/detail/api/server-actions";
import DetailContent from "@/features/detail/detail-content";
import { filterDetailMovieData, filterDetailTvData } from "@/features/detail/utils/filter-detail-contents";
import type { CombinedData } from "@/types/contents-types";
import { createServerSupabase } from "@/utils/supabase-server";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";

type SearchParams = {
  searchParams: Promise<{
    type: CombinedData["type"];
    title: CombinedData["title"];
  }>;
};

type DetailContentProps = {
  params: Promise<{
    contentId: string;
  }>;
} & SearchParams;

const { IS_LIKED } = QUERY_KEYS;
const { FETCH_ERROR } = DEFAULT_ERROR_MESSAGE;

export const generateMetadata = async ({ searchParams }: SearchParams): Promise<Metadata> => {
  const { title } = await searchParams;

  return {
    title: title ? `Play Pick | ${title}` : "Play Pick",
    description: `${title}에 대한 상세 정보를 제공합니다.`,
  };
};

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

  if (user && user.id) {
    await queryClient.prefetchQuery({
      queryKey: [IS_LIKED, user.id, Number(contentId)],
      queryFn: async () => {
        const res = await checkIsUserLikes(user.id, Number(contentId));
        if (res.success) {
          isInitLiked = res.isUserLikes || false;
          return isInitLiked;
        } else if (!res.success && res.message) {
          throw new Error(res.message);
        }
      },
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <article className="flex h-full max-h-fit items-center justify-center">
        <h3 className="hidden">{content.title} 상세 페이지</h3>
        <DetailContent content={content} userId={user?.id || null} isInitLiked={isInitLiked} />
      </article>
    </HydrationBoundary>
  );
};

export default DetailContentPage;
