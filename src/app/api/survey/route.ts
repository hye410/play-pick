import { DEFAULT_ERROR_MESSAGE, SURVEY_MESSAGE } from "@/constants/message-constants";
import { CustomError } from "@/utils/error";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { FETCH_ADDED_QUESTIONS_FAIL, FETCH_COMMON_QUESTIONS_FAIL } = SURVEY_MESSAGE;
export const GET = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const searchParams = request.nextUrl.searchParams;
    const separatedKey = searchParams.get("separated_key");
    if (separatedKey) {
      const { data: questions, error } = await supabase
        .from("survey_questions")
        .select("*")
        .eq("separated_key", separatedKey);
      if (error) throw new CustomError(FETCH_ADDED_QUESTIONS_FAIL);
      return NextResponse.json({ questions }, { status: 200 });
    } else {
      const { data: questions, error } = await supabase
        .from("survey_questions")
        .select("*")
        .eq("is_common", true)
        .order("step", { ascending: true });
      if (error) throw new CustomError(FETCH_COMMON_QUESTIONS_FAIL);
      return NextResponse.json({ questions }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    if (error instanceof CustomError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
