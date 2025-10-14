const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return <main className={`mx-auto h-full max-w-screen-2xl`}>{children}</main>;
};

export default AuthLayout;
