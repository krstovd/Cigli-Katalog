import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceDir = path.join(root, "public", "images");
const outputDir = path.join(sourceDir, "en");
const excluded = new Set([
  "hero-section.webp",
  "story-interior.webp",
  "zmaga logo.webp",
]);

const escapeXml = (value) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function localizationOverlay(width, height) {
  if (width !== 2924 || height !== 1949) {
    throw new Error(`Unexpected catalog dimensions: ${width}x${height}`);
  }

  const description = "Decorative gypsum brick";
  const descriptionSecondLine = "for interior use";
  const packageText = "60 pcs. / 1m²   |   9.50–10 kg per package";

  return Buffer.from(`
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"
         xmlns="http://www.w3.org/2000/svg">
      <style>
        .regular {
          font-family: Arial, Helvetica, sans-serif;
          fill: #404040;
          font-weight: 400;
        }
        .bold {
          font-family: Arial, Helvetica, sans-serif;
          fill: #353535;
          font-weight: 700;
        }
      </style>

      <!-- Small descriptor above the ZMAGA wordmark. -->
      <rect x="184" y="91" width="225" height="32" fill="#fff"/>
      <text x="296" y="114" text-anchor="middle"
            font-family="Arial, Helvetica, sans-serif" font-size="16"
            font-weight="700" letter-spacing=".25" fill="#333">DECORATIVE BRICKS</text>

      <!-- Product description on the white information panel. -->
      <rect x="1665" y="405" width="1160" height="145" fill="#fff"/>
      <text class="regular" x="1718" y="458" font-size="47">
        ${escapeXml(description)}
      </text>
      <text class="regular" x="1718" y="514" font-size="47">
        ${escapeXml(descriptionSecondLine)}
      </text>

      <!-- Dimensions label; the numeric dimensions stay language-neutral. -->
      <rect x="1665" y="1280" width="620" height="82" fill="#fff"/>
      <text class="bold" x="1718" y="1334" font-size="45">Dimensions:</text>

      <!-- Package quantity and weight. -->
      <rect x="1665" y="1765" width="1195" height="155" fill="#fff"/>
      <text class="bold" x="1718" y="1870" font-size="43">
        ${escapeXml(packageText)}
      </text>
    </svg>
  `);
}

await mkdir(outputDir, { recursive: true });

const files = (await readdir(sourceDir))
  .filter((name) => name.toLowerCase().endsWith(".webp"))
  .filter((name) => !excluded.has(name.toLowerCase()))
  .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));

for (const file of files) {
  const input = path.join(sourceDir, file);
  const output = path.join(outputDir, file);
  const image = sharp(input);
  const metadata = await image.metadata();

  await image
    .composite([
      {
        input: localizationOverlay(metadata.width, metadata.height),
        left: 0,
        top: 0,
      },
    ])
    .webp({ quality: 90, smartSubsample: true })
    .toFile(output);
}

console.log(`Created ${files.length} English catalog images in ${outputDir}`);
