import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright-core";
import pages from "./src/pages.mjs";

const css = readFileSync(new URL("./src/styles.css", import.meta.url), "utf8");
const html = `<!doctype html><html lang="id"><head><meta charset="utf-8"><title>Company Profile PT. Santi Wijaya Meat</title><style>${css}</style></head><body>${pages.join("\n")}</body></html>`;

mkdirSync("dist", { recursive: true });
writeFileSync("dist/compro.html", html);

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.pdf({ path: "dist/compro-kerangka.pdf", format: "A4", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log(`OK: ${pages.length} halaman -> dist/compro-kerangka.pdf`);
