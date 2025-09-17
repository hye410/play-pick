"use client";
import type { SignUp } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import { postSignUp } from "@/features/sign-up/api/server-actions";
import { signUpDefaultValues, signUpSchema } from "@/features/sign-up/utils/form-schema";
import { alert } from "@/utils/alert";
import { FORM_CONSTANTS } from "@/constants/form-constants";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";
const { email, password, confirmPassword } = FORM_CONSTANTS;
const { ERROR, SUCCESS } = ALERT_TYPE;
const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, control, reset } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: signUpDefaultValues,
  });

  const handleSignUp = async (value: SignUp) => {
    try {
      setIsLoading(true);
      const res = await postSignUp({ email: value.email, password: value.password });
      alert({ type: SUCCESS, message: res });
      reset();
    } catch (error) {
      alert({ type: ERROR, message: error as string });
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit: SubmitHandler<SignUp> = (data) => handleSignUp(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="text-center">
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
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner width="24px" height="24px" pointColor="secondary" /> : "회원가입"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
