import { DEFAULT_ERROR_MESSAGE, SIGN_OUT_MESSAGE } from "@/constants/message-constants";
import { CustomError } from "@/utils/error";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { SIGN_OUT_FAIL, SIGN_OUT_SUCCESS } = SIGN_OUT_MESSAGE;
export const GET = async () => {
  try {
    const supabase = await createServerSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) throw new CustomError(SIGN_OUT_FAIL);
    return NextResponse.json({ message: SIGN_OUT_SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
