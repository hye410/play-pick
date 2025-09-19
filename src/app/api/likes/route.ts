import { DEFAULT_ERROR_MESSAGE, TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";
import { CustomError } from "@/utils/error";
import { createServerSupabase } from "@/utils/supabase-server";
import { NextRequest, NextResponse } from "next/server";
const { SERVER_ERROR } = DEFAULT_ERROR_MESSAGE;
const { LIKES_ADD_FAIL, LIKES_REMOVE_FAIL, LIKES_ADD_SUCCESS, LIKES_REMOVE_SUCCESS } = TOGGLE_LIKES_MESSAGE;

export const POST = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const { contentType, contentId, userId } = await request.json();
    const { error } = await supabase
      .from("likes")
      .insert({ content_id: contentId, user_id: userId, content_type: contentType });
    if (error) throw new CustomError(LIKES_REMOVE_FAIL);
    return NextResponse.json({ message: LIKES_ADD_SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const supabase = await createServerSupabase();
    const contentId = request.nextUrl.searchParams.get("contentId");
    const userId = request.nextUrl.searchParams.get("userId");
    const { error } = await supabase.from("likes").delete().match({ user_id: userId, content_id: contentId });
    if (error) throw new CustomError(LIKES_ADD_FAIL);
    return NextResponse.json({ message: LIKES_REMOVE_SUCCESS }, { status: 200 });
  } catch (error) {
    console.error(error);
    let errorMessage: string = SERVER_ERROR;
    if (error instanceof CustomError) errorMessage = error.message;
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
};
