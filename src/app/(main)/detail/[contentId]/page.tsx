import { getDetailContent } from "@/features/detail/api/servies";
import DetailContent from "@/features/detail/detail-content";
import { CombinedData } from "@/types/contents-type";

type DetailContentProps = {
  params: {
    contentId: string;
  };
  searchParams: {
    type: Pick<CombinedData, "type">;
  };
};

const DetailContentPage = async ({ params: { contentId }, searchParams: { type } }: DetailContentProps) => {
  const content = await getDetailContent(contentId, type);
  return (
    <article>
      <h3>디테일페이지</h3>
      <DetailContent content={content} />
    </article>
  );
};

export default DetailContentPage;
