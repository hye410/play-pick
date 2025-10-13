const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className="mx-auto h-[calc(100dvh-2.5rem)] max-w-screen-2xl">{children}</main>;
};

export default AuthLayout;
