import Image from "next/image";
import Nav from "@/features/layout/Nav";
import Link from "next/link";

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_SUPABASE_IMAGE_URL;

const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between bg-red-500">
      <h1>
        <Link href="/">
          <Image src={`${BASE_IMAGE_URL}/playpick-logo.png`} alt="logo" width={60} height={60} />
        </Link>
      </h1>
      <Nav />
    </header>
  );
};

export default Header;
