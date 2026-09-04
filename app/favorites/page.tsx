import type { Metadata } from "next";
import { getGalleryImages } from "@/lib/images";
import FavoritesClient from "./FavoritesClient";

export const metadata: Metadata = {
  title: "Омилени модели",
  description: "Вашите омилени Zmaga декоративни цигли.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/favorites" },
};

export default function FavoritesPage() {
  return <FavoritesClient images={getGalleryImages()} />;
}
