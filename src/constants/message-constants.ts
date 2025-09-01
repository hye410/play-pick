export const DEFAULT_ERROR_MESSAGE = Object.freeze({
  SERVER_ERROR: "내부 서버 오류가 발생했습니다.",
  FETCH_ERROR: "데이터를 받아오는데 실패했습니다.",
  CLIENT_ERROR: "에러가 발생했습니다.\n잠시 후 다시 시도해 주세요.",
} as const);

export const TODAY_PICK_MESSAGE = Object.freeze({
  FETCH_MOVIE_ERROR: "영화 데이터를 받아오는데 실패했습니다.",
  FETCH_TV_ERROR: "TV 데이터를 받아오는데 실패했습니다.",
} as const);

export const SIGN_UP_MESSAGE = Object.freeze({
  DUPLICATION_ERROR: "이미 존재하는 계정이거나 이메일 인증이 필요한 계정입니다.",
  SIGN_UP_SUCCESS: "이메일이 발송되었습니다.\n인증 후 회원가입이 완료됩니다.",
  OVER_SEND_LIMIT: "인증 메일이 이미 전송되었습니다. 인증을 마저 진행해 주세요.",
} as const);

export const SIGN_IN_MESSAGE = Object.freeze({
  EMAIL_NOT_CONFIRMED: "이메일 인증 후 로그인해 주세요.",
  INVALID_ERROR: "아이디 혹은 비밀번호를 다시 확인해 주세요.",
} as const);

export const FIND_PASSWORD_MESSAGE = Object.freeze({
  SUCCESS_SENDING_EMAIL: "이메일이 전송되었습니다. 가입하신 이메일을 확인해 주세요.",
  OVER_EMAIL_SEND_RATE_LIMIT: "이미 이메일이 전송되었습니다. 가입하신 이메일을 확인해 주세요.",
} as const);

export const UPDATE_PASSWORD_MESSAGE = Object.freeze({
  FAIL_TO_CHANGE_PASSWORD: "비밀번호 변경에 실패했습니다.",
  SUCCESS_TO_CHANGE_PASSWORD: "비밀번호가 변경되었습니다.",
  SAME_PASSWORD: "기존 비밀번호와 같은 비밀번호로 변경할 수 없습니다.",
});

export const PREVIEW_VIDEO_MESSAGE = Object.freeze({
  UNABLE_TO_FIND_PREVIEW: "해당 예고편을 찾을 수 없습니다.",
} as const);

export const TOGGLE_LIKES_MESSAGE = Object.freeze({
  LIKES_ADD_SUCCESS: "찜 목록에 추가되었습니다.",
  LIKES_ADD_FAIL: "찜 목록 추가에 실패했습니다.\n다시 시도해 주세요.",
  LIKES_REMOVE_SUCCESS: "찜 목록에서 삭제되었습니다.",
  LIKES_REMOVE_FAIL: "찜 목록에서 삭제하는데 실패했습니다.\n다시 시도해 주세요.",
} as const);
