"use client";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { privateMenus, publicMenus } from "@/constants/menu-constants";
import { useAuthStatus } from "@/hook/use-auth-status";
import type { Menu } from "@/types/menu-types";
import { alert } from "@/utils/alert";
import { createClientSuperbase } from "@/utils/supabase-client";
import { useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { SweetAlertResult } from "sweetalert2";
const { ERROR } = ALERT_TYPE;
type NavProps = {
  initialIsLoggedIn: boolean;
};

const supabase = createClientSuperbase();

const Nav = ({ initialIsLoggedIn }: NavProps) => {
  const queryClient = useQueryClient();
  const { isLoggedIn } = useAuthStatus(initialIsLoggedIn);

  const handleSignOut = useCallback(async (): Promise<SweetAlertResult | void> => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      queryClient.clear();
      window.location.replace("/");
    } catch (error) {
      console.error(error);
      alert({
        type: ERROR,
        message: "로그아웃 중 오류가 발생했습니다.",
      });
    }
  }, []);

  const menus: Menu[] = useMemo(
    () => (isLoggedIn ? privateMenus(handleSignOut) : publicMenus),
    [isLoggedIn, handleSignOut],
  );

  return (
    <nav>
      <h2 className="hidden">메뉴</h2>
      <ul className="flex">
        {menus.map((menu, idx) => (
          <li key={`menu_${menu.name}`} className={clsx(idx !== menus.length - 1 ? "mr-2" : "")}>
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
