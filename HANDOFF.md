# HANDOFF — fared-frontend (Fared storefront)

This document is the state-of-the-work for the **customer-facing storefront**
repo at final handoff. It covers how to run it, what is and isn't implemented,
and what the client must own to take it to production.

> **Scope of this repo:** storefront only. The platform has **three repos** —
> `fared-frontend` (this one) · `fared-backend` · `fared-admin`. The backend and
> admin are **separate workspaces and are NOT in this repository**; they need
> their own audit/handoff pass.

---

## 1. Stack

- **Next.js 16.2.6** (App Router) + **React 19** + **TypeScript 5**
- **TailwindCSS 3.4** (+ `tailwindcss-rtl`) — Farsi/RTL, mobile-first
- **Framer Motion**, **@tanstack/react-query**, **zustand**, **react-hot-toast**, **next-intl**, **react-icons**
- Deploy target: **Vercel**

> Note: `PROJECT.md` says "Next.js 14" — that is stale; the repo is on Next 16 / React 19.

## 2. Install / run / build

```bash
npm install
npm run dev      # dev server at http://localhost:3000
npm run build    # production build (passes clean)
npm run start    # serve the production build
npm run lint     # eslint
```

Node 20.x. The app **builds and type-checks with no errors or warnings** and runs
**entirely on mock data** — no env vars or backend are required to run it today.

## 3. Environment variables

Names only — see `.env.example`. **None are required to run** in the current
mock-data state; they are the integration points for the future backend:

- `NEXT_PUBLIC_BACKEND_URL` — base URL for the `fared-backend` REST API. Consumed
  by `lib/api.ts` (which is implemented but **not yet imported by any page** —
  dormant).
- `NEXT_PUBLIC_MEDUSA_URL` — referenced only in commented-out examples in
  `lib/mock-data.ts`; not used at runtime.

**Do not commit real secrets.** `.gitignore` ignores all `.env*` except `.env.example`.

---

## 4. Implemented vs NOT implemented (summary)

**The storefront is a complete, polished UI prototype driven 100% by mock data.**
It is a high-fidelity demo, not a transacting store.

| Area | State |
| --- | --- |
| Storefront UI / pages / design system | ✅ Implemented (mock data) |
| Cart (add/remove/qty/persist) | ✅ Functional — localStorage only, no server cart |
| Auth (login/register/logout) | 🟡 **Mock** — client-side only, hardcoded demo creds, no backend |
| Real backend API client (`lib/api.ts`) | 🟡 Written but **dormant** (unused) |
| API routes under `app/api/*` | 🔴 **Stubs** — validate input, return `{success:true}`; no DB/email/payment |
| Payments | ❌ Not present — checkout is a UI flow only |
| Email / notifications | ❌ Not present (stub endpoints only) |
| Real DB / models / migrations | ❌ Not in this repo (would live in `fared-backend`) |
| i18n (next-intl) | 🟡 Dependency present; site is hard-coded Farsi/RTL, locale switching not wired |
| Admin | n/a — separate `fared-admin` repo |

### Demo login
Mock auth accepts exactly: **`demo@aura.com` / `demo123`**. Any other
credentials fail with a Farsi error. Registration accepts anything (emails
containing `exists` are rejected to demo the error path).

---

## 5. Route inventory (high level)

**Reachable from the nav/footer (all return HTTP 200):**
`/` · `/shop` · `/shop/{clothes,candles,accessories,tours,stones,courses,mentorship}`
· `/cart` · `/checkout` · `/product/[id]` · `/about` · `/contact` · `/blog` ·
`/forum` · `/tahrirye` · `/account` · `/profile` · `/auth` · `/journal` ·
`/faq` · `/quotes` · `/energy-guide`.

**Placeholder "coming soon" pages (load fine, intentionally empty):**
`/journal`, `/faq`, `/quotes`, `/energy-guide`, and the six `/shop/*/products`
"full list coming soon" pages.

**Known broken flow — content detail links 404:** the `/tahrirye` page links its
cards to `/tahririye/educational|books|articles|poetry` (and `[slug]`), but
`next.config.ts` permanently redirects `/tahririye/*` → `/tahrirye/*`, where those
detail pages **do not exist** → clicking a card lands on a 404. The detail page
files exist under `app/tahririye/*` but are **unreachable** (shadowed by the
redirect). See "Known issues" below.

**Orphaned / leftover / scratch routes (publicly reachable, NOT linked anywhere,
safe to delete):**
`/test`, `/test-clothes-v2`, `/test-header-v2`, `/shop/clothes-v3`,
`/shop/stones-v2`, `/shop/stones-v3`, and the redirect-shadowed
`app/tahririye/*` and `app/editorial/*` trees.

---

## 6. Known issues (carried into handoff, not fixed)

1. **`/tahrirye` card clicks 404** (detail pages never built at `/tahrirye/*`; see §5).
   One-line client fix options: remove the card links, or build the
   `app/tahrirye/{educational,books,articles,poetry}` pages.
2. **Dead/duplicate routes shipped** — `app/tahririye/*` and `app/editorial/*` are
   fully shadowed by redirects; `test*` and `*-v2/-v3` are dev scratch. They
   build fine but should be removed for a production deploy.
3. **`lib/api.ts` + `hooks/useProducts.ts` are dead code** — the real-backend path
   is written but unused; everything reads `lib/mock-data.ts`.
4. **Auth is mock** and **API routes are stubs** — no persistence, payment, or email.

## 7. What the CLIENT must own to go to production

- **`fared-backend`** (separate repo): real product/cart/order/auth/editorial/forum
  API. Then set `NEXT_PUBLIC_BACKEND_URL` and wire `hooks/useProducts.ts` (and the
  rest of `lib/api.ts`) into the pages in place of `lib/mock-data.ts`.
- **`fared-admin`** (separate repo): admin/CRUD.
- A **payment provider** (none integrated) for checkout.
- An **email/notification** provider (endpoints are stubs).
- **Vercel** project for hosting; an image host (next.config allows
  `res.cloudinary.com`, `images.unsplash.com`, `placehold.co`).
- Enamad trust-seal account (footer links to an existing Enamad id).

## 8. Stabilization changes made for this handoff

See `CHANGELOG-handoff` in the engagement report. In brief: added `.env.example`
(var names only), un-ignored it in `.gitignore`, and added this `HANDOFF.md`.
**No application code was changed; build and type-check already passed.**
