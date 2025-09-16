"use client";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { FORM_CONSTANTS } from "@/constants/form-constants";
import { postFindPassword } from "@/features/sign-in/api/services";
import { signInDefaultValues, signInSchema } from "@/features/sign-up/utils/form-schema";
import type { SignIn } from "@/types/form-types";
import { alert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SweetAlertResult } from "sweetalert2";
import { z } from "zod";
const { email } = FORM_CONSTANTS;

const emailSchema = z.object({
  [email]: signInSchema.shape[email],
});

const { ERROR, INFO } = ALERT_TYPE;
type FindPasswordForm = Pick<SignIn, typeof email>;

const FindPassword = () => {
  const { control, handleSubmit } = useForm<FindPasswordForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { [email]: signInDefaultValues[email] },
  });

  const requestToFindPassword = async ({ email }: FindPasswordForm): Promise<SweetAlertResult> => {
    try {
      const message = await postFindPassword({ email });
      return alert({
        type: INFO,
        message: message,
      });
    } catch (error) {
      return alert({
        type: ERROR,
        message: error as string,
      });
    }
  };

  return (
    <section className="flex h-full flex-col justify-center">
      <h1 className="hidden">비밀번호 찾기 페이지</h1>
      <span className="mb-4 text-center text-lg font-black">비밀번호를 찾고자하는 이메일을 입력해 주세요.</span>
      <form onSubmit={handleSubmit(requestToFindPassword)} className="mx-auto w-1/3">
        <FormInput type="text" name={email} control={control} placeholder="이메일을 입력해 주세요." />
        <Button type="submit">비밀번호 찾기</Button>
      </form>
    </section>
  );
};

export default FindPassword;
