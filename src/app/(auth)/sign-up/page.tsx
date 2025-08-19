import { SUPABASE_IMAGE_URL } from "@/constants/path-constants";
import SignUpForm from "@/features/sign-up/sign-up-form";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <section className="mx-auto flex h-full w-[80%] items-center justify-center">
      <h1 className="hidden">회원가입 페이지</h1>
      <div className="relative aspect-square w-1/2">
        <Link href={"/"} className="absolute inset-0">
          <Image
            src={`${SUPABASE_IMAGE_URL}/logos/play-pick-logo-dark-version.png`}
            alt="play-pick-logo"
            fill
            priority
            sizes="33vw"
          />
        </Link>
      </div>
      <SignUpForm />
    </section>
  );
};

export default SignUp;
