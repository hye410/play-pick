"use server";

import { DEFAULT_YOUTUBE_SEARCH_API } from "@/constants/api-constants";
import { LIKES_DB } from "@/constants/db-constants";
import { PREVIEW_VIDEO_MESSAGE, TOGGLE_LIKES_MESSAGE, USER_LIKES_MESSAGE } from "@/constants/message-constants";
import type { CombinedData, FilteredDetailData } from "@/types/contents-types";
import type { YOUTUBE_RESPONSE_TYPE, YOUTUBE_RESULT_TYPE } from "@/types/preview-types";
import type { CheckUserLikeState, InitReturnType, UserLikesByPageState } from "@/types/server-action-return-type";
import type { USER_LIKES_TYPE } from "@/types/user-likes-type";
import { createServerSupabase } from "@/utils/supabase-server";
import type { User } from "@supabase/supabase-js";
const { likes, contentId: contentIdInDB, contentType: contentTypeInDB, userId: userIdInDB } = LIKES_DB;
const { FETCH_FAIL: FAIL_FETCH_USER_LIKES } = USER_LIKES_MESSAGE;

/**
 * 유저의 찜 리스트에 특정 콘텐츠가 존재하는지 확인을 요청하는 함수
 * @param userId user의 ID
 * @param contentId 유저의 찜 리스트에 있는지 확인하고 싶은 콘텐츠의 ID
 * @returns 유저의 찜 리스트에 해당 콘텐츠의 존재 여부
 */
export const checkIsUserLikes = async (
  userId: User["id"],
  contentId: CombinedData["id"],
): Promise<CheckUserLikeState> => {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from(likes)
    .select(contentIdInDB)
    .eq(userIdInDB, userId)
    .eq(contentIdInDB, contentId)
    .limit(1);
  if (error) return { success: false, message: FAIL_FETCH_USER_LIKES };
  return {
    success: true,
    message: null,
    isUserLikes: data.length > 0,
  };
};

const COUNT_PER_PAGE = 12;
/**
 * 특정 페이지에 대한 유저의 찜 목록을 호출하는 함수
 * @param userId user의 ID
 * @param pageParam 요청할 페이지
 * @returns 해당 페이지에 대한 찜 목록
 */
export const getUserLikesByPage = async (userId: User["id"], pageParam: number = 1): Promise<UserLikesByPageState> => {
  const supabase = await createServerSupabase();
  const startIdx = (pageParam - 1) * COUNT_PER_PAGE;
  const endIdx = startIdx + COUNT_PER_PAGE - 1;
  const { data, error, count } = await supabase
    .from(likes)
    .select(`${contentIdInDB},${contentTypeInDB}`, { count: "exact" })
    .eq(userIdInDB, userId)
    .range(startIdx, endIdx)
    .order("created_at", { ascending: true });
  if (error) return { success: false, message: FAIL_FETCH_USER_LIKES, userLikes: [] };
  const userLikes: Array<USER_LIKES_TYPE> =
    data.map((like) => ({ id: like[contentIdInDB], type: like[contentTypeInDB] })) ?? [];
  const totalPages = count ? Math.ceil(count / COUNT_PER_PAGE) : 0;
  const hasNextPage = pageParam < totalPages;
  return {
    success: true,
    message: null,
    userLikes,
    nextPage: hasNextPage ? pageParam + 1 : undefined,
  };
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
    .from(likes)
    .insert({ [contentIdInDB]: contentId, [userIdInDB]: userId, [contentTypeInDB]: contentType });
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
  const { error } = await supabase
    .from(likes)
    .delete()
    .match({ [userIdInDB]: userId, [contentIdInDB]: contentId });
  if (error) {
    console.error(error);
    return { success: false, message: LIKES_REMOVE_FAIL };
  }
  return { success: true, message: LIKES_REMOVE_SUCCESS };
};

const { FETCH_VIDEO_FAIL, UNABLE_TO_FIND_PREVIEW } = PREVIEW_VIDEO_MESSAGE;
/**
 * 콘텐츠 프리뷰 유튜브 데이터를 요청하는 함수
 * @param title 프리뷰를 요청할 콘텐츠 제목
 * @returns api 요청 성공 여부와 그에 따른 메시지 / 성공 시 데이터 id와 제목
 */
export const getPreviewVideo = async (title: FilteredDetailData["title"]) => {
  const res = await fetch(DEFAULT_YOUTUBE_SEARCH_API(title));

  if (!res.ok) {
    console.error(res);
    return { success: false, message: FETCH_VIDEO_FAIL };
  }
  const data: YOUTUBE_RESPONSE_TYPE = await res.json();
  const item: YOUTUBE_RESULT_TYPE = data.items?.[0];

  if (item) return { success: true, message: null, data: { videoId: item.id.videoId, videoTitle: item.snippet.title } };
  else return { success: false, message: UNABLE_TO_FIND_PREVIEW };
};
