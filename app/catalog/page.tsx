import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/images";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог на декоративни гипсени цигли",
  description: "Разгледајте 47+ модели декоративни гипсени цигли Zmaga за ентериер и ѕидни облоги, достапни со испорака низ Македонија.",
  alternates: { canonical: "/catalog" },
  openGraph: {
    type: "website",
    title: "Каталог на декоративни гипсени цигли | Zmaga Cigli",
    description: "Откријте 47+ модели декоративни гипсени цигли со различни текстури, бои и стилови.",
    url: "/catalog",
    images: [{ url: "/images/catalog-hero-virtus-v3.webp", width: 1536, height: 1024, alt: "Каталог на Zmaga декоративни гипсени цигли" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Каталог на декоративни гипсени цигли | Zmaga Cigli",
    description: "Откријте 47+ модели декоративни гипсени цигли со различни текстури, бои и стилови.",
    images: ["/images/catalog-hero-virtus-v3.webp"],
  },
};

export default function Catalog() {
  const images = getGalleryImages();
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Каталог на декоративни гипсени цигли Zmaga",
    numberOfItems: images.length,
    itemListElement: images.map((image, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: image.split("/").pop()!.replace(/\.webp$/i, ""),
      image: `https://zmagacigli.com${image}`,
      url: "https://zmagacigli.com/catalog",
    })),
  };

  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd).replace(/</g, "\\u003c") }} />
    <CatalogClient images={images} />
  </>;
}
