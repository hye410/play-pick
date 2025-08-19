"use client";
import Button from "@/components/Button";
import FormInput from "@/components/form-input";
import { FORM_CONSTANTS } from "@/constants/form-constants";
import type { SignUp } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { postSignUp } from "./api/services";
import { signUpDefaultValues, signUpSchema } from "./utils/form-schema";
import { SweetAlertResult } from "sweetalert2";
import { alert } from "@/utils/alert";
import { ALERT_TYPE } from "@/constants/alert-constants";
const { email, password, confirmPassword } = FORM_CONSTANTS;
const { ERROR, SUCCESS } = ALERT_TYPE;
const SignUpForm = () => {
  const { handleSubmit, control } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: signUpDefaultValues,
  });

  const handleSignUp = async (value: SignUp): Promise<SweetAlertResult> => {
    try {
      const res = await postSignUp({ email: value.email, password: value.password });
      return alert({ type: SUCCESS, message: res });
    } catch (error) {
      return alert({ type: ERROR, message: error as string });
    }
  };

  const onSubmit: SubmitHandler<SignUp> = (data) => handleSignUp(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 text-center">
      <FormInput<SignUp> name={email} label="이메일" type="text" control={control} autoFocus={true} />
      <FormInput<SignUp>
        name={password}
        label="비밀번호"
        placeholder="8자 이상이며 대문자·소문자·숫자·특수문자를 포함"
        type="password"
        control={control}
      />
      <FormInput<SignUp> name={confirmPassword} label="비밀번호 확인" type="password" control={control} />
      <div className="ml-[25%] w-[75%]">
        <Button type="submit">회원가입</Button>
      </div>
    </form>
  );
};

export default SignUpForm;
