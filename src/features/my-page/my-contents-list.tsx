"use client";
import Content from "@/components/content";
import useUserLikesQuery from "@/hook/use-user-likes-query";
import type { User } from "@supabase/supabase-js";
import useLikedContentsQuery from "@/features/my-page/hook/use-liked-contents-query";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys-constants";
import LoadingSpinner from "@/components/loading-spinner";
import EmptyContents from "@/features/my-page/empty-contents";
import { MY_CONTENTS_MESSAGE } from "@/constants/message-constants";
type MyContentsListProps = {
  userId: User["id"];
};

const { NO_LIKED_CONTENTS, FETCH_FAIL } = MY_CONTENTS_MESSAGE;
const MyContentsList = ({ userId }: MyContentsListProps) => {
  const { userLikes, isUserLikesLoading } = useUserLikesQuery(userId);
  const { likedContents, isLikedContentsLoading } = useLikedContentsQuery(userId, userLikes!);

  const queryClient = useQueryClient();
  if (isUserLikesLoading || isLikedContentsLoading)
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  if (!userLikes || userLikes.length === 0) return <EmptyContents message={NO_LIKED_CONTENTS} />;
  if (!likedContents || likedContents.length === 0) return <EmptyContents message={FETCH_FAIL} />;
  if (userLikes.length !== likedContents.length)
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKED_CONTENTS, userId] });

  return (
    <div className="grid h-[560px] grid-cols-3 gap-4 overflow-y-scroll px-4 pt-4">
      {likedContents.map((content) => (
        <Content key={`user_like_${content.id}`} content={content} />
      ))}
    </div>
  );
};

export default MyContentsList;
