import MyContentsList from "@/features/my-page/my-contents-list";
import type { User } from "@supabase/supabase-js";

type MyContentsProps = {
  user: User;
};
const MY_PAGE_BOX_SIZE = "9.25rem"; // (HEADER_SIZE : 6.25rem) + (TAB_SIZE : 3rem )
const MyContents = async ({ user }: MyContentsProps) => {
  return (
    <section className={`h-full max-h-[calc(100dvh-${MY_PAGE_BOX_SIZE})] `}>
      <MyContentsList userId={user.id} />
    </section>
  );
};

export default MyContents;
