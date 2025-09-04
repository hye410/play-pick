import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;

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
      if (error) throw error;
      return NextResponse.json({ questions }, { status: 200 });
    } else {
      const { data: questions, error } = await supabase
        .from("survey_questions")
        .select("*")
        .eq("is_common", true)
        .order("step", { ascending: true });
      if (error) throw error;

      return NextResponse.json({ questions }, { status: 200 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
