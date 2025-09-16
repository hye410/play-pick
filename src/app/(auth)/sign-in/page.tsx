import FindUserInfoField from "@/features/sign-in/find-user-info-field";
import SignInForm from "@/features/sign-in/sign-in-form";
import Link from "next/link";

const Signin = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <h1 className="hidden">로그인 페이지</h1>
      <Link href="/" className="mb-14 text-5xl font-black">
        <span className="text-primary">P</span>LAY <span className="text-primary">P</span>ICK
      </Link>
      <SignInForm />
      <FindUserInfoField />
    </section>
  );
};
export default Signin;
