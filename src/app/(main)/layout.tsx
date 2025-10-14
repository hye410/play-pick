import Header from "@/features/layout/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex h-[var(--body-height)] flex-col`}>
      <Header />
      <main className={`mx-auto h-[var(--main-height)] w-full max-w-screen-2xl`}>{children}</main>
    </div>
  );
};

export default MainLayout;
