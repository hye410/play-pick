"use server";

import { DEFAULT_ERROR_MESSAGE, FIND_PASSWORD_MESSAGE, SIGN_IN_MESSAGE } from "@/constants/message-constants";
import { BASE_URL, UPDATE_PASSWORD } from "@/constants/path-constants";
import type { SignInFormState } from "@/types/form-types";
import { createServerSupabase } from "@/utils/supabase-server";

// ==================== 로그인 ====================
const { EMAIL_NOT_CONFIRMED, INVALID_ERROR, SIGN_IN_FAIL } = SIGN_IN_MESSAGE;
const { SERVER_ERROR, CLIENT_ERROR } = DEFAULT_ERROR_MESSAGE;

const NOT_CONFIRMED = "email_not_confirmed";

/**
 * 로그인 API를 호출하는 함수
 * @param _ 함수의 이전 반환 값
 * @param userData 로그인할 유저의 정보(이메일,비밀번호)
 * @returns {object} 로그인 성공 여부, 메시지, 성공 시 로그인한 유저의 ID
 */
export const postSignIn = async (_: SignInFormState, userData: FormData): Promise<SignInFormState> => {
  const supabase = await createServerSupabase();
  const email = userData.get("email") as string;
  const password = userData.get("password") as string;

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!user || error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error?.status === 400) {
      errorMessage = error.code === NOT_CONFIRMED ? EMAIL_NOT_CONFIRMED : INVALID_ERROR;
    } else errorMessage = SIGN_IN_FAIL;
    return { success: false, message: errorMessage, userId: null };
  }
  return { success: true, message: null, userId: user.id };
};

// ==================== 비밀번호 찾기 ====================
const { SUCCESS_SENDING_EMAIL, OVER_EMAIL_SEND_RATE_LIMIT } = FIND_PASSWORD_MESSAGE;
const ALREADY_SEND_EMAIL_STATUS = 429;

/**
 * 비밀번호 찾기 API를 호출하는 함수
 * @param _ 함수의 이전 반환 값
 * @param userInfo 비밀번호를 찾고자하는 이메일을 담은 객체
 * @returns  비밀번호 찾기 API 호출 성공 여부와 메시지
 */
export const postFindPassword = async (_: InitReturnType, userInfo: FormData): Promise<InitReturnType> => {
  const supabase = await createServerSupabase();
  const email = userInfo.get("email") as string;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${BASE_URL}${UPDATE_PASSWORD}`,
  });
  if (error) {
    const errorMessage = error.status === ALREADY_SEND_EMAIL_STATUS ? OVER_EMAIL_SEND_RATE_LIMIT : CLIENT_ERROR;
    return { success: false, message: errorMessage };
  }
  return { success: true, message: SUCCESS_SENDING_EMAIL };
};
