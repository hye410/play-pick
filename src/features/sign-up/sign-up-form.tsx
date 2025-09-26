"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import LoadingSpinner from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { FORM_CONSTANTS, PASSWORD_CONDITION } from "@/constants/form-constants";
import { postSignUp } from "@/features/sign-up/api/server-actions";
import { signUpDefaultValues, signUpSchema } from "@/features/sign-up/utils/form-schema";
import type { SignUp } from "@/types/form-types";
import { alert } from "@/utils/alert";
import type { InitReturnType } from "@/types/server-action-return-type";
import { useRouter } from "next/navigation";
import { SIGN_IN } from "@/constants/path-constants";

const { email, password, confirmPassword } = FORM_CONSTANTS;
const { ERROR, SUCCESS } = ALERT_TYPE;

const initialState: InitReturnType = {
  success: false,
  message: null,
};
const SignUpForm = () => {
  const [isPending, startTransition] = useTransition();
  const [state, requestSignUp] = useActionState(postSignUp, initialState);
  const { handleSubmit, control } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: signUpDefaultValues,
  });
  const router = useRouter();
  useEffect(() => {
    if (state.success && state.message) {
      alert({
        type: SUCCESS,
        message: state.message as string,
      }).then(() => router.replace(SIGN_IN));
    } else if (!state.success && state.message) {
      alert({
        type: ERROR,
        message: state.message as string,
      });
    }
  }, [state]);

  const handleSignUp = (userInfo: SignUp) => {
    const { email, password } = userInfo;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    startTransition(() => requestSignUp(formData));
  };

  return (
    <form onSubmit={handleSubmit(handleSignUp)} className="text-center">
      <FormInput<SignUp> name={email} label="이메일" type="text" control={control} autoFocus={true} />
      <FormInput<SignUp> name={password} label="비밀번호" type="password" control={control} />
      <FormInput<SignUp> name={confirmPassword} label="비밀번호 확인" type="password" control={control} />
      <p className="mb-8 ml-[25%] whitespace-pre-line text-left text-sm">{PASSWORD_CONDITION}</p>
      <div className="ml-[25%] w-[75%]">
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoadingSpinner width="24px" height="24px" /> : "회원가입"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
