import MyContentsList from "@/features/my-page/my-contents-list";
import type { User } from "@supabase/supabase-js";

type MyContentsProps = {
  user: User;
};

const MyContents = async ({ user }: MyContentsProps) => {
  return (
    <section className="h-full">
      <MyContentsList userId={user.id} />
    </section>
  );
};

export default MyContents;
