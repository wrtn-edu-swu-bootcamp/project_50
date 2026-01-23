import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

export const metadata: Metadata = {
  title: "CRM AI Tool - 메시지 자동 작성 & 성과 예측",
  description: "AI를 활용하여 앱 푸시 메시지를 빠르게 작성하고, 발송 전 성과를 예측하는 웹 애플리케이션입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable.min.css"
        />
      </head>
      <body className="font-pretendard antialiased">
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
