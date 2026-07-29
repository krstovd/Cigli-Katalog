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

const siteDescription =
  "Декоративни гипсени цигли за модерен и класичен ентериер. Разгледајте 47+ модели од Zmaga Декоративни Цигли.";

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: "Zmaga Декоративни Цигли",
  url: "https://zmagacigli.com",
  logo: "https://zmagacigli.com/images/zmaga%20logo.webp",
  image: "https://zmagacigli.com/og-image.jpg",
  description: siteDescription,
  email: "mailto:zmaga.dooel@yahoo.com",
  telephone: "+38970842079",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Крум Вранински 29",
    postalCode: "2300",
    addressLocality: "Кочани",
    addressCountry: "MK",
  },
  sameAs: [
    "https://www.facebook.com/profile.php?id=100080947414300",
    "https://www.instagram.com/zmagadekocigli",
  ],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "17:00",
    },
  ],
} as const;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://zmagacigli.com"),
  title: {
    default: "Декоративни гипсени цигли | Zmaga Cigli",
    template: "%s | Zmaga Cigli",
  },
  description: siteDescription,
  applicationName: "Zmaga Cigli",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    siteName: "Zmaga Cigli",
    title: "Декоративни гипсени цигли | Zmaga Cigli",
    description: siteDescription,
    url: "/",
    locale: "mk_MK",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zmaga декоративни гипсени цигли",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Декоративни гипсени цигли | Zmaga Cigli",
    description: siteDescription,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mk">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen overflow-x-hidden antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
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
