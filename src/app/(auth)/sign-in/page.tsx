import { SUPABASE_IMAGE_URL } from "@/constants/path-constants";
import FindUserInfoField from "@/features/sign-in/find-user-info-field";
import SignInForm from "@/features/sign-in/sign-in-form";
import Image from "next/image";
import Link from "next/link";

const Signin = () => {
  return (
    <section className="flex h-full flex-col items-center justify-center">
      <h1 className="hidden">로그인 페이지</h1>
      <Link href="/" className="mb-7">
        <Image
          src={`${SUPABASE_IMAGE_URL}/logos/play-pick-logo-dark-version.png`}
          width={400}
          height={400}
          alt="play-pick"
          priority
        />
      </Link>
      <SignInForm />
      <FindUserInfoField />
    </section>
  );
};
export default Signin;
