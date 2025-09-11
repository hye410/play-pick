import MyContentsList from "@/features/my-page/my-contents-list";
import type { User } from "@supabase/supabase-js";

type MyContentsProps = {
  user: User;
};

const MyContents = async ({ user }: MyContentsProps) => {
  return (
    <section>
      <h3 className="mb-4 border-b border-dotted py-5 text-center font-extrabold">{user.email}님이 찜해놓은 콘텐츠</h3>
      <MyContentsList userId={user.id} />
    </section>
  );
};

export default MyContents;
