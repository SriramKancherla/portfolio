import { cpSync, copyFileSync, existsSync, readdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(frontendRoot, ".open-next");
const assetsDir = join(outputDir, "assets");
const workerPath = join(outputDir, "worker.js");

if (!existsSync(workerPath)) {
  console.error("[prepare-pages-output] Missing .open-next/worker.js — run opennextjs-cloudflare build first.");
  process.exit(1);
}

if (!existsSync(assetsDir)) {
  console.error("[prepare-pages-output] Missing .open-next/assets — run opennextjs-cloudflare build first.");
  process.exit(1);
}

copyFileSync(workerPath, join(outputDir, "_worker.js"));

for (const entry of readdirSync(assetsDir)) {
  cpSync(join(assetsDir, entry), join(outputDir, entry), { recursive: true });
}

const routes = {
  version: 1,
  include: ["/*"],
  exclude: [
    "/_next/static/*",
    "/documents/*",
    "/fonts/*",
    "/patterns/*",
    "/ships/*",
    "/favicon.svg",
    "/og-image.png",
    "/og-image.svg",
    "/portrait.jpg",
    "/portrait.webp",
    "/placeholder.svg",
    "/robots.txt",
    "/sitemap.xml",
    "/*.css",
    "/*.js",
    "/*.png",
    "/*.jpg",
    "/*.webp",
    "/*.svg",
    "/*.ttf",
    "/*.woff",
    "/*.woff2",
  ],
};

writeFileSync(join(outputDir, "_routes.json"), `${JSON.stringify(routes, null, 2)}\n`);
console.log("[prepare-pages-output] Pages output ready at .open-next/");
