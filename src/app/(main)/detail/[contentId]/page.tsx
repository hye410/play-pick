import { getDetailContent } from "@/features/detail/api/services";
import DetailContent from "@/features/detail/detail-content";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";

type DetailContentProps = {
  params: {
    contentId: string;
  };
  searchParams: {
    type: Pick<CombinedData, "type">;
  };
};

const DetailContentPage = async ({ params, searchParams }: DetailContentProps) => {
  const { contentId } = await params;
  const { type } = await searchParams;
  const content: FilteredDetailData = await getDetailContent(contentId, type);

  return (
    <article className="flex h-full items-center justify-center">
      <h3 className="hidden">{content.title} 상세 페이지</h3>
      <DetailContent content={content} />
    </article>
  );
};

export default DetailContentPage;
