import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Контактирајте со Zmaga Декоративни Цигли за производи, нарачки, технички прашања и соработка.",
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Контакт | Zmaga Cigli",
    description:
      "Контактирајте со нас за производи, нарачки, технички прашања и соработка.",
    url: "/contact",
    images: [{ url: "/images/contact-hero-rustik-running-bond.webp", width: 1536, height: 1024, alt: "Контакт со Zmaga декоративни цигли" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/contact-hero-rustik-running-bond.webp"] },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
