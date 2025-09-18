"use server";

import { UPDATE_PASSWORD_MESSAGE } from "@/constants/message-constants";
import type { InitReturnType } from "@/types/server-action-return-type";
import { createServerSupabase } from "@/utils/supabase-server";
const { UPDATE_FAIL, UPDATE_SUCCESS, SAME_PASSWORD_ERROR } = UPDATE_PASSWORD_MESSAGE;

const SAME_PASSWORD_CODE = "same_password";

/**
 * 비밀번호 변경 API를 호출하는 함수
 * @param _ 함수의 이전 반환 값
 * @param userData 바꿀 비밀번호를 담은 객체
 * @returns 비밀번호 변경 성공 여부와 메시지
 */
export const updatePassword = async (_: InitReturnType, userData: FormData): Promise<InitReturnType> => {
  const supabase = await createServerSupabase();
  const password = userData.get("password") as string;
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error(error);
    const errorMessage = error.code === SAME_PASSWORD_CODE ? SAME_PASSWORD_ERROR : UPDATE_FAIL;
    return { success: false, message: errorMessage };
  }

  return { success: true, message: UPDATE_SUCCESS };
};
