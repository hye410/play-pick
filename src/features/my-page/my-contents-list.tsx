import Content from "@/components/Content";
import type { CombinedData } from "@/types/contents-types";

type MyContentsListProps = {
  contents: Array<CombinedData>;
};

const MyContentsList = ({ contents }: MyContentsListProps) => {
  return (
    <div className="grid grid-cols-3 gap-4 px-4">
      {contents.map((content) => (
        <Content key={`user_like_${content.id}`} content={content} />
      ))}
    </div>
  );
};

export default MyContentsList;
