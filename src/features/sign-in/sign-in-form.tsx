"use client";
import Button from "@/components/Button";
import FormInput from "@/components/form-input";
import { ALERT_TYPE } from "@/constants/alert-constants";
import { postSignIn } from "@/features/sign-in/api/services";
import { signInDefaultValues, signInSchema } from "@/features/sign-up/utils/form-schema";
import { SignIn } from "@/types/form-types";
import { alert } from "@/utils/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { SweetAlertResult } from "sweetalert2";
import { getUserLikes } from "../detail/api/services";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { FilteredDetailData } from "@/types/contents-types";
import { User } from "@/types/user-types";
const { ERROR } = ALERT_TYPE;
const { LIKES } = QUERY_KEYS;
const SignInForm = () => {
  const route = useRouter();
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<SignIn>({
    resolver: zodResolver(signInSchema),
    mode: "onBlur",
    defaultValues: signInDefaultValues,
  });

  const handleSignIn: SubmitHandler<SignIn> = async (values): Promise<SweetAlertResult | void> => {
    try {
      const userId = await postSignIn({ email: values.email, password: values.password });
      if (userId) {
        const userLikes: FilteredDetailData["id"][] = await getUserLikes(userId);
        queryClient.setQueryData([LIKES, userId], userLikes);
      }
      route.back();
    } catch (error) {
      alert({
        type: ERROR,
        message: error as string,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSignIn)} className="w-[400px]">
      <FormInput name="email" autoFocus={true} control={control} placeholder="이메일 주소를 입력해 주세요." />
      <FormInput name="password" type="password" control={control} placeholder="비밀번호를 입력해 주세요." />
      <Button type="submit">로그인</Button>
    </form>
  );
};

export default SignInForm;
