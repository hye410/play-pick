import Image from "next/image";
import Nav from "@/features/layout/nav";
import Link from "next/link";
import { SUPABASE_IMAGE_URL } from "@/constants/path-constants";

const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <h1>
        <Link href="/">
          <Image src={`${SUPABASE_IMAGE_URL}/logos/play-pick-logo.png`} alt="logo" width={60} height={60} />
        </Link>
      </h1>
      <Nav />
    </header>
  );
};

export default Header;
