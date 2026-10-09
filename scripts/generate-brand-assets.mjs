// Builds public/og-image.png, public/apple-touch-icon.png and public/logo.png from the site's "F" mark.
// Run: node scripts/generate-brand-assets.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
await mkdir(root, { recursive: true });

const TEAL = "#0d9488";
const SLATE = "#0f172a";
const FONT = "Arial, Helvetica, sans-serif";

const mark = (size, radius) => `
  <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
    <rect width="${size}" height="${size}" rx="${radius}" fill="${TEAL}"/>
    <text x="50%" y="50%" dy="${size * 0.1}" text-anchor="middle" font-family="${FONT}" font-weight="800"
      font-size="${size * 0.62}" fill="#ffffff">F</text>
  </svg>`;

await sharp(Buffer.from(mark(512, 112))).png().toFile(join(root, "logo.png"));
// iOS rounds the corners itself, so the touch icon is a full-bleed square
await sharp(Buffer.from(mark(180, 0))).png().toFile(join(root, "apple-touch-icon.png"));

const og = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <rect width="1200" height="630" fill="#f8fafc"/>
    <rect x="0" y="0" width="1200" height="12" fill="${TEAL}"/>
    <rect x="80" y="88" width="84" height="84" rx="20" fill="${TEAL}"/>
    <text x="122" y="150" text-anchor="middle" font-family="${FONT}" font-weight="800" font-size="56" fill="#ffffff">F</text>
    <text x="184" y="148" font-family="${FONT}" font-weight="700" font-size="52" fill="${SLATE}">Fitvario</text>
    <text x="80" y="300" font-family="${FONT}" font-weight="700" font-size="68" fill="${SLATE}">Gym management software</text>
    <text x="80" y="384" font-family="${FONT}" font-weight="700" font-size="68" fill="${SLATE}">for Indian gyms</text>
    <text x="80" y="470" font-family="${FONT}" font-weight="400" font-size="34" fill="#475569">Memberships, QR attendance, fee reminders, CRM and revenue.</text>
    <text x="80" y="560" font-family="${FONT}" font-weight="600" font-size="30" fill="${TEAL}">www.fitvario.com</text>
  </svg>`;

await sharp(Buffer.from(og)).png().toFile(join(root, "og-image.png"));
console.log("brand assets written to public/");
