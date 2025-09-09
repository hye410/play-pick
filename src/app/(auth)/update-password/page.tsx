"use client";
import Button from "@/components/Button";
import FormInput from "@/components/form-input";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { FORM_CONSTANTS } from "@/constants/form-constants";
import { UPDATE_PASSWORD_MESSAGE } from "@/constants/message-constants";
import { signUpDefaultValues, signUpSchema } from "@/features/sign-up/utils/form-schema";
import { SignUp } from "@/types/form-types";
import { alert } from "@/utils/alert";
import { createClientSuperbase } from "@/utils/supabase-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthApiError } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { SweetAlertResult } from "sweetalert2";
import { z } from "zod";
const { UPDATE_FAIL, UPDATE_SUCCESS, SAME_PASSWORD_ERROR } = UPDATE_PASSWORD_MESSAGE;
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

const SAME_PASSWORD = "same_password";
const supabase = createClientSuperbase();
const UpdatePassword = () => {
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
      const { error } = await supabase.auth.updateUser({
        password: values.password,
      });
      if (error) throw error;
      return alert({
        type: SUCCESS,
        message: UPDATE_SUCCESS,
      }).then(() => route.replace("/"));
    } catch (error) {
      console.error(error);
      let errorMessage: string = UPDATE_FAIL;
      if (error instanceof AuthApiError) {
        if (error.code === SAME_PASSWORD) errorMessage = SAME_PASSWORD_ERROR;
      }
      return alert({
        type: ERROR,
        message: errorMessage,
      });
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
        <Button type="submit">비밀번호 바꾸기</Button>
      </form>
    </section>
  );
};

export default UpdatePassword;
