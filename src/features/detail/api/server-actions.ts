"use server";

import { USER_LIKES_MESSAGE } from "@/constants/message-constants";
import type { UserLikesState } from "@/types/server-action-return-type";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { User } from "@/types/user-types";
import { createServerSupabase } from "@/utils/supabase-server";

const { FETCH_FAIL } = USER_LIKES_MESSAGE;
export const getUserLikes = async (userId: User["id"]): Promise<UserLikesState> => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.from("likes").select("*").eq("user_id", userId);

  if (error) return { success: false, message: FETCH_FAIL, userLikes: [] };
  const userLikes: Array<USER_LIKES_TYPE> =
    data.map((like) => ({ id: like.content_id, type: like.content_type })) ?? [];
  return { success: true, message: null, userLikes };
};
