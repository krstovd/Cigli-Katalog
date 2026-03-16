import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import ScrollToTop from "./components/ScrollToTop";
import Navbar from "./components/Navbar";
import { LangProvider } from "./context/LangContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Декоративни гипсени цигли | Zmaga Cigli",
  description: "Architecture and design, curated.",
  openGraph: {
    images: [
      {
        url: "https://zmagacigli.com/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["https://zmagacigli.com/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen overflow-x-hidden antialiased`}
      >
        <LangProvider>
          <SmoothScroll>
            <Navbar />
            {children}
          </SmoothScroll>
          <ScrollToTop />
        </LangProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
