"use client";
import Content from "@/components/content";
import LoadingSpinner from "@/components/loading-spinner";
import { DEFAULT_ERROR_MESSAGE, MY_CONTENTS_MESSAGE } from "@/constants/message-constants";
import EmptyContents from "@/features/my-page/empty-contents";
import FailedContent from "@/features/my-page/failed-content";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";
import useInfiniteLikedContents from "@/hook/use-infinite-liked-contents";
import type { User } from "@supabase/supabase-js";
import { useEffect, useRef } from "react";
type MyContentsListProps = {
  userId: User["id"];
};

const { NO_LIKED_CONTENTS } = MY_CONTENTS_MESSAGE;
const { UNKNOWN_ERROR } = DEFAULT_ERROR_MESSAGE;

const MyContentsList = ({ userId }: MyContentsListProps) => {
  const { fetchFailedData } = useFetchFailedData(userId);

  const { myContents, hasNextPage, isLoading, isError, error, isFetchingNextPage, fetchNextPage } =
    useInfiniteLikedContents(userId);

  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loadMoreRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "0px", threshold: 1.0 },
    );
    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className={`flex h-full w-full items-center justify-center`}>
        <LoadingSpinner />
      </div>
    );
  }

  if (myContents.length === 0 && fetchFailedData.length === 0 && !hasNextPage) {
    return <EmptyContents message={NO_LIKED_CONTENTS} />;
  }

  if (isError) return <EmptyContents message={error?.message || UNKNOWN_ERROR} />;

  return (
    <div className="scrollbar-hide grid h-full grid-cols-1 overflow-y-scroll px-4 pt-4 xs:grid-cols-2 xs:gap-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {myContents.map((content) => (
        <div className="mx-auto my-4 w-3/4 xs:m-0 xs:w-full" key={`success_${content.id}`}>
          <Content content={content} />
        </div>
      ))}

      {fetchFailedData.map((failedData) => (
        <FailedContent content={failedData} key={`failed_${failedData.id}`} userId={userId} />
      ))}

      {hasNextPage && (
        <div
          ref={loadMoreRef}
          className="col-span-1 flex justify-center py-4 xs:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5"
        >
          {isFetchingNextPage ? <LoadingSpinner /> : null}
        </div>
      )}

      {!hasNextPage && (myContents.length > 0 || fetchFailedData.length > 0) && (
        <div className="col-span-1 mb-4 flex flex-col justify-end text-center text-gray-500 xs:col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5">
          모든 찜 목록을 불러왔습니다.
        </div>
      )}
    </div>
  );
};

export default MyContentsList;
