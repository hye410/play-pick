import { Providers } from "@/provider/query-client-provider";
import clsx from "clsx";
import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import Script from "next/script";
import { KAKAO_INTEGRITY_VALUE, KAKAO_VERSION } from "@/constants/kakao-constants";

const myFont = localFont({
  src: "../../public/font/SUIT-Variable.woff2",
  weight: "300",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Play Pick",
  description: "오늘은 뭘 볼지 고민되나요? Play Pick이 당신의 취향에 딱 맞는 콘텐츠를 추천해드립니다 😉",
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
      <body className={clsx(myFont.className, "h-[100dvh] min-w-72 px-5 py-[var(--main-padding-y)]")}>
        <Providers>{children}</Providers>
        <Script
          src={`https://t1.kakaocdn.net/kakao_js_sdk/${KAKAO_VERSION}/kakao.min.js`}
          integrity={KAKAO_INTEGRITY_VALUE}
          crossOrigin="anonymous"
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
