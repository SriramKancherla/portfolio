# data/

Source of truth for every personal document and asset the site uses.
Nothing in here is code, and nothing here is served directly — the frontend
copies what it needs at build time.

## documents/

The résumé and certificate PDFs, named exactly as the site links to them.
`frontend/scripts/sync-documents.mjs` copies every PDF in this folder into
`frontend/public/documents/` before `npm run dev` and before `npm run build`.

To add or replace a certificate: drop the PDF in here with the filename the
site expects, then add the row in `frontend/src/components/Certifications.tsx`.
No script edits needed — the sync picks up whatever is present.

`_originals/` holds the untouched files as they were received (original
filenames, superseded versions). It is never copied to the frontend.

## images/

Original image assets at full resolution. The frontend keeps its own
optimised, correctly-named copies under `frontend/public/`; these are the
masters to re-export from.

## design/

Design source material — the Claude Design canvas export, the exported PDF,
and `rocket-prompt.md`, the build prompt the current frontend was generated
from. Keep the prompt updated when the design changes; it is the fastest way
to regenerate or hand off the frontend.
