const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={`h-[calc(100dvh-var(--main-padding-y))] w-full max-w-screen-2xl py-[var(--main-padding-y)]`}>
      {children}
    </main>
  );
};

export default AuthLayout;
