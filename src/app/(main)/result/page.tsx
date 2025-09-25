import { getSurveyResult } from "@/features/result/api/server-actions";
import RecommendList from "@/features/result/recommend-list";
import UserPicks from "@/features/result/user-picks";
import type { Answer } from "@/types/survey-types";
type ResultProps = {
  searchParams: Promise<Answer>;
};
const Result = async ({ searchParams }: ResultProps) => {
  const queries = await searchParams;
  const res = await getSurveyResult(queries);
  if (!res.success) throw new Error(res.message as string);
  const userPicks = queries.picks as string[];

  const recommendList = res.recommends ?? [];
  const haveNoRecommend = recommendList.length === 0;
  return (
    <article className="pb-15 h-full">
      <h3 className="mb-10 whitespace-pre-line break-words text-center font-bold leading-7">
        &#91;&nbsp;{<UserPicks userPicks={userPicks} />}&nbsp;&#93; <br />
        {haveNoRecommend
          ? "아쉽지만 조건에 맞는 추천 콘텐츠가 없네요🥲\n대신 Today's Pick은 어떠신가요?"
          : "딱 맞는 콘텐츠 추천드릴게요😉"}
      </h3>
      <RecommendList list={recommendList} />
    </article>
  );
};

export default Result;
