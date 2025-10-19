"use server";

import { DEFAULT_ERROR_MESSAGE, SIGN_IN_MESSAGE } from "@/constants/message-constants";
import type { SignInFormState } from "@/types/server-action-return-type";
import { createServerSupabase } from "@/utils/supabase-server";

const { EMAIL_NOT_CONFIRMED, INVALID_ERROR, SIGN_IN_FAIL, GUEST_ACCOUNT_FAIL } = SIGN_IN_MESSAGE;
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;

const NOT_CONFIRMED = "email_not_confirmed";

/**
 * 로그인 API를 호출하는 함수
 * @param _ 함수의 이전 반환 값
 * @param userData 로그인할 유저의 정보(이메일,비밀번호)
 * @returns 로그인 성공 여부, 메시지, 성공 시 로그인한 유저의 ID
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

/**
 * 게스트 계정으로 로그인을 요청하는 함수
 * @returns 로그인 성공 여부 및 실패 시 메시지, 게스트 계정의 아이디
 */
export const postGuestSignIn = async (): Promise<SignInFormState> => {
  const supabase = await createServerSupabase();
  const email = process.env.GUEST_ACCOUNT_EMAIL as string;
  const password = process.env.GUEST_ACCOUNT_PASSWORD as string;

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (!user || error) {
    console.error("게스트 로그인 에러 발생 =>", error);
    console.error("게스트 이메일 =>", email);
    console.error("게스트 비밀번호 =>", password.length);

    return { success: false, message: GUEST_ACCOUNT_FAIL, userId: null };
  }
  return { success: true, message: null, userId: user.id };
};
