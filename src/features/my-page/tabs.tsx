"use client";

import { MY_PAGE } from "@/constants/path-constants";
import { MY_PAGE_TAB_QUERY } from "@/constants/url-query-constants";
import clsx from "clsx";
import { useRouter } from "next/navigation";
const { INFO, CONTENTS } = MY_PAGE_TAB_QUERY;

type TabsProps = {
  currentTab: typeof INFO | typeof CONTENTS;
};
const Tabs = ({ currentTab }: TabsProps) => {
  const route = useRouter();

  const handleChangeTab = (tab: typeof INFO | typeof CONTENTS) => {
    const urlParams = new URLSearchParams();
    urlParams.append("tab", tab);
    route.push(`${MY_PAGE}?${urlParams}`);
  };

  return (
    <div className="h-[50px] text-right">
      <button
        onClick={() => handleChangeTab(INFO)}
        className={clsx("w-40 rounded-tl-3xl border border-b-0 py-3", currentTab === INFO && "bg-primary")}
      >
        내 정보
      </button>
      <button
        onClick={() => handleChangeTab(CONTENTS)}
        className={clsx("w-40 rounded-tl-3xl border border-b-0 py-3", currentTab === CONTENTS && "bg-primary")}
      >
        내 콘텐츠
      </button>
    </div>
  );
};

export default Tabs;
