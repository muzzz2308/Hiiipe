/**
 * Renders public/og-image.svg → og-image.png + og-image.webp (1200×630).
 * Run: node scripts/generate-og-image.mjs
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const svgPath = path.join(publicDir, "og-image.svg");

const svg = await fs.readFile(svgPath);

await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .png({ compressionLevel: 9, adaptiveFiltering: true })
  .toFile(path.join(publicDir, "og-image.png"));

await sharp(svg, { density: 144 })
  .resize(1200, 630, { fit: "fill" })
  .webp({ quality: 92, effort: 4 })
  .toFile(path.join(publicDir, "og-image.webp"));

console.log("[og-image] Wrote public/og-image.png and public/og-image.webp");
