import Header from "@/features/layout/Header";

/**MainHeight : 메인 레이아웃 body의 height 값
 * 100dvh(뷰 height) - 2.5rem(body 아래 위 패딩 1.25rem*2) - 2rem (header margin bottom)
 */
const MainHeight = "100dvh-4.5rem-60px";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[calc(100dvh-2.5rem)] flex-col bg-green-300">
      <Header />
      <main className="mx-auto w-full flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
