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
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
