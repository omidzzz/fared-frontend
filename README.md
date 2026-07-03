# Fared — Storefront (`fared-frontend`)

Persian-first (Farsi / RTL), mobile-first e-commerce storefront for the **Fared**
(**فارد**) platform — a mystical-spiritual shop (crystals, candles, tours,
courses, mentorship). This is the customer-facing storefront only; it currently
runs **entirely on mock data** (`lib/mock-data.ts`) and needs no backend to build
or run. It is a high-fidelity UI, not yet a transacting store.

> Platform = 3 repos: **`fared-frontend`** (this one) · `fared-backend` (REST API)
> · `fared-admin` (admin panel). The backend and admin are **separate repos** and
> are not in this workspace.

## Stack

- **Next.js 16.2.6** (App Router) + **React 19** + **TypeScript 5**
- **TailwindCSS 3.4** (+ `tailwindcss-rtl`), Framer Motion, @tanstack/react-query, zustand, react-hot-toast, next-intl, react-icons
- Deploy target: **Vercel** · Node 20.x

> Note: the older `PROJECT.md` references "Next.js 14" — that is stale; the repo
> is on **Next 16 / React 19**.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — not needed while running on mock data
npm run dev                  # dev server at http://localhost:3000
```

Other scripts: `npm run build` (production build) · `npm run start` (serve build) ·
`npm run lint` · `npx tsc --noEmit` (type check).

## Environment variables

Names only — see [.env.example](.env.example). **None are required to run today**
(the app is mock-data driven); they are the integration points for the future
backend:

- `NEXT_PUBLIC_BACKEND_URL` — base URL of the `fared-backend` REST API (consumed by `lib/api.ts`, currently dormant).
- `NEXT_PUBLIC_MEDUSA_URL` — referenced only in commented-out examples in `lib/mock-data.ts`.

**Never commit real secrets.** `.gitignore` ignores all `.env*` except `.env.example`.

## Status & known issues

This storefront is **not yet wired to a real backend** — auth is mocked, the
`app/api/*` routes are stubs, and there is no payment/email integration. To enable
real transactions, the **Fared backend** must be stood up and wired in (set
`NEXT_PUBLIC_BACKEND_URL` and connect `lib/api.ts` / `hooks/useProducts.ts` in
place of `lib/mock-data.ts`).

➡️ **See [HANDOFF.md](HANDOFF.md) for the full implementation status, route
inventory, known issues, and what the client must own to go to production.**
