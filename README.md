# YuanQiSeoWeb

Consumer site for SEO / AEO landing pages on `partgenie.ai` (`/parts/*`, `/alternatives/*`, `/compare/*`, `/manufacturers/*`, `/answers/*`). Phase 1 runs locally with Server Components; Phase 2 deploys to Cloudflare Pages.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Design previews (mock, SEO-7e)

Open **`http://localhost:3002/dev/seo-previews`** for the index. Sample pages use static fixtures (no SEO API):

| Type | URL |
|------|-----|
| Component Intelligence | `/parts/stm32f103c8t6` |
| Alternative | `/alternatives/bq24195l` |
| Compare | `/compare/stm32f103c8t6-vs-gd32f103c8t6` |
| Manufacturer | `/manufacturers/stmicroelectronics` |
| Query Answer | `/answers/best-mcu-for-wearable-device` |

Other `/parts/{slug}` routes still call YuanQiService when not in the mock slug set.

## Live API pages

`http://localhost:3002/parts/{slug}` — data from YuanQiService `GET /api/v1/seo/pages/:slug`.

Draft: `/parts/{slug}?preview={token}` from Admin **SEO Pages → Preview**.

## Env

| Variable | Description |
|----------|-------------|
| `YUANQI_API_BASE` | API base, e.g. `http://127.0.0.1:8080/api/v1` |

## Cloudflare OpenNext

This app deploys to Cloudflare with `@opennextjs/cloudflare`.

```bash
pnpm run cf:build
pnpm run cf:preview
pnpm run cf:deploy
```

Cloudflare production env vars:

| Variable | Description |
|----------|-------------|
| `YUANQI_API_BASE` | Production SEO API base, e.g. `https://<service-prod>/api/v1` |
| `NEXT_PUBLIC_YUANQI_API_BASE` | Public API base for client-side links/calls |
| `REVALIDATE_SECRET` | Must match YuanQiService `seo.revalidate_secret` |
| `NEXT_PUBLIC_APP_ORIGIN` | Product app origin, e.g. `https://app.partgenie.ai` |

Use the deployed Worker URL as the pSEO origin for the routing Worker, for example `PSEO_PAGES_ORIGIN=https://yuanqi-seo-web.<account>.workers.dev`.

## Docs

- [SEO_PSEO_PLAN.md](../docs/SEO_PSEO_PLAN.md) — engineering spec  
- [SEO_AEO_PAGE_PRD.md](../docs/SEO_AEO_PAGE_PRD.md) — product / AEO appendix  
