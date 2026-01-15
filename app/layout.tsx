import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google"; // Import Montserrat
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";

const inter = Inter({ subsets: ["latin"] });
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap"
});

export const metadata: Metadata = {
  title: "태양광 안전 저널 (Solar Safety Journal) | 신재생 에너지 정책 및 안전 가이드",
  description: "국내외 태양광 발전 시설의 안전 지침, 최신 정책 변화, BIPV 기술 인사이트를 전달하는 전문 미디어입니다.",
  openGraph: {
    title: "태양광 안전 저널 (Solar Safety Journal)",
    description: "태양광 발전 시설의 안전 지침, 정책 변화, 인사이트를 전달하는 전문 미디어",
    url: "https://solar-safety-journal.vercel.app",
    siteName: "Solar Safety Journal",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Solar Safety Journal Logo",
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning={true}>
      <body className={`${inter.className} ${montserrat.variable} antialiased`}>
        <AuthProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
