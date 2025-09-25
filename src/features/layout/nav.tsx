"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { privateMenus, publicMenus } from "@/constants/menu-constants";
import { getSignOut } from "@/features/layout/api/server-actions";
import useAuthStatus from "@/hook/use-auth-status";
import type { Menu } from "@/types/menu-types";
import { alert } from "@/utils/alert";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const { ERROR } = ALERT_TYPE;
type NavProps = {
  initialIsLoggedIn: boolean;
};

const Nav = ({ initialIsLoggedIn }: NavProps) => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStatus(initialIsLoggedIn);

  const handleSignOut = useCallback(async () => {
    const res = await getSignOut();
    if (res.success) {
      queryClient.clear();
      window.location.replace("/");
    } else {
      alert({
        type: ERROR,
        message: res.message as string,
      });
    }
  }, [queryClient]);

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPath = `${pathname}${searchParams.toString() ? "?" + searchParams.toString() : ""}`;
  const menus: Menu[] = useMemo(
    () => (isLoggedIn ? privateMenus(handleSignOut) : publicMenus(currentPath)),
    [isLoggedIn, handleSignOut, currentPath],
  );

  return (
    <nav>
      <h2 className="hidden">메뉴</h2>
      <ul className="flex">
        {menus.map((menu, idx) => (
          <li key={`menu_${menu.name}`} className={clsx(idx !== menus.length - 1 && "mr-2")}>
            {menu.type === "link" ? (
              <Link href={menu.path as string}>{menu.name}</Link>
            ) : (
              <button onClick={menu.onClick} type="button">
                {menu.name}
              </button>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
