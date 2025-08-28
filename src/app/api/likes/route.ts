import { DEFAULT_ERROR_MESSAGE, TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";
import { FilteredDetailData } from "@/types/contents-types";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { ADD_TO_LIKES, REMOVE_FROM_LIKES } = TOGGLE_LIKES_MESSAGE;
export const GET = async (request: NextRequest) => {
  try {
    const userId = request.nextUrl.searchParams.get("userId");
    const supabase = await createServerSupabase();
    const { data, error } = await supabase.from("likes").select("content_id").eq("user_id", userId);
    if (error) throw error;
    const likes: { content_id: FilteredDetailData["id"] }[] = data.map(({ content_id }) => content_id);
    return NextResponse.json({ data: likes }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const { likedContentId } = await request.json();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return NextResponse.json({ message: "로그인을 다시 해주세요." }, { status: 400 });
    const userId = session.user.id;
    const { error } = await supabase.from("likes").insert({ content_id: likedContentId, user_id: userId });
    if (error) throw error;
    return NextResponse.json({ message: ADD_TO_LIKES }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const contentId = request.nextUrl.searchParams.get("contentId");
    const supabase = await createServerSupabase();
    const { error } = await supabase.from("likes").delete().eq("content_id", contentId);
    if (error) throw error;
    return NextResponse.json({ message: REMOVE_FROM_LIKES }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: SERVER_ERROR }, { status: 500 });
  }
};
