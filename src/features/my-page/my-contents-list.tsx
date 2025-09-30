"use client";
import Content from "@/components/content";
import LoadingSpinner from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { MY_CONTENTS_MESSAGE } from "@/constants/message-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import useLikedContentMutation from "@/features/detail/hook/use-liked-content-mutation";
import EmptyContents from "@/features/my-page/empty-contents";
import useLikedContentsQuery from "@/features/my-page/hook/use-liked-contents-query";
import useLikedContentsStatus from "@/features/my-page/hook/use-liked-contents-status";
import useUserLikesQuery from "@/hook/use-user-likes";
import { alert } from "@/utils/alert";
import type { User } from "@supabase/supabase-js";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
type MyContentsListProps = {
  userId: User["id"];
};
const { ERROR } = ALERT_TYPE;
const { LIKED_CONTENTS } = QUERY_KEYS;
const { NO_LIKED_CONTENTS } = MY_CONTENTS_MESSAGE;
const MyContentsList = ({ userId }: MyContentsListProps) => {
  const queryClient = useQueryClient();
  const {
    userLikes,
    isLoading: isUserLikesLoading,
    isError: isUserLikesError,
    error: userLikesError,
  } = useUserLikesQuery(userId);
  const { dataToFetch, fetchFailedData } = useLikedContentsStatus(userId, userLikes);

  useEffect(() => {
    // userLikes 로딩이 완료되었고, 아직 캐시에 없는 항목(dataToFetch)이 있다면
    // LIKED_CONTENTS 쿼리를 강제로 재실행하여 전체 데이터를 fetch
    if (!isUserLikesLoading && dataToFetch.length > 0)
      queryClient.invalidateQueries({
        queryKey: [LIKED_CONTENTS, userId],
      });
  }, [userId, isUserLikesLoading, dataToFetch.length, queryClient]);

  const {
    myContents,
    isLoading: isMyContentsLoading,
    isError: isMyContentsError,
    error: myContentsError,
  } = useLikedContentsQuery(userId, dataToFetch);
  const {
    getLikedContentMutate,
    isError: isGetLikedContentError,
    error: getLikedContentError,
  } = useLikedContentMutation(userId);

  if (isUserLikesError) return <EmptyContents message={userLikesError?.message as string} />;
  if (isUserLikesLoading || !userLikes)
    return (
      <div className="flex h-[570px] w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (userLikes.length === 0) return <EmptyContents message={NO_LIKED_CONTENTS} />;

  if (isMyContentsError) return <EmptyContents message={myContentsError?.message as string} />;
  if (isMyContentsLoading || !myContents)
    return (
      <div className="flex h-[570px] w-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (isGetLikedContentError) {
    alert({ type: ERROR, message: getLikedContentError?.message as string });
  }

  return (
    <div className="grid h-[560px] grid-cols-3 gap-4 overflow-y-scroll px-4 pt-4">
      {myContents.map((content) => (
        <Content content={content} key={`success_${content.id}`} />
      ))}
      {fetchFailedData?.map((data) => (
        <div
          key={`error_${data.id}`}
          className="flex h-80 flex-col items-center justify-center rounded border border-error p-4"
        >
          <span>콘텐츠 불러오기 실패</span>
          <button
            className="mt-2 rounded bg-primary px-3 py-1 text-white"
            onClick={() => getLikedContentMutate({ id: data.id, type: data.type })}
          >
            다시 시도
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyContentsList;
