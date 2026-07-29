import { readdirSync } from "fs";
import { join } from "path";

const NON_CATALOG_IMAGES = new Set([
  "hero-section.webp",
  "story-interior.webp",
  "zmaga logo.webp",
]);

/**
 * Reads .webp files from public/images, sorts alphabetically,
 * returns public-relative paths for next/image.
 * Server-only: import only from Server Components (e.g. app/page.tsx).
 */
export function getGalleryImages(): string[] {
  const imagesDir = join(process.cwd(), "public", "images");
  const files = readdirSync(imagesDir);
  return files
    .filter(
      (f) =>
        f.toLowerCase().endsWith(".webp") &&
        !NON_CATALOG_IMAGES.has(f.toLowerCase())
    )
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((name) => `/images/${name}`);
}
