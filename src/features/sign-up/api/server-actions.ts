"use server";
import { DEFAULT_ERROR_MESSAGE, SIGN_UP_MESSAGE } from "@/constants/message-constants";
import { createServerSupabase } from "@/utils/supabase-server";

const { EXPIRED_SESSION_ERROR } = DEFAULT_ERROR_MESSAGE;
const { DUPLICATION_ERROR, SIGN_UP_SUCCESS, OVER_SEND_LIMIT, INVALID_EMAIL_ADDRESS } = SIGN_UP_MESSAGE;

const ALREADY_EXIST_STATUS = 429;
const INVALID_EMAIL_ADDRESS_CODE = "email_address_invalid";
export const postSignUp = async (_: InitReturnType, userData: FormData) => {
  const supabase = await createServerSupabase();
  const email = userData.get("email") as string;
  const password = userData.get("password") as string;
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error && error.status === ALREADY_EXIST_STATUS) return { success: false, message: OVER_SEND_LIMIT };
  if (error && error.code === INVALID_EMAIL_ADDRESS_CODE) return { success: false, message: INVALID_EMAIL_ADDRESS };

  if (!user) return { success: false, message: EXPIRED_SESSION_ERROR };
  if (user && user.role === "") return { success: false, message: DUPLICATION_ERROR };

  return { success: true, message: SIGN_UP_SUCCESS };
};
