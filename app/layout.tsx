import type { Metadata } from "next";
import "@/libs/assets/style/scss/style.scss";

export const metadata: Metadata = {
  title: "JOHYUKRAE",
  description: "POTOFLIO",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
