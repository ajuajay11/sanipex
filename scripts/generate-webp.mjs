 
import { existsSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const dirs = [
  join(root, "src/assets/images/brands"),
  join(root, "src/assets/images/countries"),
];

async function convertDir(dir) {
  if (!existsSync(dir)) return;
  const names = await readdir(dir);
  for (const f of names) {
    if (!f.toLowerCase().endsWith(".png")) continue;
    const input = join(dir, f);
    const output = input.replace(/\.png$/i, ".webp");
    try {
      await sharp(input)
        .webp({ quality: 82, effort: 4 })
        .toFile(output);
      console.log("webp:", output.replace(root + "/", ""));
    } catch (e) {
      console.warn("skip (not a raster PNG):", input.replace(root + "/", ""), e.message);
    }
  }
}

for (const d of dirs) {
  await convertDir(d);
}
