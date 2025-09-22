"use server";

import { API_METHOD, TMDB_API_HEADER } from "@/constants/api-constants";
import { MY_CONTENTS_MESSAGE, UPDATE_PASSWORD_MESSAGE } from "@/constants/message-constants";
import { TMDB_BASE_URL } from "@/constants/path-constants";
import { CombinedData } from "@/types/contents-types";
import type { InitReturnType, LikedContentState } from "@/types/server-action-return-type";
import { createServerSupabase } from "@/utils/supabase-server";

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

const { NO_CONTENT_DATA } = MY_CONTENTS_MESSAGE;
const API_KEY = process.env.TMDB_API_KEY;
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
  const url = `${TMDB_BASE_URL}/${type}/${id}?api_key=${API_KEY}&language=ko-KR`;
  const res = await fetch(url, {
    method: API_METHOD.GET,
    headers: TMDB_API_HEADER,
  });

  if (!res.ok) {
    console.error(
      `ID ${id} 콘텐츠 가져오기 실패\nDB에는 해당 콘텐츠 아이디 저장\n마이 페이지 진입 시 다시 fetching 시도`,
    );
    // throw new Error(NO_CONTENT_DATA);
    return { success: false, message: NO_CONTENT_DATA, content: [] };
  }

  const content = await res.json();
  const filteredContent: CombinedData = {
    id: content.id,
    type: content.release_date ? "movie" : "tv",
    imgUrl: content.poster_path,
    title: content.title || content.name,
  };
  return { success: true, message: null, content: filteredContent };
};
