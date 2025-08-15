import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import clsx from 'clsx'

const myFont = localFont({
  src: "../../public/font/SUIT-Variable.woff2",
  weight: "300",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Play Pick",
  description:
    "오늘은 뭘 볼지 고민되나요? Play Pick이 당신의 취향에 딱 맞는 콘텐츠를 추천해드립니다 😉",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={clsx(myFont.className,'p-5 h-[100dvh]]')}>{children}</body>
    </html>
  );
}
