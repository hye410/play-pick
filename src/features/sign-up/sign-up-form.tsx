"use client";
import Button from "@/components/Button";
import FormInput from "@/components/form-input";
import type { SignUp } from "@/types/form-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { signUpDefaultValues, signUpSchema } from "./utils/form-schema";

const SignUpForm = () => {
  const { handleSubmit, control } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
    mode: "onBlur",
    defaultValues: signUpDefaultValues,
  });

  const onSubmit: SubmitHandler<SignUp> = (data) => console.log("submit:", data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-1/3 bg-blue-300">
      <FormInput<SignUp> name={"email"} placeholder="이메일을 입력해 주세요." type="text" control={control} />
      <FormInput<SignUp> name={"password"} placeholder="비밀번호를 입력해 주세요." type="text" control={control} />
      <FormInput<SignUp>
        name={"confirmPassword"}
        placeholder="비밀번호를 확인해 주세요."
        type="text"
        control={control}
      />
      <Button type="submit">회원가입</Button>
    </form>
  );
};

export default SignUpForm;

// <FormInput name={"email"} type="text" placeholder="이메일을 입력해 주세요." control={control} />
// <FormInput name={"password"} type="password" placeholder="비밀번호를 입력해 주세요." control={control} />
// <FormInput
//   name={"confirmPassword"}
//   type="password"
//   placeholder="비밀번호를 다시 입력해 주세요."
//   control={control}
// />

// const handleSubmit = async (e: React.FormEvent): Promise<void> => {
//   e.preventDefault();
//   // await supabase.auth.signUp({
//   //   email,
//   //   password,
//   //   options: {
//   //     emailRedirectTo: `${BASE_URL}/${SIGN_IN}`,
//   //   },
//   // });

//   // console.log("user=>", user);
//   // console.log("session=>", session);
//   // console.log("error=>", error);
// };
