import { DEFAULT_ERROR_MESSAGE, DELETE_USER_MESSAGE } from "@/constants/message-constants";
import { CustomError } from "@/utils/error";
import { createAuthSupabase } from "@/utils/supabase-auth";
import { NextResponse } from "next/server";

const { SERVER_ERROR, CLIENT_ERROR } = DEFAULT_ERROR_MESSAGE;
const { DELETE_FAIL, DELETE_SUCCESS } = DELETE_USER_MESSAGE;
export const DELETE = async () => {
  try {
    const supabase = await createAuthSupabase();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();
    if (!user || !user.id || error) throw new CustomError(CLIENT_ERROR);
    const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
    if (deleteError) throw new CustomError(DELETE_FAIL);
    return NextResponse.json({ message: DELETE_SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
