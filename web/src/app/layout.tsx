import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${site.brand} | ${site.ownerName} — AI 교육 전문 브랜드`,
  description: site.description,
  keywords: [
    "AI 강의",
    "AI 교육",
    "프롬프트 엔지니어링",
    "ChatGPT 강의",
    "기업 AI 교육",
    "AIRO",
    site.ownerName,
  ],
  openGraph: {
    title: `${site.brand} | ${site.ownerName}`,
    description: site.description,
    type: "website",
    locale: "ko_KR",
  },
};

export const viewport: Viewport = {
  themeColor: "#043d84",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
