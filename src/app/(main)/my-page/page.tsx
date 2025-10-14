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
  if (!user || !user.email)
    throw new Error("유저 정보가 없어 마이페이지에 접근할 수 없습니다.<br /> 로그인 후 다시 시도해 주세요.");

  return (
    <div className="`mx-auto sm:w-[85%]` scrollbar-hide mb-5 flex h-full w-full flex-col overflow-y-hidden">
      <Tabs currentTab={tab} />
      <div className="h-full rounded-l-lg border">
        {tab === INFO ? <MyInfo userEmail={user.email} /> : <MyContents user={user} />}
      </div>
    </div>
  );
};

export default MyPage;
