"use server";

import { DEFAULT_ERROR_MESSAGE, SIGN_IN_MESSAGE } from "@/constants/message-constants";
import type { SignIn } from "@/types/form-types";
import { createServerSupabase } from "@/utils/supabase-server";
import { AuthApiError } from "@supabase/supabase-js";

const { EMAIL_NOT_CONFIRMED, INVALID_ERROR, SIGN_IN_FAIL } = SIGN_IN_MESSAGE;
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;

const NOT_CONFIRMED = "email_not_confirmed";

export const postSignIn = async (payload: SignIn): Promise<string | void> => {
  try {
    const supabase = await createServerSupabase();
    const { email, password } = payload;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!data || error) {
      console.error(error);
      throw error;
    }
  } catch (error) {
    if (error instanceof AuthApiError) {
      if (error.status === 400) {
        const errorMessage = error.code === NOT_CONFIRMED ? EMAIL_NOT_CONFIRMED : INVALID_ERROR;
        throw errorMessage;
      } else throw SIGN_IN_FAIL;
    }
    throw SERVER_ERROR;
  }
};
