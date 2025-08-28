import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { AuthApiError } from "@supabase/supabase-js";
import { DEFAULT_ERROR_MESSAGE, SIGN_IN_MESSAGE } from "@/constants/message-constants";
const { EMAIL_NOT_CONFIRMED, INVALID_ERROR } = SIGN_IN_MESSAGE;
const { FETCH_ERROR, SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;

const NOT_CONFIRMED = "email_not_confirmed";

export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (!data || error) throw error;

    return NextResponse.json({ message: "로그인 성공", userId: data.user.id }, { status: 200 });
  } catch (error) {
    if (error instanceof AuthApiError) {
      if (error.status === 400) {
        const errorMessage = error.code === NOT_CONFIRMED ? EMAIL_NOT_CONFIRMED : INVALID_ERROR;
        return NextResponse.json({ message: errorMessage }, { status: 400 });
      } else return NextResponse.json({ message: FETCH_ERROR }, { status: 500 });
    }
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
