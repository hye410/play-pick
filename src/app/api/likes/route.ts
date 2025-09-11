import { DEFAULT_ERROR_MESSAGE } from "@/constants/message-constants";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
export const GET = async (request: NextRequest) => {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.from("likes").select("*").eq("user_id", userId);
    if (error) throw error;
    const likes: Array<USER_LIKES_TYPE> = data.map((like) => ({ id: like.content_id, type: like.content_type }));
    return NextResponse.json({ data: likes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
