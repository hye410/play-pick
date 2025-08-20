import { BASE_URL, UPDATE_PASSWORD } from "@/constants/path-constants";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
import { AuthApiError } from "@supabase/supabase-js";
import { DEFAULT_ERROR_MESSAGE, FIND_PASSWORD_MESSAGE } from "@/constants/message-constants";

const { FETCH_ERROR, SERVER_ERROR, CLIENT_ERROR } = DEFAULT_ERROR_MESSAGE;
const { SUCCESS_SENDING_EMAIL, OVER_EMAIL_SEND_RATE_LIMIT } = FIND_PASSWORD_MESSAGE;
export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const { email } = await request.json();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${BASE_URL}${UPDATE_PASSWORD}`,
    });
    if (error) throw error;
    return NextResponse.json({ message: SUCCESS_SENDING_EMAIL }, { status: 200 });
  } catch (error) {
    console.error(error);
    if (error instanceof AuthApiError) {
      if (error.status >= 400 && error.status < 500) {
        const errorMessage = error.status === 429 ? OVER_EMAIL_SEND_RATE_LIMIT : CLIENT_ERROR;
        return NextResponse.json({ message: errorMessage }, { status: 400 });
      }
      return NextResponse.json({ message: FETCH_ERROR }, { status: error.status });
    }
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
