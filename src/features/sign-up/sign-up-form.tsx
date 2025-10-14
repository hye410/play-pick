"use client";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import LoadingSpinner from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { FORM_CONSTANTS, PASSWORD_CONDITION } from "@/constants/form-constants";
import { SIGN_IN } from "@/constants/path-constants";
import { postSignUp } from "@/features/sign-up/api/server-actions";
import { signUpDefaultValues, signUpSchema } from "@/features/sign-up/utils/form-schema";
import type { SignUp } from "@/types/form-types";
import type { InitReturnType } from "@/types/server-action-return-type";
import { alert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";

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
      <FormInput<SignUp>
        name={email}
        label={"이메일"}
        labelClassName="hidden xs:block"
        type="text"
        control={control}
        autoFocus={true}
        placeholder={"이메일을 입력해 주세요."}
        inputFieldClassName="w-full"
        errorFieldClassName="text-sm sm:text-base"
      />
      <FormInput<SignUp>
        name={password}
        label={"비밀번호"}
        labelClassName="hidden xs:block"
        type="password"
        control={control}
        placeholder={"비밀번호를 입력해 주세요."}
        inputFieldClassName="w-full"
      />
      <FormInput<SignUp>
        name={confirmPassword}
        label={"비밀번호 확인"}
        labelClassName="hidden xs:block"
        type="password"
        control={control}
        placeholder={"비밀번호를 다시 확인해 주세요."}
        inputFieldClassName="w-full"
      />
      <p className="mb-8 whitespace-pre-line break-keep text-left text-[12px] sm:ml-[25%] sm:text-sm">
        {PASSWORD_CONDITION}
      </p>
      <div className="w-full md:ml-[25%] md:w-[75%]">
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoadingSpinner width="24px" height="24px" /> : "회원가입"}
        </Button>
      </div>
    </form>
  );
};

export default SignUpForm;
