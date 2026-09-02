import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");

const targets = [
  { file: "hero-bg.jpg", quality: 80, width: 1600 },
  { file: "team1.png", quality: 82 },
  { file: "team2.png", quality: 82 },
  { file: "team3.png", quality: 82 },
];

async function optimize({ file, quality, width }) {
  const input = path.join(publicDir, file);
  const webpOut = path.join(publicDir, file.replace(/\.(jpg|jpeg|png)$/i, ".webp"));

  try {
    await fs.access(input);
  } catch {
    console.warn(`[images] Skipping missing file: ${file}`);
    return;
  }

  let pipeline = sharp(input);
  if (width) {
    pipeline = pipeline.resize({ width, withoutEnlargement: true });
  }

  await pipeline.webp({ quality, effort: 4 }).toFile(webpOut);

  const [srcStat, webpStat] = await Promise.all([
    fs.stat(input),
    fs.stat(webpOut),
  ]);

  const saved = srcStat.size - webpStat.size;
  console.log(
    `[images] ${file} → ${path.basename(webpOut)} (${Math.round(webpStat.size / 1024)} KiB, saved ${Math.round(saved / 1024)} KiB)`,
  );
}

for (const target of targets) {
  await optimize(target);
}

console.log("[images] Done");
