import Content from "@/components/Content";
import type { CombinedData } from "@/types/contents-types";
type RecommendListProps = {
  list: CombinedData[];
};
const RecommendList = ({ list }: RecommendListProps) => {
  return (
    <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-5">
      {list.map((content) => (
        <Content key={`recommended_content_${content.id}`} content={content} />
      ))}
    </div>
  );
};

export default RecommendList;
