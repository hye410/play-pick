"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import type { SignIn } from "@/types/form-types";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { FORM_CONSTANTS } from "@/constants/form-constants";
import { postFindPassword } from "@/features/sign-in/api/server-actions";
import { signInDefaultValues, signInSchema } from "@/features/sign-up/utils/form-schema";
import { alert } from "@/utils/alert";

const { email } = FORM_CONSTANTS;

const emailSchema = z.object({
  [email]: signInSchema.shape[email],
});

const { ERROR, INFO } = ALERT_TYPE;
type FindPasswordForm = Pick<SignIn, typeof email>;

const FindPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm<FindPasswordForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { [email]: signInDefaultValues[email] },
  });

  const requestToFindPassword = async ({ email }: FindPasswordForm) => {
    try {
      setIsLoading(true);
      const message = await postFindPassword({ email });
      alert({
        type: INFO,
        message: message,
      });
      reset();
    } catch (error) {
      alert({
        type: ERROR,
        message: error as string,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-full flex-col justify-center">
      <h1 className="hidden">비밀번호 찾기 페이지</h1>
      <span className="mb-4 text-center text-lg font-black">비밀번호를 찾고자하는 이메일을 입력해 주세요.</span>
      <form onSubmit={handleSubmit(requestToFindPassword)} className="mx-auto w-1/3">
        <FormInput type="text" name={email} control={control} placeholder="이메일을 입력해 주세요." />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner width="24px" height="24px" pointColor="secondary" /> : "비밀번호 찾기"}
        </Button>
      </form>
    </section>
  );
};

export default FindPassword;
