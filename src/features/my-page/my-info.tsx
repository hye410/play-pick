"use client";

import Button from "@/components/Button";
import FormInput from "@/components/form-input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { changePasswordSchema } from "../sign-up/utils/form-schema";

type MyInfoProps = {
  userEmail: string;
};
const MyInfo = ({ userEmail }: MyInfoProps) => {
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onBlur",
  });

  const handleChangePassword = (values) => {
    console.log("values===>", values);
  };
  return (
    <section className="mx-auto flex h-full w-2/3 max-w-[600px] flex-col items-center justify-center">
      <h3 className="hidden">내 정보 페이지</h3>
      <input defaultValue={userEmail} readOnly className="mb-10 w-full rounded-lg bg-secondary px-3 py-4 text-white" />
      {/* <FormInput name="email" control={control} isReadOnly={true} className="bg-secondary text-white" /> */}
      <form onSubmit={handleSubmit(handleChangePassword)} className="mb-5 w-full">
        <FormInput
          name="password"
          control={control}
          autoFocus={true}
          placeholder="8자 이상이며 대문자·소문자·숫자·특수문자를 포함"
          type="password"
        />
        <FormInput name="confirmPassword" control={control} type="password" placeholder="비밀번호를 확인해 주세요." />
        <Button type="submit">비밀번호 변경</Button>
      </form>

      <button type="button" className="text-sm">
        회원탈퇴
      </button>
    </section>
  );
};

export default MyInfo;
