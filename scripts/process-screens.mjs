// Turns the owner's demo-gym screenshots (docs/seo/screens/NN-*.png|jpg|webp) into optimised WebP and AVIF files
// in public/screens/ and writes public/screens/manifest.json with the real width and height of each.
// The screen ids and numbers come from src/config/screens.ts. Run: node scripts/process-screens.mjs
// Inputs are only read. Nothing is uploaded anywhere.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const inDir = join(root, "docs", "seo", "screens");
const outDir = join(root, "public", "screens");
mkdirSync(outDir, { recursive: true });

// Parse the id and device per screen number out of the TypeScript list without importing TS
const src = readFileSync(join(root, "src", "config", "screens.ts"), "utf8");
const defs = [...src.matchAll(/\{ n: (\d+), id: "([^"]+)", device: "(phone|desktop)"/g)].map((m) => ({
  n: Number(m[1]),
  id: m[2],
  device: m[3],
}));

const files = existsSync(inDir) ? readdirSync(inDir) : [];
const manifest = {};
const missing = [];
for (const d of defs) {
  const prefix = String(d.n).padStart(2, "0");
  const f = files.find((x) => x.startsWith(prefix) && /\.(png|jpe?g|webp)$/i.test(extname(x)));
  if (!f) {
    missing.push(`${prefix} ${d.id}`);
    continue;
  }
  const maxW = d.device === "phone" ? 720 : 1600;
  const input = join(inDir, f);
  const meta = await sharp(input).metadata();
  const w = Math.min(meta.width ?? maxW, maxW);
  const pipeline = () => sharp(input).rotate().resize({ width: w, withoutEnlargement: true });
  const webp = await pipeline().webp({ quality: 80 }).toBuffer({ resolveWithObject: true });
  writeFileSync(join(outDir, `${d.id}.webp`), webp.data);
  const avif = await pipeline().avif({ quality: 55 }).toBuffer();
  writeFileSync(join(outDir, `${d.id}.avif`), avif);
  manifest[d.id] = {
    src: `/screens/${d.id}.webp`,
    avif: `/screens/${d.id}.avif`,
    width: webp.info.width,
    height: webp.info.height,
  };
  console.log(`${prefix} ${d.id}: ${webp.info.width}x${webp.info.height}  webp ${(webp.data.length / 1024).toFixed(0)} KB, avif ${(avif.length / 1024).toFixed(0)} KB`);
}
writeFileSync(join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
console.log(`\n${Object.keys(manifest).length} of ${defs.length} screens processed.`);
if (missing.length) console.log("Still missing: " + missing.join(", "));
