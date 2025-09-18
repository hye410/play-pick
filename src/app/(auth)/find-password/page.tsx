"use client";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { FORM_CONSTANTS } from "@/constants/form-constants";
import { postFindPassword } from "@/features/sign-in/api/server-actions";
import { signInDefaultValues, signInSchema } from "@/features/sign-up/utils/form-schema";
import type { SignIn } from "@/types/form-types";
import type { InitReturnType } from "@/types/server-action-return-type";
import { alert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const { email } = FORM_CONSTANTS;

const emailSchema = z.object({
  [email]: signInSchema.shape[email],
});

const { ERROR, INFO } = ALERT_TYPE;
type FindPasswordForm = Pick<SignIn, typeof email>;

const initialState: InitReturnType = {
  success: false,
  message: null,
};
const FindPassword = () => {
  const [isPending, startTransition] = useTransition();
  const [state, requestFindPassword] = useActionState(postFindPassword, initialState);
  const { control, handleSubmit, reset } = useForm<FindPasswordForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { [email]: signInDefaultValues[email] },
  });

  useEffect(() => {
    if (state.success) {
      alert({
        type: INFO,
        message: state.message as string,
      });
      reset();
    } else if (!state.success && state.message) {
      alert({
        type: ERROR,
        message: state.message as string,
      });
    }
  }, [state]);

  const handleFindPassword = (userInfo: FindPasswordForm) => {
    const { email } = userInfo;
    const formData = new FormData();
    formData.append("email", email);
    startTransition(() => requestFindPassword(formData));
  };

  return (
    <section className="flex h-full flex-col justify-center">
      <h1 className="hidden">비밀번호 찾기 페이지</h1>
      <span className="mb-4 text-center text-lg font-black">비밀번호를 찾고자하는 이메일을 입력해 주세요.</span>
      <form onSubmit={handleSubmit(handleFindPassword)} className="mx-auto w-1/3">
        <FormInput type="text" name={email} control={control} placeholder="이메일을 입력해 주세요." />
        <Button type="submit" disabled={isPending}>
          {isPending ? <LoadingSpinner width="24px" height="24px" pointColor="secondary" /> : "비밀번호 찾기"}
        </Button>
      </form>
    </section>
  );
};

export default FindPassword;
