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
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
