import { MY_PAGE_TAB_QUERY } from "@/constants/url-query-constants";
import MyContents from "@/features/my-page/my-contents";
import MyInfo from "@/features/my-page/my-info";
import Tabs from "@/features/my-page/tabs";
import { createServerSupabase } from "@/utils/supabase-server";
const { INFO, CONTENTS } = MY_PAGE_TAB_QUERY;
type MyPageProps = {
  searchParams: Promise<{ tab: typeof INFO | typeof CONTENTS }>;
};

const MY_PAGE_BOX_SIZE = "9.25rem"; // (HEADER_SIZE : 6.25rem) + (TAB_SIZE : 3rem )
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
    <div
      className={`mx-auto mb-5 flex h-full max-h-[calc(100dvh-${MY_PAGE_BOX_SIZE})] w-full flex-col overflow-y-hidden sm:w-[85%]`}
    >
      <Tabs currentTab={tab} />
      <div className={`h-full rounded-l-lg border`}>
        {tab === INFO ? <MyInfo userEmail={user.email} /> : <MyContents user={user} />}
      </div>
    </div>
  );
};

export default MyPage;
