const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="mx-auto h-[calc(100dvh-2.5rem)] max-w-[1440px]">{children}</main>;
};

export default AuthLayout;
