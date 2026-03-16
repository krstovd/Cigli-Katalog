import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://zmagacigli.com/about",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
