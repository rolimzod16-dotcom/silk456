import type { Metadata } from "next";
import { Inter, Geist_Mono, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Inter({
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
  metadataBase: new URL("https://www.greatsilktrails.com"),
  title: {
    default: "Silk Road Tours in Central Asia | Great Silk Trails",
    template: "%s — Great Silk Trails",
  },
  description:
    "Small-group and private Silk Road tours in Uzbekistan, Tajikistan, Kyrgyzstan, Kazakhstan, Turkmenistan, Iran, China and Mongolia with local guides.",
  applicationName: "Great Silk Trails",
  authors: [{ name: "Great Silk Trails" }],
  formatDetection: { telephone: false },
  openGraph: {
    siteName: "Great Silk Trails",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/hero-silkroad.png", alt: "Camel caravan on the Silk Road" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
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
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
