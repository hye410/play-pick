import Image from "next/image";
import Nav from "@/features/layout/nav";
import Link from "next/link";
import { SUPABASE_IMAGE_URL } from "@/constants/path-constants";
import { createServerSupabase } from "@/utils/supabase-server";

const Header = async () => {
  const supabase = await createServerSupabase();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoggedIn = !!session;

  return (
    <header className="mb-4 flex h-20 items-center justify-between sm:mb-8">
      <h1>
        <Link href="/">
          <Image src={`${SUPABASE_IMAGE_URL}/logos/play-pick-logo.png`} alt="logo" width={60} height={60} />
        </Link>
      </h1>
      <Nav initialIsLoggedIn={isLoggedIn} />
    </header>
  );
};

export default Header;
