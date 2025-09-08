import { getSurveyResult } from "@/features/result/api/services";
import RecommendList from "@/features/result/recommend-list";
import UserPicks from "@/features/result/user-picks";
import { Answer } from "@/types/survey-types";
type ResultProps = {
  searchParams: Promise<Answer>;
};
const Result = async ({ searchParams }: ResultProps) => {
  const queries = await searchParams;
  const list = await getSurveyResult(queries);
  const userPicks = queries.picks as string[];

  return (
    <article className="pb-15 h-full">
      <h3 className="mb-10 break-words text-center font-bold">
        &#91;&nbsp;{<UserPicks userPicks={userPicks} />}&nbsp;&#93; <br />딱 맞는 콘텐츠 추천드릴게요😉
      </h3>
      <RecommendList list={list} />
    </article>
  );
};

export default Result;
