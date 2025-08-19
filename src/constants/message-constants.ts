export const DEFAULT_ERROR_MESSAGE = Object.freeze({
  SERVER_ERROR: "내부 서버 오류가 발생했습니다.",
  FETCH_ERROR: "데이터를 받아오는데 실패했습니다.",
} as const);

export const TODAY_PICK_MESSAGE = Object.freeze({
  FETCH_MOVIE_ERROR: "영화 데이터를 받아오는데 실패했습니다.",
  FETCH_TV_ERROR: "TV 데이터를 받아오는데 실패했습니다.",
} as const);

export const SIGN_UP_MESSAGE = Object.freeze({
  DUPLICATION_ERROR: "이미 존재하는 계정이거나 이메일 인증이 필요한 계정입니다.",
  SIGN_UP_SUCCESS: "이메일이 발송되었습니다.\n인증 후 회원가입이 완료됩니다.",
} as const);
