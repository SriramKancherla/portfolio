/**
 * Copies the source-of-truth documents from ../data/documents into public/documents
 * so Next.js can serve them. Runs automatically before `dev` and `build`.
 *
 * Add or replace a PDF in data/documents/ — nothing here needs editing.
 * Files in data/documents/_originals/ are archives and are never copied.
 */
import { copyFileSync, mkdirSync, existsSync, readdirSync, statSync } from "node:fs";
import { dirname, join, extname } from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const sourceDir = join(frontendRoot, "..", "data", "documents");
const outDir = join(frontendRoot, "public", "documents");

const ALLOWED = new Set([".pdf"]);

if (!existsSync(sourceDir)) {
  console.warn(`[sync-documents] No source directory at ${sourceDir}`);
  if (existsSync(outDir) && readdirSync(outDir).length > 0) {
    console.warn("[sync-documents] Keeping the existing public/documents contents.");
    process.exit(0);
  }
  console.error("[sync-documents] Nothing to serve — certificate links will 404.");
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });

const files = readdirSync(sourceDir).filter((name) => {
  if (name.startsWith(".") || name.startsWith("_")) return false;
  if (!ALLOWED.has(extname(name).toLowerCase())) return false;
  return statSync(join(sourceDir, name)).isFile();
});

if (files.length === 0) {
  console.error(`[sync-documents] ${sourceDir} has no PDFs.`);
  process.exit(1);
}

let copied = 0;
for (const name of files) {
  const src = join(sourceDir, name);
  const dest = join(outDir, name);
  // Skip files that are already identical, so repeat builds stay fast.
  if (existsSync(dest) && statSync(dest).size === statSync(src).size) continue;
  copyFileSync(src, dest);
  copied += 1;
}

console.log(
  `[sync-documents] ${files.length} document(s) available in public/documents` +
    (copied ? ` (${copied} updated)` : " (all up to date)")
);
