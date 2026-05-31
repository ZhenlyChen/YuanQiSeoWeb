# YuanQiSeoWeb

Consumer site for SEO landing pages (`partgenie.ai/parts/*`). Phase 1 runs locally with Server Components; Phase 2 deploys to Cloudflare Pages.

## Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3002/parts/{slug}` — data from YuanQiService `GET /api/v1/seo/pages/:slug`.

## Env

| Variable | Description |
|----------|-------------|
| `YUANQI_API_BASE` | API base, e.g. `http://127.0.0.1:8080/api/v1` |

## Preview

Draft pages: `/parts/{slug}?preview={token}` from Admin **SEO Pages → Preview**.
