import SignUpForm from "@/features/sign-up/sign-up-form";
import Link from "next/link";

const SignUp = () => {
  return (
    <section className="mx-auto flex h-full w-[70%] items-center justify-center gap-10">
      <h1 className="hidden">회원가입 페이지</h1>
      <div className="w-1/3 text-center">
        <Link href={"/"} className="text-5xl font-black">
          <span className="text-primary">P</span>LAY <span className="text-primary">P</span>ICK
        </Link>
      </div>
      <div className="w-2/3">
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
