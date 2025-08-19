import { SUPABASE_IMAGE_URL } from "@/constants/path-constants";
import SignUpForm from "@/features/sign-up/sign-up-form";
import Image from "next/image";
import Link from "next/link";

const SignUp = () => {
  return (
    <section className="flex h-full items-center justify-center gap-8 bg-red-400">
      <h1 className="hidden">회원가입 페이지</h1>
      <div className="relative aspect-square w-1/3 bg-blue-200">
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
