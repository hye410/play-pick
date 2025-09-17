"use server";
import { CustomError } from "@/utils/error";
import { createServerSupabase } from "@/utils/supabase-server";
import { DEFAULT_ERROR_MESSAGE, SIGN_UP_MESSAGE } from "@/constants/message-constants";
import type { SignUp } from "@/types/form-types";

const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { DUPLICATION_ERROR, SIGN_UP_SUCCESS, OVER_SEND_LIMIT, INVALID_EMAIL_ADDRESS } = SIGN_UP_MESSAGE;
type PostSignUp = Pick<SignUp, "email" | "password">;

const ALREADY_EXIST_STATUS = 429;
const INVALID_EMAIL_ADDRESS_CODE = "email_address_invalid";
export const postSignUp = async (payload: PostSignUp) => {
  try {
    const supabase = await createServerSupabase();
    const { email, password } = payload;
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error && error.status === ALREADY_EXIST_STATUS) throw new CustomError(OVER_SEND_LIMIT);
    if (error && error.code === INVALID_EMAIL_ADDRESS_CODE) throw new CustomError(INVALID_EMAIL_ADDRESS);
    if (!user) throw error;
    if (user && user.role === "") throw new CustomError(DUPLICATION_ERROR);

    return SIGN_UP_SUCCESS;
  } catch (error) {
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    throw errorMessage;
  }
};
