"use server";
import { TOGGLE_LIKES_MESSAGE } from "@/constants/message-constants";
import { FilteredDetailData } from "@/types/contents-types";
import { createServerSupabase } from "@/utils/supabase-server";
import { revalidatePath } from "next/cache";
const { LIKES_ADD_FAIL, LIKES_REMOVE_FAIL, LIKES_ADD_SUCCESS, LIKES_REMOVE_SUCCESS } = TOGGLE_LIKES_MESSAGE;
export const toggleLikeStatus = async (
  contentType: FilteredDetailData["type"],
  contentId: FilteredDetailData["id"],
  isLiked: boolean,
) => {
  try {
    const supabase = await createServerSupabase();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) throw new Error("에러가 발생했습니다. 로그인을 다시 해주세요.");

    let successMessage: string = LIKES_REMOVE_SUCCESS;
    if (isLiked) {
      const { error } = await supabase.from("likes").delete().eq("content_id", contentId);
      if (error) throw new Error(LIKES_ADD_FAIL);
    } else {
      const userId = session.user.id;
      const { error } = await supabase
        .from("likes")
        .insert({ content_id: contentId, user_id: userId, content_type: contentType });
      if (error) throw new Error(LIKES_REMOVE_FAIL);
      successMessage = LIKES_ADD_SUCCESS;
    }
    revalidatePath(`/detail/${contentId}`);
    return { message: successMessage };
  } catch (error) {
    throw error;
  }
};
