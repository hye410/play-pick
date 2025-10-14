import { MY_PAGE_BOX_SIZE } from "@/app/(main)/my-page/page";
import MyContentsList from "@/features/my-page/my-contents-list";
import type { User } from "@supabase/supabase-js";

type MyContentsProps = {
  user: User;
};

const MyContents = async ({ user }: MyContentsProps) => {
  return (
    <section className={`h-full max-h-[calc(100dvh-${MY_PAGE_BOX_SIZE})]`}>
      <MyContentsList userId={user.id} />
    </section>
  );
};

export default MyContents;
