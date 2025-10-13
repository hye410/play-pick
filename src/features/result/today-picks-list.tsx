import Content from "@/components/content";
import type { CombinedData } from "@/types/contents-types";

type TodayPicksListProps = {
  todayPicks: Array<CombinedData>;
};
const TodayPicksList = ({ todayPicks }: TodayPicksListProps) => {
  return (
    <div className="mx-auto grid max-w-screen-2xl grid-cols-4 gap-5">
      {todayPicks.map((content) => (
        <Content key={`today_pick_${content.id}`} content={content} />
      ))}
    </div>
  );
};

export default TodayPicksList;
