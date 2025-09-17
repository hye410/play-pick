"use server";

import type { SignIn, SignInFormState } from "@/types/form-types";
import { AuthApiError } from "@supabase/supabase-js";
import { DEFAULT_ERROR_MESSAGE, FIND_PASSWORD_MESSAGE, SIGN_IN_MESSAGE } from "@/constants/message-constants";
import { BASE_URL, UPDATE_PASSWORD } from "@/constants/path-constants";
import { createServerSupabase } from "@/utils/supabase-server";

const { EMAIL_NOT_CONFIRMED, INVALID_ERROR, SIGN_IN_FAIL } = SIGN_IN_MESSAGE;
const { SERVER_ERROR, CLIENT_ERROR } = DEFAULT_ERROR_MESSAGE;

const NOT_CONFIRMED = "email_not_confirmed";

export const postSignIn = async (_: SignInFormState, formData: FormData) => {
  const supabase = await createServerSupabase();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

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
const { SUCCESS_SENDING_EMAIL, OVER_EMAIL_SEND_RATE_LIMIT } = FIND_PASSWORD_MESSAGE;
const ALREADY_SEND_EMAIL_STATUS = 429;
export const postFindPassword = async (payload: Pick<SignIn, "email">): Promise<string> => {
  try {
    const supabase = await createServerSupabase();
    const { email } = payload;
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${BASE_URL}${UPDATE_PASSWORD}`,
    });
    if (error) throw error;
    return SUCCESS_SENDING_EMAIL;
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof AuthApiError) {
      errorMessage = error.status === ALREADY_SEND_EMAIL_STATUS ? OVER_EMAIL_SEND_RATE_LIMIT : CLIENT_ERROR;
    }
    throw errorMessage;
  }
};
