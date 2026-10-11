// Builds a multi-size favicon.ico (16, 32, 48 px, PNG-in-ICO) and the app-router icon files from the brand mark.
// Usage: node scripts/make-favicon.mjs [sourcePng] [outDir]
//   defaults: public/fitvario-icon.png -> src/app
// Writes: favicon.ico, icon.png (96 px), apple-icon.png (180 px)
import sharp from "sharp";
import { writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = process.argv[2] ?? join(root, "public", "fitvario-icon.png");
const outDir = process.argv[3] ?? join(root, "src", "app");
mkdirSync(outDir, { recursive: true });

const sizes = [16, 32, 48];
const pngs = [];
for (const s of sizes) pngs.push(await sharp(source).resize(s, s).png({ compressionLevel: 9 }).toBuffer());

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // type: icon
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16);
  e.writeUInt8(s, 0); // width
  e.writeUInt8(s, 1); // height
  e.writeUInt8(0, 2); // palette
  e.writeUInt8(0, 3);
  e.writeUInt16LE(1, 4); // planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(pngs[i].length, 8);
  e.writeUInt32LE(offset, 12);
  offset += pngs[i].length;
  return e;
});
writeFileSync(join(outDir, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));
await sharp(source).resize(96, 96).png().toFile(join(outDir, "icon.png"));
await sharp(source).resize(180, 180).png().toFile(join(outDir, "apple-icon.png"));
console.log(`favicon.ico (${sizes.join(", ")} px), icon.png and apple-icon.png written to ${outDir}`);
