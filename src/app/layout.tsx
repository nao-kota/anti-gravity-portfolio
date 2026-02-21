import type { Metadata } from "next";
import { Noto_Serif_JP, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const sans = Noto_Sans_JP({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const serif = Noto_Serif_JP({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "武田 直也 | 美しき異端 - Portfolo Odyssey",
  description: "身体障害、150万円の代償、そして覚悟。武田直也の人生を刻んだ自叙伝的ポートフォリオ。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${sans.variable} ${serif.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
