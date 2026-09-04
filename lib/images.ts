import { readdirSync } from "fs";
import { join } from "path";

/**
 * Reads only uppercase product-model .webp files from public/images,
 * excluding hero, about, contact, logo and other site assets.
 * returns public-relative paths for next/image.
 * Server-only: import only from Server Components (e.g. app/page.tsx).
 */
export function getGalleryImages(): string[] {
  const imagesDir = join(process.cwd(), "public", "images");
  const files = readdirSync(imagesDir);
  return files
    .filter((file) => /^[A-Z]+\.webp$/.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((name) => `/images/${name}`);
}
