export const FORM_CONSTANTS = Object.freeze({
  email: "email",
  password: "password",
  confirmPassword: "confirmPassword",
} as const);

export const PASSWORD_CONDITION =
  "* 비밀번호는 8자 이상이며\n* 대문자, 소문자, 숫자, 특수문자를 각각 1개 이상 포함해야 합니다";
