import type { Metadata } from "next";
import InspirationClient from "./InspirationClient";

export const metadata: Metadata = {
  title: "Инспирација",
  description: "Инспирација и идеи за дневни соби, кујни, фасади, ресторани и други простори уредени со декоративни гипсени цигли Zmaga.",
  alternates: { canonical: "/inspiration" },
  openGraph: {
    type: "website",
    title: "Инспирација со декоративни цигли | Zmaga Cigli",
    description: "Погледнете како декоративните гипсени цигли Zmaga го трансформираат секој простор.",
    url: "/inspiration",
    images: [{ url: "/images/inspiration/final-rooms/living-arena-final.webp", width: 1536, height: 1024, alt: "Ентериер со Zmaga декоративни цигли" }],
  },
  twitter: { card: "summary_large_image", images: ["/images/inspiration/final-rooms/living-arena-final.webp"] },
};

export default function Inspiration() {
  return <InspirationClient />;
}
