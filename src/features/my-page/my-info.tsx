"use client";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { SignUp } from "@/types/form-types";
import Button from "@/components/button";
import FormInput from "@/components/form-input";
import { LoadingSpinner } from "@/components/loading-spinner";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { PASSWORD_CONDITION } from "@/constants/form-constants";
import DeleteUserField from "@/features/my-page/delete-user-field";
import { changePasswordSchema } from "@/features/sign-up/utils/form-schema";
import { updatePassword } from "@/features/my-page/api/server-actions";
import { alert } from "@/utils/alert";

type MyInfoProps = {
  userEmail: string;
};

const { ERROR, SUCCESS } = ALERT_TYPE;

const MyInfo = ({ userEmail }: MyInfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { control, handleSubmit, reset } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const handleChangePassword = async (values: Pick<SignUp, "password" | "confirmPassword">) => {
    try {
      setIsLoading(true);
      const successMessage = await updatePassword(values);
      alert({
        type: SUCCESS,
        message: successMessage as string,
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
    <section className="mx-auto flex h-full w-2/3 max-w-[600px] flex-col items-center justify-center">
      <h3 className="hidden">내 정보 페이지</h3>
      <input defaultValue={userEmail} readOnly className="mb-10 w-full rounded-lg bg-secondary px-3 py-4 text-white" />
      <form onSubmit={handleSubmit(handleChangePassword)} className="mb-5 w-full">
        <FormInput
          name="password"
          control={control}
          autoFocus={true}
          placeholder="비밀번호를 입력해 주세요."
          type="password"
        />
        <FormInput name="confirmPassword" control={control} type="password" placeholder="비밀번호를 확인해 주세요." />
        <p className="mb-8 whitespace-pre-line text-sm">{PASSWORD_CONDITION}</p>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? <LoadingSpinner width="24px" height="24px" pointColor="secondary" /> : "비밀번호 변경"}
        </Button>
      </form>
      <DeleteUserField />
    </section>
  );
};

export default MyInfo;
