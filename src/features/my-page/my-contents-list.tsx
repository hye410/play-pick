"use client";
import Content from "@/components/Content";
import { useUserLikesQuery } from "@/hook/use-user-likes-query";
import type { User } from "@supabase/supabase-js";
import { LuHeartOff } from "react-icons/lu";
import { useLikedContentsQuery } from "@/features/my-page/hook/use-liked-contents-query";
type MyContentsListProps = {
  userId: User["id"];
};

const EmptyContents = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-lg">
      <LuHeartOff size={"50px"} />
      <span className="mt-4">찜해놓은 콘텐츠가 없습니다.</span>
    </div>
  );
};

const MyContentsList = ({ userId }: MyContentsListProps) => {
  const { userLikes, isUserLikesLoading } = useUserLikesQuery(userId);
  const { likedContents, isLikedContentsLoading } = useLikedContentsQuery(userId, userLikes!);
  if (isUserLikesLoading || isLikedContentsLoading) {
    return "로딩 중 ..";
  }

  if (!userLikes || userLikes.length === 0) return <EmptyContents />;

  if (!likedContents || likedContents.length === 0) return <div>fail to fetching data</div>;

  return (
    <div className="grid grid-cols-3 gap-4 px-4">
      {likedContents.map((content) => (
        <Content key={`user_like_${content.id}`} content={content} />
      ))}
    </div>
  );
};

export default MyContentsList;
