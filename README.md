# Portfolio — Sriram Kancherla

Personal portfolio site. The repo is split into three parts:

```
Portfolio/
├── frontend/     Next.js app — everything the browser sees
├── backend/      Cloudflare Worker — optional API shell (health check today)
└── data/         Résumé, certificates, images, design source
```

**Live site:** [sriramkancherla.pages.dev](https://sriramkancherla.pages.dev)

## Quick start

```bash
npm run install:all     # installs frontend and backend dependencies
npm run dev             # frontend at http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Frontend dev server |
| `npm run build` | Production OpenNext build of the frontend (installs `frontend/` deps first) |
| `npm run deploy` | Deploy the frontend to Cloudflare (OpenNext Worker) |
| `npm run sync:documents` | Copy `data/documents/` into the frontend |
| `npm run backend:dev` | Backend dev server |
| `npm run backend:deploy` | Deploy the backend Worker |

## frontend/

Next.js on Cloudflare Workers via OpenNext. Deploy from this subdirectory (set the Cloudflare project root to `frontend` if using a dashboard).

**Contact form:** posts directly to Web3Forms from the browser (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`). Web3Forms’ free plan requires client-side submission — protect the key with domain allowlisting in their dashboard, not by hiding it.

**Build env (required for deploy):**

- `NEXT_PUBLIC_SITE_URL` — canonical / OG / sitemap base URL
- `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` — Web3Forms access key (inlined at build time)

## backend/

Standalone Cloudflare Worker with `GET /health`. Add routes in `backend/src/index.ts` when you need shared APIs outside the Next app.

## data/

Source of truth for PDFs and assets. Nothing here is served directly.

`frontend/scripts/sync-documents.mjs` copies PDFs from `data/documents/` into `frontend/public/documents/` before `dev` and `build`. Files in `_originals/` are never copied. Private letters (e.g. internship confirmations) belong in `_originals/`, not the public documents folder.

See `data/README.md` for the full layout.

## GitHub Pages (`docs/`)

GitHub is still configured to publish from the **`/docs`** folder on `main` (for `github.io/portfolio/` redirects). That folder is **not** the Next.js app — it only contains static redirect stubs to [sriramkancherla.pages.dev](https://sriramkancherla.pages.dev). The `.nojekyll` file skips Jekyll so the build does not fail on an empty site.

The live portfolio is deployed from **`frontend/`** to Cloudflare Workers via OpenNext.

**Cloudflare Pages (Git):** leave the project root at the **repository root** with build command `npm run build`. The root `prebuild` runs `npm ci --prefix frontend`, then OpenNext builds and `prepare-pages-output.mjs` stages `frontend/.open-next/` for Pages (`_worker.js`, static assets, `_routes.json`). Root `wrangler.jsonc` sets `pages_build_output_dir` to that folder. Set `NEXT_PUBLIC_SITE_URL` and `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY` in the Cloudflare project environment.
