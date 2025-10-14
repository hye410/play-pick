import { getTodayPick } from "@/features/home/api/services";
import { getSurveyResult } from "@/features/result/api/server-actions";
import RecommendList from "@/features/result/recommend-list";
import TodayPicksList from "@/features/result/today-picks-list";
import UserPicks from "@/features/result/user-picks";
import type { CombinedData } from "@/types/contents-types";
import type { ResultState } from "@/types/server-action-return-type";
import type { Answer } from "@/types/survey-types";
type ResultProps = {
  searchParams: Promise<Answer>;
};
const INITIAL_PAGE = 1;
const Result = async ({ searchParams }: ResultProps) => {
  const queries = await searchParams;
  const res = await getSurveyResult(queries, INITIAL_PAGE);
  if (!res.success) throw new Error(res.message as string);
  const userPicks = queries.picks as Array<string>;

  const recommendList: Array<CombinedData> = res.recommends;
  const haveRecommends = recommendList.length !== 0;

  let todayPicks: Array<CombinedData> = [];
  if (!haveRecommends) {
    todayPicks = await getTodayPick();
  }

  const initialResultData: ResultState = res;

  return (
    <article className="pb-15 h-full">
      <h3 className="mb-10 whitespace-pre-line break-keep text-center text-sm font-bold leading-5 xs:text-base xs:leading-7">
        &#91;&nbsp;{<UserPicks userPicks={userPicks} />}&nbsp;&#93; <br />
        {haveRecommends
          ? "딱 맞는 콘텐츠 추천드릴게요😉"
          : "아쉽지만 조건에 맞는 추천 콘텐츠가 없네요🥲\n대신 Today's Pick은 어떠신가요?"}
      </h3>
      {haveRecommends ? (
        <RecommendList initialResultData={initialResultData} queries={queries} />
      ) : (
        <TodayPicksList todayPicks={todayPicks} />
      )}
    </article>
  );
};

export default Result;
