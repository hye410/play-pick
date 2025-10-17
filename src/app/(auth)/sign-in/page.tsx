import { SIGN_UP } from "@/constants/path-constants";
import SignInForm from "@/features/sign-in/sign-in-form";
import Link from "next/link";
import { Suspense } from "react";

const Signin = () => {
  return (
    <section className="flex h-full min-h-fit flex-col justify-center overflow-y-scroll text-center scrollbar-hide">
      <h1 className="hidden">로그인 페이지</h1>
      <Link href="/" className="mb-14 block text-5xl font-black">
        <span className="text-primary">P</span>LAY <span className="text-primary">P</span>ICK
      </Link>
      <Suspense fallback={<div className="h-[240px]" />}>
        <SignInForm />
      </Suspense>
      <Link href={SIGN_UP} className="mt-8 block underline">
        회원가입
      </Link>
    </section>
  );
};
export default Signin;
