import Header from "@/features/layout/header";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[calc(100dvh-2.5rem)] flex-col">
      <Header />
      <main className="mx-auto w-full max-w-[1440px] flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
