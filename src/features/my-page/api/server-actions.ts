"use server";

import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { DELETE_USER_MESSAGE, MY_CONTENTS_MESSAGE, UPDATE_PASSWORD_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import type { CombinedData } from "@/types/contents-types";
import type {
  InitReturnType,
  LikedContentsState,
  LikedContentState,
  UserLikesCountState,
} from "@/types/server-action-return-type";
import type { ParsedData, RemoveContent, USER_LIKES_TYPE } from "@/types/user-likes-type";
import { createAuthSupabase } from "@/utils/supabase-auth";
import { createServerSupabase } from "@/utils/supabase-server";
import { User } from "@supabase/supabase-js";

const { UPDATE_FAIL, UPDATE_SUCCESS, SAME_PASSWORD_ERROR } = UPDATE_PASSWORD_MESSAGE;
const SAME_PASSWORD_CODE = "same_password";
/**
 * 비밀번호 변경 API를 호출하는 함수
 * @param _ 함수의 이전 반환 값
 * @param userData 바꿀 비밀번호를 담은 객체
 * @returns 비밀번호 변경 성공 여부와 메시지
 */
export const updatePassword = async (_: InitReturnType, userData: FormData): Promise<InitReturnType> => {
  const supabase = await createServerSupabase();
  const password = userData.get("password") as string;
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error(error);
    const errorMessage = error.code === SAME_PASSWORD_CODE ? SAME_PASSWORD_ERROR : UPDATE_FAIL;
    return { success: false, message: errorMessage };
  }

  return { success: true, message: UPDATE_SUCCESS };
};

export const getUserLikesCount = async (userId: User["id"]): Promise<UserLikesCountState> => {
  const supabase = await createServerSupabase();
  const { error, count } = await supabase.from("likes").select("content_id", { count: "exact" }).eq("user_id", userId);
  if (error) return { success: false, message: "좋아요 목록을 가져오는데 실패했습니다.", count: null };
  return { success: true, count, message: null };
};

const API_KEY = process.env.TMDB_API_KEY;

/**
 *
 * @param id TMDB 데이터를 요청 콘텐츠의 id
 * @param type TMDB 데이터를 요청 콘텐츠의 type (movie || tv)
 * @returns 요청한 TMDB 데이터 (실패한 데이터는 null로 받음)
 */
const fetchTmdbContent = async (id: number, type: string) => {
  const url = `${TMDB_BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=ko-KR`;
  const res = await fetch(url, {
    method: API_METHOD.GET,
    headers: TMDB_API_HEADER,
  });
  if (!res.ok) {
    console.error(`ID ${id} 콘텐츠 가져오기 실패`);
    return null;
  }
  return res.json();
};
const { NO_CONTENT_DATA } = MY_CONTENTS_MESSAGE;
/**
 * 특정 콘텐츠의 데이터를 TMDB에 요청하는 함수
 * @param id 특정 콘텐츠의 아이디
 * @param type 특정 콘텐츠의 타입
 * @returns tmdb api 호출 성공 여부 , 그에 따른 메시지 /  성공 시 특정 콘텐츠의 데이터
 */
export const getSingleContentData = async (
  id: CombinedData["id"],
  type: CombinedData["type"],
): Promise<LikedContentState> => {
  const content = await fetchTmdbContent(id, type);
  if (!content) return { success: false, message: NO_CONTENT_DATA, content: [] };

  const filteredContent: CombinedData = {
    id: content.id,
    type: content.release_date ? "movie" : "tv",
    imgUrl: content.poster_path,
    title: content.title || content.name,
  };
  return { success: true, message: null, content: filteredContent };
};

const { FETCH_SOME_FAIL, FETCH_ALL_FAIL } = MY_CONTENTS_MESSAGE;

const removeErrorProp = (content: RemoveContent) => {
  const { error, ...rest } = content;
  return rest;
};

/**
 * 유저가 찜한 콘텐츠의 TMDB 데이터를 호출하는 함수
 * @param userLikes 유저가 찜한 콘텐츠들
 * @returns 데이터 fetch 성공 여부와 fetch 받은 데이터
 */
export const getLikedContents = async (userLikes: Array<USER_LIKES_TYPE>): Promise<LikedContentsState> => {
  const fetchUserLikesData = userLikes.map(({ id, type }) => fetchTmdbContent(id, type));
  const settled = await Promise.allSettled(fetchUserLikesData);
  const allContents = settled.map((result, index) => {
    if (result.status === "fulfilled" && result.value !== null) {
      return {
        error: false,
        data: result.value,
      };
    } else {
      console.error(`ID ${userLikes[index].id} 콘텐츠 가져오기 실패`);
      return {
        error: true,
        data: null,
        id: userLikes[index].id,
        type: userLikes[index].type,
      };
    }
  });

  const parsedData: ParsedData = allContents.map((item) => {
    if (item.error) {
      return { id: item.id, type: item.type, error: true };
    }
    const content = item.data;
    return {
      id: content.id,
      type: content.name ? "tv" : "movie",
      imgUrl: content.poster_path,
      title: content.title ?? content?.name,
      error: false,
    };
  });

  const isFetchFail = allContents.some((item) => item.error);
  const validData = parsedData.filter(({ error }) => !error).map((data) => removeErrorProp(data));
  const failedData = parsedData.filter(({ error }) => error).map((data) => removeErrorProp(data));
  const isAllFetchFail = allContents.every((item) => item.error);
  if (isFetchFail) {
    return {
      success: false,
      message: isAllFetchFail ? FETCH_ALL_FAIL : FETCH_SOME_FAIL,
      contents: {
        validData,
        failedData,
      },
    };
  }
  return {
    success: true,
    message: null,
    contents: {
      failedData: [],
      validData: parsedData.map((data) => removeErrorProp(data)),
    },
  };
};

const { DELETE_FAIL, DELETE_SUCCESS } = DELETE_USER_MESSAGE;
/**
 * 회원 탈퇴를 요청하는 함수
 * @returns 회원 탈퇴 요청 성공 여부와 그에 따른 메시지
 */
export const deleteUser = async (): Promise<InitReturnType> => {
  const supabase = await createAuthSupabase();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) return { success: false, message: "에러가 발생했습니다.<br/>새로고침 후 다시 시도해 주세요." };
  const { error: deleteError } = await supabase.auth.admin.deleteUser(user.id);
  if (deleteError) return { success: false, message: DELETE_FAIL };
  return { success: true, message: DELETE_SUCCESS };
};
