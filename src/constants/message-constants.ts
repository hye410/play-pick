export const DEFAULT_ERROR_MESSAGE = Object.freeze({
  SERVER_ERROR: "내부 서버 오류가 발생했습니다.",
  FETCH_ERROR: "데이터를 받아오는데 실패했습니다.",
} as const);

export const TODAY_PICK_ERROR_MESSAGE = Object.freeze({
  FETCH_MOVIE_ERROR: "영화 데이터를 받아오는데 실패했습니다.",
  FETCH_TV_ERROR: "TV 데이터를 받아오는데 실패했습니다.",
} as const);
