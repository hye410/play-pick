"use client";
import Content from "@/components/content";
import LoadingSpinner from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import useLikedContentMutation from "@/features/detail/hook/use-liked-content-mutation";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";
import useLikedContentsQuery from "@/features/my-page/hook/use-liked-contents-query";
import useUserLikesQuery from "@/hook/use-user-likes-query";
import type { CombinedData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { alert } from "@/utils/alert";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
type MyContentsListProps = {
  userId: User["id"];
};
const { ERROR } = ALERT_TYPE;
const { LIKED_CONTENTS } = QUERY_KEYS;

const MyContentsList = ({ userId }: MyContentsListProps) => {
  const queryClient = useQueryClient();
  const { userLikes, isUserLikesLoading } = useUserLikesQuery(userId);
  const { fetchFailedData } = useFetchFailedData(userId);
  const cachedLikedContents: Array<CombinedData> = queryClient.getQueryData([LIKED_CONTENTS, userId]) ?? [];
  const cachedSuccessIds = new Set(cachedLikedContents.map((content) => content.id));
  const cachedFailedIds = new Set(fetchFailedData.map((data) => data.id));
  const dataToFetch =
    userLikes?.filter((like) => !cachedSuccessIds.has(like.id) && !cachedFailedIds.has(like.id)) ?? [];

  useEffect(() => {
    if (!isUserLikesLoading && dataToFetch.length > 0)
      queryClient.invalidateQueries({
        queryKey: [LIKED_CONTENTS, userId],
      });
  }, [userId, isUserLikesLoading, dataToFetch.length, queryClient]);

  const { myContents, isLoading: isMyContentsLoading } = useLikedContentsQuery(userId, dataToFetch);
  const {
    getLikedContentMutate,
    isError: isGetLikedContentError,
    error: getLikedContentError,
  } = useLikedContentMutation(userId);

  if (isUserLikesLoading || isMyContentsLoading) return <LoadingSpinner />;

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
