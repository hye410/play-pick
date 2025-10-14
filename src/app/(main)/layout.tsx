import Header from "@/features/layout/header";
const MAIN_PADDING = "2.5rem"; // (padding-top : 1.25rem)  + (padding-bottom: 1.25rem)
const HEADER_SIZE = "8.75rem"; // (MAIN_PADDING : 2.5rem) + (HEADER_HEIGHT : 6.25rem)
const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`flex h-[calc(100dvh-${MAIN_PADDING})] flex-col`}>
      <Header />
      <main className={`mx-auto h-[calc(100dvh-${HEADER_SIZE})] w-full max-w-screen-2xl`}>{children}</main>
    </div>
  );
};

export default MainLayout;
