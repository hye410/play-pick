import { FORM_CONSTANTS } from "@/constants/form-constants";
import z from "zod";
const { email, password, confirmPassword } = FORM_CONSTANTS;
const passwordRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!._\?\-@\$%\^&\*\(\)\+=]).{8,}$/);

export const signUpDefaultValues = {
  [email]: "",
  [password]: "",
  [confirmPassword]: "",
};

export const signUpSchema = z
  .object({
    [email]: z.email("유효한 이메일 주소를 입력해 주세요."),
    [password]: z
      .string()
      .min(8, "비밀번호는 8자 이상이어야 합니다.")
      .regex(passwordRegex, "비밀번호 조건을 확인해 주세요."),
    [confirmPassword]: z.string().min(1, "비밀번호를 확인해 주세요."),
  })
  .refine((data) => data[password] === data[confirmPassword], {
    path: [confirmPassword],
    error: "비밀번호가 일치하지 않습니다.",
  });
