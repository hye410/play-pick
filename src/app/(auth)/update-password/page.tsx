"use client";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { FORM_CONSTANTS, PASSWORD_CONDITION } from "@/constants/form-constants";
import { updatePassword } from "@/features/my-page/api/server-actions";
import { signUpDefaultValues, signUpSchema } from "@/features/sign-up/utils/form-schema";
import type { SignUp } from "@/types/form-types";
import { alert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SweetAlertResult } from "sweetalert2";
import { z } from "zod";

const { password, confirmPassword } = FORM_CONSTANTS;
const { ERROR, SUCCESS } = ALERT_TYPE;
export type UpdatePasswordForm = Pick<SignUp, typeof password | typeof confirmPassword>;

const passwordSchema = z
  .object({
    [password]: signUpSchema.shape[password],
    [confirmPassword]: signUpSchema.shape[confirmPassword],
  })
  .refine((data) => data[password] === data[confirmPassword], {
    path: [confirmPassword],
    error: "비밀번호가 일치하지 않습니다.",
  });

const UpdatePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const { control, handleSubmit } = useForm<UpdatePasswordForm>({
    resolver: zodResolver(passwordSchema),
    mode: "onBlur",
    defaultValues: {
      [password]: signUpDefaultValues[password],
      [confirmPassword]: signUpDefaultValues[confirmPassword],
    },
  });

  const changePassword = async (values: UpdatePasswordForm): Promise<SweetAlertResult | void> => {
    try {
      setIsLoading(true);
      const res = await updatePassword(values);
      return alert({
        type: SUCCESS,
        message: res,
      }).then(() => route.replace("/"));
    } catch (error) {
      return alert({
        type: ERROR,
        message: error as string,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex h-full items-center justify-center">
      <h1 className="hidden">비밀번호 바꾸기</h1>
      <form onSubmit={handleSubmit(changePassword)} className="w-1/3">
        <FormInput
          name={password}
          type="password"
          control={control}
          autoFocus={true}
          placeholder="새로운 비밀번호를 입력해 주세요."
        />
        <FormInput name={confirmPassword} type="password" control={control} placeholder="비밀번호를 확인해 주세요." />
        <p className="mb-8 whitespace-pre-line text-sm">{PASSWORD_CONDITION}</p>
        <Button type="submit">
          {isLoading ? <LoadingSpinner width="24px" height="24px" pointColor="secondary" /> : "비밀번호 바꾸기"}
        </Button>
      </form>
    </section>
  );
};

export default UpdatePassword;
