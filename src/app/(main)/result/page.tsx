import { getSurveyResult } from "@/features/result/api/services";
import RecommendList from "@/features/result/recommend-list";
import UserPicks from "@/features/result/user-picks";
import { Answer } from "@/types/survey-types";
type ResultProps = {
  searchParams: Answer;
};
const Result = async ({ searchParams }: ResultProps) => {
  const queries = await searchParams;
  const list = await getSurveyResult(queries);

  return (
    <article className="h-full">
      <h3 className="mb-10 break-words text-center font-bold">
        &#91;&nbsp;{<UserPicks />}&nbsp;&#93; <br />딱 맞는 콘텐츠 추천드릴게요😉
      </h3>
      <RecommendList list={list} />
    </article>
  );
};

export default Result;
