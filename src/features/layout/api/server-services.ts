"use server";

import { DEFAULT_ERROR_MESSAGE, SIGN_OUT_MESSAGE } from "@/constants/message-constants";
import { CustomError } from "@/utils/error";
import { createServerSupabase } from "@/utils/supabase-server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { SIGN_OUT_FAIL } = SIGN_OUT_MESSAGE;
export const getSignOut = async () => {
  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw new CustomError(SIGN_OUT_FAIL);
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    throw errorMessage;
  }
};
