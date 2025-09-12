import { QUERY_KEYS } from "@/constants/query-keys-constants";
import { getDetailContent, getUserLikes } from "@/features/detail/api/services";
import DetailContent from "@/features/detail/detail-content";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
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

const DetailContentPage = async ({ params, searchParams }: DetailContentProps) => {
  const { contentId } = await params;
  const { type } = await searchParams;
  const queryClient = new QueryClient();
  const content: FilteredDetailData = await getDetailContent(Number(contentId), type);
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await queryClient.prefetchQuery({
      queryKey: [USER_LIKES, user.id],
      queryFn: () => getUserLikes(user.id),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <article className="flex h-full items-center justify-center">
        <h3 className="hidden">{content.title} 상세 페이지</h3>
        <DetailContent content={content} user={user} />
      </article>
    </HydrationBoundary>
  );
};

export default DetailContentPage;
