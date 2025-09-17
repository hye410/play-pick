"use server";

import { UPDATE_PASSWORD_MESSAGE } from "@/constants/message-constants";
import type { SignUp } from "@/types/form-types";
import { createServerSupabase } from "@/utils/supabase-server";
import { AuthApiError } from "@supabase/supabase-js";
const { UPDATE_FAIL, UPDATE_SUCCESS, SAME_PASSWORD_ERROR } = UPDATE_PASSWORD_MESSAGE;

const SAME_PASSWORD_CODE = "same_password";

export const updatePassword = async (payload: Pick<SignUp, "password">) => {
  try {
    const supabase = await createServerSupabase();
    const { password } = payload;
    const { error } = await supabase.auth.updateUser({
      password,
    });
    if (error) throw error;
    return UPDATE_SUCCESS;
  } catch (error) {
    console.error(error);
    let errorMessage: string = UPDATE_FAIL;
    if (error instanceof AuthApiError) {
      if (error.code === SAME_PASSWORD_CODE) errorMessage = SAME_PASSWORD_ERROR;
    }
    throw errorMessage;
  }
};
