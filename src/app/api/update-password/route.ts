import { DEFAULT_ERROR_MESSAGE, UPDATE_PASSWORD_MESSAGE } from "@/constants/message-constants";
import { CustomError } from "@/utils/error";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { UPDATE_FAIL, UPDATE_SUCCESS, SAME_PASSWORD_ERROR } = UPDATE_PASSWORD_MESSAGE;
const SAME_PASSWORD_CODE = 422;
export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const { password } = await request.json();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      if (error.status === SAME_PASSWORD_CODE) throw new CustomError(SAME_PASSWORD_ERROR, 400);
      throw new CustomError(UPDATE_FAIL);
    }
    return NextResponse.json({ message: UPDATE_SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    let errorCode: number = 500;
    if (error instanceof CustomError) {
      errorMessage = error.message;
      errorCode = error.code ?? 500;
    }
    return NextResponse.json({ message: errorMessage }, { status: errorCode });
  }
};
