import { MAIN_PADDING } from "@/app/(main)/layout";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={`mx-auto h-[calc(100dvh-${MAIN_PADDING})] max-w-screen-2xl`}>{children}</main>;
};

export default AuthLayout;
