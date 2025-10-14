import Header from "@/features/layout/header";
export const MAIN_PADDING = "2.5rem"; // (padding-top : 1.25rem)  + (padding-bottom: 1.25rem)
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex h-[calc(100dvh-${MAIN_PADDING})] flex-col`}>
      <Header />
      <main className="mx-auto h-[calc(100dvh-8.75rem)] w-full max-w-screen-2xl bg-purple-300">{children}</main>
    </div>
  );
};

export default MainLayout;
