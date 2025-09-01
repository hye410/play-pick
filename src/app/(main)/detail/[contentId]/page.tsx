import { getDetailContent, getUserLikes } from "@/features/detail/api/services";
import DetailContent from "@/features/detail/detail-content";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import { createServerSupabase } from "@/utils/supabase-server";

type DetailContentProps = {
  params: Promise<{
    contentId: Pick<CombinedData, "id">;
  }>;
  searchParams: Promise<{
    type: Pick<CombinedData, "type">;
  }>;
};

const DetailContentPage = async ({ params, searchParams }: DetailContentProps) => {
  const { contentId } = await params;
  const { type } = await searchParams;
  const content: FilteredDetailData = await getDetailContent(contentId, type);
  const supabase = await createServerSupabase();
  const { data } = await supabase.auth.getUser();
  let isInitialLiked = false;
  if (data?.user) {
    const userLikes = await getUserLikes(data.user.id);
    isInitialLiked = userLikes.includes(content.id) ?? false;
  }

  return (
    <article className="flex h-full items-center justify-center">
      <h3 className="hidden">{content.title} 상세 페이지</h3>
      <DetailContent content={content} isInitialLiked={isInitialLiked} />
    </article>
  );
};

export default DetailContentPage;
