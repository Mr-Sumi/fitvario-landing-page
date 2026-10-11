// Builds public/og-image.png, public/apple-touch-icon.png and public/logo.png from the app's real icon
// (public/fitvario-icon.png, copied from the Flutter app's assets/images/icon.png).
// Palette from the app: ink #192126, lime #BBF246. Run: node scripts/generate-brand-assets.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
await mkdir(root, { recursive: true });

const INK = "#192126";
const LIME = "#BBF246";
const PAPER = "#FAFAF6";
const FONT = "Arial, Helvetica, sans-serif";
const icon = join(root, "fitvario-icon.png");

await sharp(icon).resize(512, 512).png().toFile(join(root, "logo.png"));
await sharp(icon).resize(180, 180).png().toFile(join(root, "apple-touch-icon.png"));

const iconBuf = await sharp(icon).resize(96, 96).png().toBuffer();
const og = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="${PAPER}"/>
    <rect x="0" y="0" width="14" height="630" fill="${LIME}"/>
    <text x="196" y="150" font-family="${FONT}" font-weight="700" font-size="52" fill="${INK}">Fitvario</text>
    <text x="80" y="300" font-family="${FONT}" font-weight="700" font-size="68" fill="${INK}">Gym management software</text>
    <text x="80" y="384" font-family="${FONT}" font-weight="700" font-size="68" fill="${INK}">for Indian gyms</text>
    <text x="80" y="470" font-family="${FONT}" font-weight="400" font-size="34" fill="#4B555B">Memberships, QR attendance, CRM and revenue.</text>
    <rect x="80" y="520" width="12" height="40" fill="${LIME}"/>
    <text x="108" y="552" font-family="${FONT}" font-weight="600" font-size="30" fill="${INK}">www.fitvario.com</text>
  </svg>`;

await sharp(Buffer.from(og))
  .composite([{ input: iconBuf, left: 80, top: 92 }])
  .png()
  .toFile(join(root, "og-image.png"));
console.log("brand assets written to public/");
