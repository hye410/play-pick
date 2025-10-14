import SignUpForm from "@/features/sign-up/sign-up-form";
import Link from "next/link";

const SignUp = () => {
  return (
    <section className="scrollbar-hide mx-auto flex h-full min-h-fit w-[70%] flex-col items-center justify-center gap-10 overflow-y-scroll md:flex-row">
      <h1 className="hidden">회원가입 페이지</h1>
      <div className="w-full text-center md:w-1/4 lg:w-1/3">
        <Link href={"/"} className="text-4xl font-black md:text-5xl">
          <span className="text-primary">P</span>LAY <span className="text-primary">P</span>ICK
        </Link>
      </div>
      <div className="w-full md:w-3/4 lg:w-2/3">
        <SignUpForm />
      </div>
    </section>
  );
};

export default SignUp;
