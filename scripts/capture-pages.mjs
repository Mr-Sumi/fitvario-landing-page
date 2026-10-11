// Full-page screenshots of a running site at 390 px and 1440 px, saved as WebP, using Chrome's DevTools protocol
// with real device emulation (headless --window-size has a minimum width and crops 390 px captures).
// Usage: node scripts/capture-pages.mjs <before|after> [baseUrl]
// Needs a running server (npx next start -p 3100) and Google Chrome. Output: docs/seo/design/<label>-<page>-<width>.webp
// The pages contain no member data, so nothing personal is captured. Cookie banner is dismissed by setting the
// consent key the site checks (decline), so it does not cover the page.
import { spawn } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const label = process.argv[2] ?? "after";
const base = process.argv[3] ?? "http://localhost:3100";
const chrome = process.env.CHROME_PATH ?? "C:/Program Files/Google/Chrome/Application/chrome.exe";
if (!existsSync(chrome)) throw new Error("Chrome not found; set CHROME_PATH");
const port = 9444;

const PAGES = [
  ["home", "/"],
  ["pricing", "/pricing"],
  ["feature", "/features/whatsapp-reminders"],
  ["tool", "/tools/gym-break-even-calculator"],
  ["blog", "/blog/reduce-gym-member-churn-india"],
];
const WIDTHS = [390, 1440];

const out = join(root, "docs", "seo", "design");
mkdirSync(out, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const proc = spawn(chrome, ["--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars", `--remote-debugging-port=${port}`, "about:blank"], { stdio: "ignore" });
try {
  let targets;
  for (let i = 0; i < 40; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (targets.some((t) => t.type === "page")) break; } catch {}
    await sleep(250);
  }
  const ws = new WebSocket(targets.find((t) => t.type === "page").webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));
  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d); pending.delete(d.id); } };
  const send = (method, params = {}) => new Promise((res) => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });

  for (const [name, path] of PAGES) {
    for (const w of WIDTHS) {
      await send("Emulation.setDeviceMetricsOverride", { width: w, height: 900, deviceScaleFactor: 1, mobile: w < 600 });
      await send("Page.navigate", { url: base + path });
      await sleep(2500);
      // Decline cookies so the banner is not in the shot (the site reads this from localStorage)
      await send("Runtime.evaluate", { expression: `try{localStorage.setItem("fitvario_cookie_consent","declined");}catch(e){}` });
      await send("Page.navigate", { url: base + path });
      await sleep(2500);
      const hide = `(() => { for (const el of document.querySelectorAll("body *")) { const p = getComputedStyle(el).position; if (p === "fixed" && !el.closest("header")) el.style.display = "none"; } })()`;
      await send("Runtime.evaluate", { expression: hide });
      const m = await send("Page.getLayoutMetrics");
      const h = Math.min(Math.ceil(m.result.cssContentSize.height), 9000);
      const shot = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y: 0, width: w, height: h, scale: 1 } });
      const buf = Buffer.from(shot.result.data, "base64");
      const file = join(out, `${label}-${name}-${w}.webp`);
      await sharp(buf).webp({ quality: 76 }).toFile(file);
      console.log(`${label}-${name}-${w}.webp  ${w}x${h}`);
    }
  }
  ws.close();
} finally {
  proc.kill();
}
