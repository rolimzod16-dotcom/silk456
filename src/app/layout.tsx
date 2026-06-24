import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "cyrillic"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Шёлковый Караван — туры по Великому шёлковому пути",
  description:
    "Авторские туры по маршруту Великого шёлкового пути: Узбекистан, Кыргызстан, Иран, Синьцзян. Караванные маршруты Самарканда, Бухары, Хивы, Кашгара и Персии с опытными гидами.",
  keywords: [
    "шёлковый путь",
    "туры в Узбекистан",
    "Самарканд",
    "Бухара",
    "Хива",
    "туры по Средней Азии",
    "караван",
    "Isfahan",
    "Kashgar",
  ],
  authors: [{ name: "Шёлковый Караван" }],
  openGraph: {
    title: "Шёлковый Караван — туры по Великому шёлковому пути",
    description:
      "Авторские туры по маршруту Великого шёлкового пути. Самарканд, Бухара, Хива, Кашгар, Исфахан.",
    siteName: "Шёлковый Караван",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
