import Content from "@/components/Content";
import type { CombinedData } from "@/types/contents-types";
type RecommendListProps = {
  list: CombinedData[];
};
const RecommendList = ({ list }: RecommendListProps) => {
  console.log("list=>", list);
  return (
    <div className="grid grid-cols-3 gap-5">
      {list.map((content) => (
        <Content key={`recommended_content_${content.id}`} content={content} />
      ))}
    </div>
  );
};

export default RecommendList;
