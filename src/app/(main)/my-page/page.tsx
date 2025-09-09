import { MY_PAGE_TAB_QUERY } from "@/constants/url-query-constants";
import MyContents from "@/features/my-page/my-contents";
import MyInfo from "@/features/my-page/my-info";
import Tabs from "@/features/my-page/tabs";
import { createServerSupabase } from "@/utils/supabase-server";
const { INFO, CONTENTS } = MY_PAGE_TAB_QUERY;
type MyPageProps = {
  searchParams: Promise<{ tab: typeof INFO | typeof CONTENTS }>;
};
const MyPage = async ({ searchParams }: MyPageProps) => {
  const params = await searchParams;
  const tab = params.tab;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user || !user.email) return; //@TODO: 에러 시 처리하기

  return (
    <div className="mx-auto flex h-full w-[85%] flex-col">
      <Tabs currentTab={tab} />
      <div className="h-full rounded-l-lg border">
        {tab === INFO ? <MyInfo userEmail={user.email} /> : <MyContents user={user} />}
      </div>
    </div>
  );
};

export default MyPage;
