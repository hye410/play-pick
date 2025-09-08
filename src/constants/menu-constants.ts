import { MY_PAGE, SIGN_IN, SIGN_UP } from "@/constants/path-constants";
import type { LinkMenu, Menu } from "@/types/menu-types";
import { MY_PAGE_TAB_QUERY } from "./url-query-constants";

export const publicMenus: LinkMenu[] = [
  {
    name: "로그인",
    type: "link",
    path: SIGN_IN,
  },
  {
    name: "회원가입",
    type: "link",
    path: SIGN_UP,
  },
];

export const privateMenus = (cbFunc: () => void): Menu[] => [
  {
    name: "마이 페이지",
    type: "link",
    path: MY_PAGE + `?tab=${MY_PAGE_TAB_QUERY.INFO}`,
  },
  {
    name: "로그아웃",
    type: "button",
    onClick: cbFunc,
  },
];
