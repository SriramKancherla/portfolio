# Portfolio — Sriram Kancherla

Personal portfolio site. The repo is split into three parts, each with a single
job.

```
Portfolio/
├── frontend/     Next.js app — everything the browser sees
├── backend/      Cloudflare Worker — server code, deployed separately
└── data/         Résumé, certificates, images, design source
```

## Quick start

```bash
npm run install:all     # installs frontend and backend dependencies
npm run dev             # frontend at http://localhost:3000
npm run backend:dev     # backend at http://localhost:8787
```

Root scripts delegate to the right folder, so you rarely need to `cd`.

| Command | What it does |
| --- | --- |
| `npm run dev` | Frontend dev server |
| `npm run build` | Production build of the frontend |
| `npm run deploy` | Deploy the frontend to Cloudflare |
| `npm run sync:documents` | Copy `data/documents/` into the frontend |
| `npm run backend:dev` | Backend dev server |
| `npm run backend:deploy` | Deploy the Worker |

## frontend/

Next.js on Cloudflare Workers via OpenNext. Self-contained — its own
`package.json`, `wrangler.jsonc`, and `vercel.json`, so it deploys on its own
from this subdirectory.

The contact form lives here at `src/app/api/contact/route.ts`, not in
`backend/`. Next.js route handlers have to sit inside the Next app to deploy
with it; see `backend/README.md`.

**Deploy settings:** if you deploy through a dashboard rather than the CLI, set
the project's root directory to `frontend`.

## backend/

A standalone Cloudflare Worker with one route (`GET /health`) and a CORS layer
ready for real endpoints. Add routes to the `routes` map in `src/index.ts`.

Before it goes live, add the deployed frontend origin to `ALLOWED_ORIGINS` in
`backend/wrangler.jsonc` — it currently only allows `localhost:3000`.

## data/

Source of truth for personal documents and assets. Nothing here is served
directly.

`frontend/scripts/sync-documents.mjs` copies every PDF from `data/documents/`
into `frontend/public/documents/` before `dev` and `build`, which is why
`frontend/public/documents/` is gitignored — it is generated, not authored.

**To add a certificate:** drop the PDF in `data/documents/` with the filename
the site expects, then add its row in
`frontend/src/components/Certifications.tsx`.

See `data/README.md` for the full layout.

## _to_delete/

The previous root-level app, superseded by `frontend/`. It is also in git
history, so this folder is only a convenience — delete it once you are happy
with the new build.
