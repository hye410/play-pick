export const DEFAULT_ERROR_MESSAGE = Object.freeze({
  SERVER_ERROR: "내부 서버 오류가 발생했습니다.",
  FETCH_ERROR: "데이터를 받아오는데 실패했습니다.",
  CLIENT_ERROR: "에러가 발생했습니다.<br />새로고침 후 다시 시도해 주세요.",
  EXPIRED_SESSION_ERROR: "세션이 만료되었습니다.<br />로그인을 다시 진행해 주세요.",
} as const);

export const TODAY_PICK_MESSAGE = Object.freeze({
  FETCH_MOVIE_ERROR: "영화 데이터를 받아오는데 실패했습니다.",
  FETCH_TV_ERROR: "TV 데이터를 받아오는데 실패했습니다.",
} as const);

export const SIGN_UP_MESSAGE = Object.freeze({
  DUPLICATION_ERROR: "이미 존재하는 계정이거나 이메일 인증이 필요한 계정입니다.",
  SIGN_UP_SUCCESS: "이메일이 발송되었습니다.<br />인증 후 회원가입이 완료됩니다.",
  OVER_SEND_LIMIT: "인증 메일이 이미 전송되었습니다.<br />인증을 마저 진행해 주세요.",
  INVALID_EMAIL_ADDRESS: "이메일 주소가 유효하지 않습니다.",
} as const);

export const SIGN_IN_MESSAGE = Object.freeze({
  EMAIL_NOT_CONFIRMED: "이메일 인증 후 로그인해 주세요.",
  INVALID_ERROR: "아이디 혹은 비밀번호를 다시 확인해 주세요.",
  SIGN_IN_FAIL: "서버 오류가 발생하여 로그인에 실패하였습니다.",
} as const);

export const FIND_PASSWORD_MESSAGE = Object.freeze({
  SUCCESS_SENDING_EMAIL: "이메일이 전송되었습니다.<br />가입하신 이메일을 확인해 주세요.",
  OVER_EMAIL_SEND_RATE_LIMIT: "이미 전송된 이메일이 있습니다.<br />가입하신 이메일을 확인해 주세요.",
} as const);

export const PREVIEW_VIDEO_MESSAGE = Object.freeze({
  UNABLE_TO_FIND_PREVIEW: "해당 예고편을 찾을 수 없습니다.",
} as const);

export const TOGGLE_LIKES_MESSAGE = Object.freeze({
  LIKES_ADD_SUCCESS: "찜 목록에 추가되었습니다.",
  LIKES_ADD_FAIL: "찜 목록 추가에 실패했습니다.<br />다시 시도해 주세요.",
  LIKES_REMOVE_SUCCESS: "찜 목록에서 삭제되었습니다.",
  LIKES_REMOVE_FAIL: "찜 목록에서 삭제하는데 실패했습니다.<br />다시 시도해 주세요.",
} as const);

export const SURVEY_MESSAGE = Object.freeze({
  FETCH_ADDED_QUESTIONS_FAIL: "추가 질문을 가져오는데 실패했습니다.",
  FETCH_COMMON_QUESTIONS_FAIL: "질문을 받아오는데 실패했습니다.<br />새로고침 후 다시 시도해 주세요.",
} as const);

export const RESULT_MESSAGE = Object.freeze({
  FETCH_RECOMMEND_FAIL: "추천 목록을 내려받는데 실패했습니다.",
} as const);

export const DELETE_USER_MESSAGE = Object.freeze({
  DELETE_FAIL: "회원 탈퇴에 실패했습니다.",
  DELETE_SUCCESS: "계정이 삭제되었습니다. 그동안 이용해 주셔서 감사합니다.",
  DELETE_CONFIRM: "정말 탈퇴하시겠습니까?",
  DELETE_WARNING: "탈퇴 후 모든 데이터가 삭제됩니다.",
} as const);

export const SIGN_OUT_MESSAGE = Object.freeze({
  SIGN_OUT_FAIL: "로그아웃 중 에러가 발생했습니다.",
} as const);

export const UPDATE_PASSWORD_MESSAGE = Object.freeze({
  UPDATE_FAIL: "비밀번호를 바꾸는데 실패했습니다. 다시 시도해 주세요.",
  UPDATE_SUCCESS: "비밀번호가 변경되었습니다.",
  SAME_PASSWORD_ERROR: "기존과 같은 비밀번호로 설정할 수 없습니다.",
} as const);

export const MY_CONTENTS_MESSAGE = Object.freeze({
  PAYLOAD_FAIL: "찜한 콘텐츠가 없습니다.",
  FETCH_FAIL: "데이터를 내려받는 과정에서 오류가 발생했습니다.",
  UNKNOWN_CONTENT_TYPE: "콘텐츠 타입을 알 수 없어 데이터를 받아올 수 없습니다.",
  NO_CONTENT_DATA: "해당 콘텐츠에 대한 데이터를 찾을 수 없습니다.",
  SINGLE_CONTENT_FETCH_FAIL: "콘텐츠 정보를 가져오는 데 실패하여 찜 상태가 취소되었습니다.",
} as const);
