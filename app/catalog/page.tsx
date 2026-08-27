import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/images";
import CatalogClient from "./CatalogClient";

export const metadata: Metadata = {
  title: "Каталог",
  description: "Каталог на декоративни гипсени цигли Zmaga.",
  alternates: { canonical: "/catalog" },
  openGraph: { url: "/catalog" },
};

export default function Catalog() {
  return <CatalogClient images={getGalleryImages()} />;
}
