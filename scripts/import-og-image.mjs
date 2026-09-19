/**
 * Import a source image as public/og-image.png + og-image.webp (1200×630).
 * Usage: node scripts/import-og-image.mjs <path-to-image>
 */
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/import-og-image.mjs <path-to-image>");
  process.exit(1);
}

await fs.access(src);
const publicDir = path.resolve("public");

await sharp(src)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .png({ compressionLevel: 9 })
  .toFile(path.join(publicDir, "og-image.png"));

await sharp(src)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .webp({ quality: 92 })
  .toFile(path.join(publicDir, "og-image.webp"));

const meta = await sharp(path.join(publicDir, "og-image.png")).metadata();
console.log(`[og-image] Imported ${src} → ${meta.width}x${meta.height}`);
