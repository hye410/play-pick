"use server";

import { SIGN_OUT_MESSAGE } from "@/constants/message-constants";
import type { InitReturnType } from "@/types/server-action-return-type";
import { createServerSupabase } from "@/utils/supabase-server";

const { SIGN_OUT_FAIL } = SIGN_OUT_MESSAGE;

/**
 * 로그아웃을 요청하는 함수
 * @returns 로그아웃 요청 성공 여부와 실패 시 에러 메시지
 */
export const getSignOut = async (): Promise<InitReturnType> => {
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signOut();
  if (error) return { success: false, message: SIGN_OUT_FAIL };
  return { success: true, message: null };
};
