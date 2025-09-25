import Content from "@/components/content";
import type { CombinedData } from "@/types/contents-types";
import { getTodayPick } from "@/features/home/api/services";
type RecommendListProps = {
  list: CombinedData[];
};
const RecommendList = async ({ list }: RecommendListProps) => {
  let contents = list;
  if (list.length === 0) contents = await getTodayPick();

  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-5">
      {contents.map((content) => (
        <Content key={`recommended_content_${content.id}`} content={content} />
      ))}
    </div>
  );
};

export default RecommendList;
