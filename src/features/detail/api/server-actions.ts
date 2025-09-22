"use server";

import { TOGGLE_LIKES_MESSAGE, USER_LIKES_MESSAGE } from "@/constants/message-constants";
import type { CombinedData } from "@/types/contents-types";
import type { InitReturnType, UserLikesState } from "@/types/server-action-return-type";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { createServerSupabase } from "@/utils/supabase-server";
import type { User } from "@supabase/supabase-js";

const { FETCH_FAIL } = USER_LIKES_MESSAGE;
/**
 * 유저가 찜한 목록을 호출하는 함수
 * @param userId user의 id
 * @returns 유저가 찜한 콘텐츠의 id와 type
 */
export const getUserLikes = async (userId: User["id"]): Promise<UserLikesState> => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("likes").select("*").eq("user_id", userId);

  if (error) return { success: false, message: FETCH_FAIL, userLikes: [] };
  const userLikes: Array<USER_LIKES_TYPE> =
    data.map((like) => ({ id: like.content_id, type: like.content_type })) ?? [];
  return { success: true, message: null, userLikes };
};

const { LIKES_ADD_FAIL, LIKES_REMOVE_FAIL, LIKES_ADD_SUCCESS, LIKES_REMOVE_SUCCESS } = TOGGLE_LIKES_MESSAGE;

/**
 * 유저의 찜 리스트에 새 콘텐츠 추가를 요청하는 함수
 * @param payload 추가하려는 콘텐츠 type, 추가하려는 콘텐츠 id, 유저 id
 * @returns 찜 리스트 추가 성공 여부 / 그에 따른 메시지
 */
export const addToUserLikes = async (payload: {
  contentType: CombinedData["type"];
  contentId: CombinedData["id"];
  userId: User["id"];
}): Promise<InitReturnType> => {
  const supabase = await createServerSupabase();
  const { contentType, contentId, userId } = payload;
  const { error } = await supabase
    .from("likes")
    .insert({ content_id: contentId, user_id: userId, content_type: contentType });
  if (error) {
    console.error(error);
    return { success: false, message: LIKES_ADD_FAIL };
  }
  return { success: true, message: LIKES_ADD_SUCCESS };
};

/**
 * 유저의 찜 리스트에서 특정 콘텐츠 삭제를 요청하는 함수
 * @param userId 유저의 id
 * @param contentId 삭제하려는 콘텐츠의 id
 * @returns 찜 리스트에서 삭제 성공 여부 / 그에 따른 메시지
 */
export const deleteFromUserLikes = async (
  userId: User["id"],
  contentId: CombinedData["id"],
): Promise<InitReturnType> => {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("likes").delete().match({ user_id: userId, content_id: contentId });
  if (error) {
    console.error(error);
    return { success: false, message: LIKES_REMOVE_FAIL };
  }
  return { success: true, message: LIKES_REMOVE_SUCCESS };
};
