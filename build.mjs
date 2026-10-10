import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright-core";

// node build.mjs        -> desain v1 (src/)      -> dist/compro.pdf
// node build.mjs v2     -> desain v2 (src/v2/)   -> dist/compro-v2.pdf
const v = process.argv[2] || "";
const dir = v ? `./src/${v}/` : "./src/";
const out = v ? `compro-${v}` : "compro";

const { default: pages } = await import(`${dir}pages.mjs`);
const css = readFileSync(new URL(`${dir}styles.css`, import.meta.url), "utf8");
const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Company Profile PT. Santi Wijaya Meat</title><style>${css}</style></head><body>${pages.join("\n")}</body></html>`;

mkdirSync("dist", { recursive: true });
writeFileSync(`dist/${out}.html`, html);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
await page.goto(`file://${process.cwd()}/dist/${out}.html`, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
await page.pdf({ path: `dist/${out}.pdf`, format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`OK: ${pages.length} halaman -> dist/${out}.pdf`);
