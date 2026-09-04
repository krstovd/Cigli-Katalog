import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас",
  description:
    "Дознајте повеќе за Zmaga Декоративни Цигли, нашето искуство, квалитетните материјали и колекцијата од 47+ модели.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "За нас | Zmaga Cigli",
    description:
      "Дознајте повеќе за Zmaga Декоративни Цигли и нашата колекција на декоративни гипсени цигли.",
    url: "/about",
    images: [{ url: "/images/about-hero-arena.webp", width: 1536, height: 1024, alt: "За Zmaga декоративни цигли" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/about-hero-arena.webp"] },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
