import { MY_PAGE_TAB_QUERY } from "@/constants/url-query-constants";
import MyContents from "@/features/my-page/my-contents";
import MyInfo from "@/features/my-page/my-info";
import Tabs from "@/features/my-page/tabs";
const { INFO, CONTENTS } = MY_PAGE_TAB_QUERY;
type MyPageProps = {
  searchParams: Promise<{ tab: typeof INFO | typeof CONTENTS }>;
};
const MyPage = async ({ searchParams }: MyPageProps) => {
  const params = await searchParams;
  const tab = params.tab;

  return (
    <div className="mx-auto h-full w-[85%]">
      <Tabs currentTab={tab} />
      {tab === INFO ? <MyInfo /> : <MyContents />}
    </div>
  );
};

export default MyPage;
