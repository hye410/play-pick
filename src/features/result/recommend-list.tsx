"use client";
import Content from "@/components/content";
import type { CombinedData } from "@/types/contents-types";
import type { ResultState } from "@/types/server-action-return-type";
import type { Answer } from "@/types/survey-types";
import useInfiniteRecommends from "@/features/result/hook/use-infinite-recommends";
import { LoadingSpinner } from "@/components/loading-spinner";
import Button from "@/components/button";
import { alert } from "@/utils/alert";
import { ALERT_TYPE } from "@/constants/alert-constants";

type RecommendListProps = {
  initialResultData: ResultState;
  queries: Answer;
  haveNoRecommend: boolean;
  todayPicks: Array<CombinedData>;
};

const { ERROR } = ALERT_TYPE;
const RecommendList = ({ initialResultData, queries, haveNoRecommend, todayPicks }: RecommendListProps) => {
  if (haveNoRecommend) {
    return (
      <div className="mx-auto grid max-w-[1440px] grid-cols-4 gap-5">
        {todayPicks.map((content) => (
          <Content key={`today_pick_${content.id}`} content={content} />
        ))}
      </div>
    );
  }

  const { data, isLoading, isError, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteRecommends(
    queries,
    initialResultData,
  );
  if (isLoading) return <LoadingSpinner />;
  if (isError)
    alert({
      type: ERROR,
      message: error?.message as string,
    });

  const contents: Array<CombinedData> = data?.pages?.flatMap((page) => page.recommends) ?? [];

  return (
    <div className="flex flex-col items-center">
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-4 gap-5">
        {contents.map((content) => (
          <Content key={`recommended_content_${content.id}`} content={content} />
        ))}
      </div>

      {hasNextPage && (
        <div className="my-8 w-[280px]">
          <Button onClick={() => fetchNextPage()} disabled={isFetchingNextPage} size="small">
            {isFetchingNextPage ? <LoadingSpinner width="20px" height="20px" /> : "더 불러오기"}
          </Button>
        </div>
      )}

      {!hasNextPage && contents.length > 0 && (
        <p className="my-8 text-secondary">모든 추천 콘텐츠를 불러왔습니다. 🎉</p>
      )}
    </div>
  );
};

export default RecommendList;
