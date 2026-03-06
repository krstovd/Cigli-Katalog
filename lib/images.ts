import { readdirSync } from "fs";
import { join } from "path";

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
        f.toLowerCase() !== "zmaga logo.webp"
    )
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map((name) => `/images/${name}`);
}
