import { SUPABASE_IMAGE_URL } from "@/constants/path-constants";
import SignInForm from "@/features/sign-in/sign-in-form";
import Image from "next/image";

const Signin = () => {
  return (
    <section>
      <h1 className="hidden">로그인 페이지</h1>
      <Image
        src={`${SUPABASE_IMAGE_URL}/logos/play-pick-logo-dark-version.png`}
        width={300}
        height={300}
        alt="play-pick"
      />
      <SignInForm />
    </section>
  );
};
export default Signin;
