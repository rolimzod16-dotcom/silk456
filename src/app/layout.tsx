import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Silk Caravan — Tours along the Great Silk Road",
  description:
    "Boutique tours along the ancient Silk Road: Uzbekistan, Kyrgyzstan, Iran, Xinjiang. Caravan routes through Samarkand, Bukhara, Khiva, Kashgar and Persia with expert local guides.",
  keywords: [
    "Silk Road",
    "Silk Road tours",
    "Uzbekistan tours",
    "Samarkand",
    "Bukhara",
    "Khiva",
    "Central Asia travel",
    "Kashgar",
    "Isfahan",
    "caravan",
  ],
  authors: [{ name: "Silk Caravan" }],
  openGraph: {
    title: "Silk Caravan — Tours along the Great Silk Road",
    description:
      "Boutique tours along the ancient Silk Road. Samarkand, Bukhara, Khiva, Kashgar, Isfahan.",
    siteName: "Silk Caravan",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${display.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
