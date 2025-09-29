"use client";
import Content from "@/components/content";
import LoadingSpinner from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import useLikedContentMutation from "@/features/detail/hook/use-liked-content-mutation";
import useFetchFailedData from "@/features/my-page/hook/use-fetch-failed-data";
import useLikedContentsQuery from "@/features/my-page/hook/use-liked-contents-query";
import useUserLikesQuery from "@/hook/use-user-likes-query";
import { alert } from "@/utils/alert";
import type { User } from "@supabase/supabase-js";
type MyContentsListProps = {
  userId: User["id"];
};
const { ERROR } = ALERT_TYPE;

const MyContentsList = ({ userId }: MyContentsListProps) => {
  const { userLikes } = useUserLikesQuery(userId);
  const { myContents } = useLikedContentsQuery(userId, userLikes);

  const {
    getLikedContentMutate,
    isError: isGetLikedContentError,
    error: getLikedContentError,
  } = useLikedContentMutation(userId);
  const { fetchFailedData } = useFetchFailedData(userId);
  if (!userLikes || !myContents) return <LoadingSpinner />;
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
