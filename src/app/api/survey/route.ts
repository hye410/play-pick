import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
export const GET = async () => {
  try {
    const supabase = await createServerSupabase();
    const { data: questions, error } = await supabase.from("survey_questions").select();
    if (error) throw error;

    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
