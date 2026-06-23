import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svgPath = join(root, "public", "og-image.svg");
const pngPath = join(root, "public", "og-image.png");

const svg = readFileSync(svgPath);

// Render SVG at native 1200x630 — no downscale blur
await sharp(svg, { density: 72 })
  .png({ compressionLevel: 6, effort: 10 })
  .toFile(pngPath);

const meta = await sharp(pngPath).metadata();
console.log(`Generated public/og-image.png (${meta.width}x${meta.height})`);
