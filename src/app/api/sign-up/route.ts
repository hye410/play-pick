import { DEFAULT_ERROR_MESSAGE, SIGN_UP_MESSAGE } from "@/constants/message-constants";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { DUPLICATION_ERROR, SIGN_UP_SUCCESS, OVER_SEND_LIMIT } = SIGN_UP_MESSAGE;
export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const { email, password } = await request.json();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error?.status === 429) return NextResponse.json({ message: OVER_SEND_LIMIT }, { status: 429 });
    if (!data.user) throw error;
    if (data.user && data.user.role === "") return NextResponse.json({ message: DUPLICATION_ERROR }, { status: 400 });
    return NextResponse.json({ message: SIGN_UP_SUCCESS });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
