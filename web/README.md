# Website SWM (prototipe)

Situs statis dibangun dari `data/*.json` dan `assets/` yang sama dengan compro.

- Build: `npm install && npm run build:web` menghasilkan `web/dist/` (tidak di-commit).
- Lihat lokal: buka `web/dist/index.html`, atau `npx serve web/dist`.
- Staging: Cloudflare Workers Builds menyajikan `web/dist` lewat `wrangler.jsonc` di root repo.
- Cabang selain produksi diberi `noindex` (env `WORKERS_CI_BRANCH` / `PRODUCTION_BRANCH`).
