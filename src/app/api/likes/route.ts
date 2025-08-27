import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
export const GET = async (request: NextRequest) => {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.from("likes").select("content_id").eq("user_id", userId);
    if (error) throw error;
    const likes: { content_id: number }[] = data.map(({ content_id }) => content_id);
    return NextResponse.json({ data: likes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
