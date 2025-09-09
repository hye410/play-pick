import { getUserLikes } from "@/features/detail/api/services";
import { getLikesData } from "@/features/my-page/api/services";
import type { CombinedData } from "@/types/contents-types";
import type { User } from "@supabase/supabase-js";
import { LuHeartOff } from "react-icons/lu";
import MyContentsList from "@/features/my-page/my-contents-list";
const EmptyContents = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center text-lg">
      <LuHeartOff size={"50px"} />
      <span className="mt-4">찜해놓은 콘텐츠가 없습니다.</span>
    </div>
  );
};

type MyContentsProps = {
  user: User;
};

const MyContents = async ({ user }: MyContentsProps) => {
  const userLikes = await getUserLikes(user.id);
  if (!userLikes || userLikes.length === 0) return <EmptyContents />;
  const likedContents: Array<CombinedData> = await getLikesData(userLikes);

  return (
    <section>
      <h3 className="mb-4 border-b border-dotted py-5 text-center font-extrabold">{user.email}님이 찜해놓은 콘텐츠</h3>
      <MyContentsList contents={likedContents} />
    </section>
  );
};

export default MyContents;
