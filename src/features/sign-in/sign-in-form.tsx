"use client";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import LoadingSpinner from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { postGuestSignIn, postSignIn } from "@/features/sign-in/api/server-actions";
import { signInDefaultValues, signInSchema } from "@/features/sign-up/utils/form-schema";
import type { SignIn } from "@/types/form-types";
import type { SignInFormState } from "@/types/server-action-return-type";
import { alert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
const { ERROR } = ALERT_TYPE;

const guestEmail = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_EMAIL as string;
const guestPassword = process.env.NEXT_PUBLIC_GUEST_ACCOUNT_PASSWORD as string;

export const signInInitialState: SignInFormState = {
  success: false,
  message: null,
  userId: null,
};
const SignInForm = () => {
  const router = useRouter();
  const params = useSearchParams();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [isGuestPending, startGuestTransition] = useTransition();
  const [state, requestSignIn] = useActionState(postSignIn, signInInitialState);
  // const [guestState, requestGuestSignIn] = useActionState(postSignIn, signInInitialState);
  const { control, handleSubmit } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: signInDefaultValues,
  });

  useEffect(() => {
    if (state.success && state.userId) moveToCurrentPage();
    else if (!state.success && state.message) {
      alert({
        type: ERROR,
        message: state.message as string,
      });
    }
  }, [state, queryClient, router, params]);

  const moveToCurrentPage = () => {
    const redirectPage = params.get("redirect") ?? "/";
    router.replace(redirectPage);
  };

  const handleSignInSubmit = async (userInfo: SignIn) => {
    const formData = new FormData();
    formData.append("email", userInfo.email);
    formData.append("password", userInfo.password);
    startTransition(() => requestSignIn(formData));
  };

  const handleGuestSignIn = async () => {
    const res = await postGuestSignIn();
    if (res.success && res.userId) moveToCurrentPage();
    else if (!res.success && res.message) {
      alert({
        type: ERROR,
        message: res.message as string,
      });
    }
  };

  return (
    <div className="mx-auto w-[98%] xs:w-[25rem]">
      <form onSubmit={handleSubmit(handleSignInSubmit)} className="mb-6">
        <FormInput name="email" autoFocus={true} control={control} placeholder="이메일 주소를 입력해 주세요." />
        <FormInput name="password" type="password" control={control} placeholder="비밀번호를 입력해 주세요." />
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoadingSpinner width="24px" height="24px" /> : "로그인"}
        </Button>
      </form>
      <Button color="secondary" type="button" onClick={() => startGuestTransition(() => handleGuestSignIn())}>
        {isGuestPending ? <LoadingSpinner width="24px" height="24px" /> : "게스트 계정 로그인"}
      </Button>
    </div>
  );
};

export default SignInForm;
