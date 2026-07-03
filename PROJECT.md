# CLAUDE.md — fared-frontend (v4.5 - Sprint Mode)

## Next.js Frontend Reference

| Field           | Value                                                                        |
| --------------- | ---------------------------------------------------------------------------- |
| **Repo**        | `fared-frontend`                                                             |
| **Part of**     | Fared Platform (3 repos: `fared-frontend` · `fared-backend` · `fared-admin`) |
| **Connects to** | `fared-backend` REST API at `NEXT_PUBLIC_MEDUSA_URL`                         |
| **Deadline**    | 18 days from project start                                                   |

---

## 🔮 Project Identity

| Field         | Value                                                              |
| ------------- | ------------------------------------------------------------------ |
| **Name**      | Fared (فارد)                                                       |
| **Nature**    | Premium mystical-spiritual e-commerce platform                     |
| **This repo** | Customer-facing storefront only                                    |
| **Stack**     | Next.js 14 (App Router) + TypeScript + TailwindCSS + Framer Motion |
| **Languages** | English + Farsi (RTL) — Mobile-First Core Architecture             |
| **Deploy**    | Vercel                                                             |

---

## ⚠️ Sprint Rules (Read First)

These rules exist because the deadline is tight. Follow them without exception.

1. **Never refactor working code.** If a component works, leave it alone.
2. **Mockups are direction, not spec.** Match the mood and design system — do not pixel-chase AI illustrations.
3. **Mobile-first, always.** Base classes for mobile. `md:`/`lg:` for desktop only. Default language: Farsi. All new text must be in Farsi unless explicitly specified otherwise.
4. **Scope is fixed per session.** Only touch files listed in the current task. Nothing else.
5. **No new dependencies** unless explicitly requested.
6. **`npx tsc --noEmit` must pass** before any task is considered done.
7. **Never break the Unified Luxury Mobile Layout stack order.** The 5-section sequence (Header → Hero → Quick-Nav → Product Stream → Footer Badges) is immutable. Do not reorder, merge, or skip sections without an explicit instruction.
8. **Desktop layouts are frozen.** The v4.5 Unified Layout Pattern applies to mobile viewports only. Never add, remove, or modify `lg:`, `md:`, or `xl:` Tailwind classes on any existing page. New pages built under v4.5 use base (mobile) classes only — no responsive prefixes.

---

## 🎨 Design System

### Chakra Color Palette

| Variable          | Hex       | Chakra             | Category          |
| ----------------- | --------- | ------------------ | ----------------- |
| `--chakra-root`   | `#c0392b` | Root — Red         | Clothes           |
| `--chakra-sacral` | `#e67e22` | Sacral — Orange    | Candles           |
| `--chakra-solar`  | `#f1c40f` | Solar — Yellow     | Accessories       |
| `--chakra-heart`  | `#27ae60` | Heart — Green      | Tours             |
| `--chakra-throat` | `#2980b9` | Throat — Blue      | Stones            |
| `--chakra-third`  | `#8e44ad` | Third Eye — Indigo | Courses           |
| `--chakra-crown`  | `#9b59b6` | Crown — Violet     | Mentorship + Home |

```css
:root {
  --chakra-root: #c0392b;
  --chakra-sacral: #e67e22;
  --chakra-solar: #f1c40f;
  --chakra-heart: #27ae60;
  --chakra-throat: #2980b9;
  --chakra-third: #8e44ad;
  --chakra-crown: #9b59b6;
  --cosmic-dark: #070714;
  --deep-indigo: #0d0d2b;
  --card-glass: rgba(255, 255, 255, 0.03);
  --card-border: rgba(255, 255, 255, 0.08);
  --gold-accent: #fecb7d;
  --gold-deep: #c9a84c;
  --text-primary: #f0ebe3;
  --text-secondary: #b8aead;
  --text-muted: #6b6a7a;
}
```

### Typography

| Role        | Font               | Style      |
| ----------- | ------------------ | ---------- |
| Headings    | Playfair Display   | serif      |
| Subheadings | Cormorant Garamond | serif      |
| Body        | Inter              | sans-serif |
| Farsi/RTL   | Vazirmatn          | sans-serif |

### Per-Page Background Gradients (`globals.css`)

| Class                  | Page             |
| ---------------------- | ---------------- |
| `page-gradient-crown`  | Home, Mentorship |
| `page-gradient-heart`  | Tours            |
| `page-gradient-root`   | Clothes          |
| `page-gradient-throat` | Stones           |
| `page-gradient-third`  | Courses          |
| `page-gradient-sacral` | Candles          |
| `page-gradient-solar`  | Accessories      |

---

## 🖼️ Layout Patterns

### Header (`DynamicHeader.tsx`)

- Fixed, fully transparent, `backdrop-blur` overlay
- Not scrolled: `bg-[rgba(7,7,20,0.15)]` + `backdrop-blur-md`
- Scrolled >10px: `bg-[rgba(7,7,20,0.55)]` + `backdrop-blur-lg`
- Bottom ornament: `<HeaderOrnament />` — SVG curved arms + lotus drop
- Cart badge: live count from `useCart()`
- Route-aware SVG tongue color via `usePathname()`

### Hero Patterns

> ⚠️ **v4.5 update:** The old full-bleed mobile hero is deprecated for all `/shop/*` pages.
> Use the **Isolated Hero** pattern defined in the Unified Luxury Mobile Layout section below.
> The home page (`/`) retains its full-bleed `100svh` hero unchanged.
> **Desktop heroes on all existing pages are frozen — do not touch them.**

### Hero Image Assets

```
public/images/hero-backgrounds/
  home-hero.png         ← portrait
  tours-hero.png        ← landscape
  candles-hero.png      ← landscape
  stones-hero.png       ← landscape
  [category]-hero.png   ← convention for new pages
```

### Glassmorphism Stack

- **Cards:** `backdrop-blur-md bg-white/[0.03] border border-white/[0.08]`
- **Forms/panels:** `backdrop-blur-2xl bg-[rgba(7,7,20,0.45)] border border-white/[0.12]`
- **Feature boxes:** `backdrop-blur-xl bg-[rgba(10,10,32,0.75)] border border-[rgba(254,203,125,0.22)]`

### Visual Cards

| Type                 | Used for        | Key style                                  |
| -------------------- | --------------- | ------------------------------------------ |
| Soul Card            | Clothes         | Arch border, size pills                    |
| Crystal Card         | Stones, generic | Square image, chakra glow border           |
| Candle Card          | Candles         | Portrait `aspect-[3/4]`, flame glow        |
| Tour Card            | Tours           | `h-48` image + glass body                  |
| Course Card          | Courses         | Landscape `aspect-[4/3]`, instructor badge |
| Mentor Card          | Mentorship      | Circular avatar, rating stars              |
| Crystal Product Card | Home featured   | Square, Farsi name, Toman price, cart btn  |

---

## 📱 Unified Luxury Mobile Layout Pattern (v4.5)

> **Applies to:** ALL `/shop/*` category pages on **mobile viewports only**.
> **Desktop layouts are completely frozen.** This pattern must never introduce or modify any `lg:`, `md:`, or `xl:` Tailwind classes — on new pages or existing ones.
> **Migration:** Already-built pages (Clothes, Candles, Stones, Tours) should be retrofitted to this pattern only when their route is explicitly in the current task scope. Do not proactively refactor (Sprint Rule 1).

---

### Section 1 — Fixed Dynamic Header

Use `<DynamicHeader />` unchanged. No modifications per page.

---

### Section 2 — Isolated Hero (The Atmosphere Container)

**Purpose:** Contain the high-fidelity category art safely inside a bounded card so it never bleeds or overlaps surrounding UI on mobile.

**Structure:**

```tsx
<section className="px-4 pt-[88px] pb-4">
  <div className="relative rounded-3xl overflow-hidden aspect-[4/3]">
    {/* Background image */}
    <Image src="..." fill className="object-cover" alt="" onError={...} />
    {/* Dark gradient overlay for text legibility */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
    {/* Shimmer — z-10, sits above image, below text */}
    <HeroShimmer />
    {/* Text + CTA — z-20, always above shimmer */}
    <div className="absolute inset-0 z-20 flex flex-col justify-end p-6">
      <h1 className="font-display text-3xl text-[var(--text-primary)]">...</h1>
      <button className="mt-4 ...">CTA</button>
    </div>
  </div>
</section>
```

**Shimmer micro-animation — canonical spec (`components/ui/HeroShimmer.tsx`):**

```tsx
"use client";
import { motion } from "framer-motion";

export function HeroShimmer() {
  return (
    <motion.div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{
        background:
          "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
      }}
      animate={{ x: ["-100%", "200%"] }}
      transition={{
        duration: 3.5,
        ease: "linear",
        repeat: Infinity,
        repeatDelay: 1.5,
      }}
    />
  );
}
```

- `z-10` — above the image, below the text (`z-20`)
- `pointer-events-none` — never intercepts touch events
- Always import `<HeroShimmer />`. Never inline this animation.

---

### Section 3 — Horizontal Quick-Nav Grid (The Category Hub)

**Render only on pages that require sub-category navigation. Omit entirely (no empty container, no margin placeholder) on pages that don't need it.**

| Page        | Quick-Nav? | Items                                      |
| ----------- | ---------- | ------------------------------------------ |
| Clothes     | ✅         | Tops, Bottoms, Dresses, Outerwear, Scarves |
| Stones      | ✅         | All, Protection, Love, Abundance, Clarity  |
| Courses     | ✅         | All, Beginner, Intermediate, Advanced      |
| Candles     | ❌         | —                                          |
| Tours       | ❌         | —                                          |
| Accessories | ❌         | —                                          |
| Mentorship  | ❌         | —                                          |

**Structure:**

```tsx
<div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 py-2 px-4">
  {categories.map((cat) => (
    <button
      key={cat.id}
      className="flex-shrink-0 snap-start flex flex-col items-center gap-1.5 min-w-[64px] min-h-11"
    >
      <div
        className="w-14 h-14 rounded-full border-2 flex items-center justify-center
                      border-[var(--chakra-{page})] bg-white/[0.04]"
      >
        {/* Simple inline SVG placeholder icon — no icon library */}
      </div>
      <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
        {cat.label}
      </span>
    </button>
  ))}
</div>
```

---

### Section 4 — Linearized Product Stream (The Swipe Row)

**Purpose:** Replace vertical multi-column product grids with a single horizontal thumb-swipe carousel on mobile.

**Wrapper:**

```tsx
<section className="py-6">
  <h2 className="px-4 font-display text-xl text-[var(--text-primary)] mb-4">
    ...
  </h2>
  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-4 px-4 pb-6">
    {products.map((p) => (
      <div key={p.id} className="w-[75vw] flex-shrink-0 snap-start">
        <YourCard product={p} />
      </div>
    ))}
    {/* View All token — always last in the row */}
    <div className="w-[40vw] flex-shrink-0 snap-start flex items-center justify-center">
      <Link
        href="/shop/[category]"
        className="backdrop-blur-md bg-white/[0.03] border border-white/[0.08]
                   rounded-2xl h-full min-h-[200px] w-full flex flex-col
                   items-center justify-center gap-2 text-[var(--text-secondary)]
                   hover:border-white/[0.18] transition-colors"
      >
        <span className="text-2xl">→</span>
        <span className="text-sm font-body">View All</span>
      </Link>
    </div>
  </div>
</section>
```

**Multiple rows:** If a page needs multiple product categories, repeat the entire `<section>` block — one per category. Do not nest rows.

---

### Section 5 — Compact Footer Badges

Render `<FeatureBadges />` at the bottom of the page content, before `<Footer />`. Do not modify the component itself.

```tsx
<FeatureBadges />
<Footer />
```

---

## 📁 Project Structure

```
fared-frontend/
├── CLAUDE.md
├── app/
│   ├── layout.tsx                      ✅
│   ├── page.tsx                        ✅ Home — desktop frozen, untouchable
│   ├── globals.css                     ✅
│   ├── shop/
│   │   ├── layout.tsx                  ✅
│   │   ├── page.tsx                    ⏳ Shop overview
│   │   ├── clothes/page.tsx            ✅ desktop frozen → v4.5 mobile retrofit when in scope
│   │   ├── tours/page.tsx              ✅ desktop frozen → v4.5 mobile retrofit when in scope
│   │   ├── candles/page.tsx            ✅ desktop frozen → v4.5 mobile retrofit when in scope
│   │   ├── stones/page.tsx             ✅ desktop frozen → v4.5 mobile retrofit when in scope
│   │   ├── accessories/page.tsx        ⏳ build with v4.5 mobile only
│   │   ├── courses/page.tsx            ⏳ build with v4.5 mobile only
│   │   ├── mentorship/page.tsx         ⏳ build with v4.5 mobile only
│   │   └── [category]/page.tsx         ✅ fallback
│   ├── shop/tours/[slug]/page.tsx      ⏳ Tour detail
│   ├── product/[id]/page.tsx           ⏳ 🔴 TODAY
│   ├── cart/page.tsx                   ⏳ 🔴 TODAY
│   └── checkout/page.tsx              ⏳ 🔴 TODAY
│
├── components/
│   ├── layout/
│   │   ├── DynamicHeader.tsx           ✅ frozen
│   │   ├── MobileNav.tsx               ✅ frozen
│   │   └── Footer.tsx                  ✅ frozen
│   ├── ui/
│   │   ├── HeaderOrnament.tsx          ✅ frozen
│   │   ├── HeroShimmer.tsx             ⏳ 🔴 Create first — shared by all v4.5 pages
│   │   ├── TourCard.tsx                ✅ frozen
│   │   ├── TourEnquiryForm.tsx         ✅ frozen
│   │   ├── SoulCard.tsx                ✅ frozen
│   │   ├── CrystalCard.tsx             ✅ frozen
│   │   ├── CandleCard.tsx              ✅ frozen
│   │   ├── StoneCard.tsx               ✅ frozen
│   │   ├── CartItemRow.tsx             ⏳ 🔴 TODAY
│   │   ├── OrderSummary.tsx            ⏳ 🔴 TODAY
│   │   └── CheckoutStepper.tsx         ⏳ 🔴 TODAY
│   └── home/
│       ├── FeatureBadges.tsx           ✅ frozen — shared across shop pages, never modify
│       ├── FeaturedCrystals.tsx        ✅ frozen
│       └── CategoryShowcase.tsx        ✅ frozen
│
└── lib/
    ├── mock-data.ts                    ✅ append only, never remove exports
    └── cart-context.tsx                ✅ frozen
```

---

## 🗃️ Data Layer

All API calls mocked. **Append only — never remove existing exports.**

### Types

```typescript
(Product, Tour, Crystal, Stone, Candle, Accessory, Course, Mentor, CartItem);
Category: "clothes" |
  "candles" |
  "accessories" |
  "tours" |
  "stones" |
  "courses" |
  "mentorship";
```

### Cart Context API

```typescript
const { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

addItem(item: Omit<CartItem, 'id'>): void
removeItem(id: string): void
updateQuantity(id: string, qty: number): void   // qty < 1 removes item
clearCart(): void
totalItems: number   // sum of all quantities
totalPrice: number   // sum of price × quantity
```

Cart state persists to `localStorage`. `CartProvider` wraps `app/layout.tsx`.

### Product lookup helper

```typescript
getProductById(id: string): Stone | Candle | Accessory | undefined
// Searches MOCK_STONES, MOCK_CANDLES, MOCK_ACCESSORIES
```

### Asset paths

```
public/images/hero-backgrounds/    ← hero images
public/images/products/stones/     ← stone images
public/images/products/candles/    ← candle images
public/images/products/accessories/
public/images/products/courses/
public/images/products/mentorship/
public/images/crystals/            ← home page crystal images
```

---

## 📱 Mobile-First Rules

- Base classes = mobile. `md:`/`lg:` = desktop enhancement — **only on pre-existing desktop layouts**.
- Touch targets: `min-h-11` (44px) on all interactive elements.
- No `<form>` tags — `useState` + `onClick`/`onChange` only.
- Farsi text: `dir="rtl"` on container + `font-farsi`. Prices: `toLocaleString('fa-IR')`.
- RTL spacing: always pair `ml-4 rtl:mr-4 rtl:ml-0`.
- Swipe carousels: `overflow-x-auto snap-x snap-mandatory`, cards `snap-start`.

---

## ⚙️ Tailwind Config

```typescript
colors: {
  chakra: { root, sacral, solar, heart, throat, third, crown },
  cosmic: { dark: '#070714', indigo: '#0D0D2B', gold: '#FECB7D' }
},
fontFamily: {
  display: ['Playfair Display', 'serif'],
  body: ['Inter', 'sans-serif'],
  farsi: ['Vazirmatn', 'sans-serif'],
}
```

---

## 🎯 Coding Conventions

- No hardcoded hex colors in component files. CSS variables or Tailwind tokens only. Exception: SVG `fill`/`stroke`.
- No `any` TypeScript. `npx tsc --noEmit` must pass.
- `onError` on every `<Image />` to hide broken state gracefully.
- No `<form>` tags anywhere.
- `overflow-hidden` on every hero section — zero bleed.
- Glassmorphism inputs: `bg-white/[0.04] border border-white/[0.10] rounded-xl px-4 py-3`.
- **Default language is Farsi.** All UI text, labels, buttons, headings,
  placeholders, empty states, and error messages must be written in Farsi
  by default. English is only used when:
  - A prop or variable explicitly carries English content (e.g. `name` field
    alongside `nameFA`)
  - The content is a code identifier, URL, or technical string
  - The feature is explicitly part of the English language version

---

## ⏳ Remaining Pages

### 🔴 Today (store spine)

| Page           | Route           | Notes                            |
| -------------- | --------------- | -------------------------------- |
| HeroShimmer    | `components/ui` | Create first — unblocks all v4.5 |
| Product detail | `/product/[id]` |                                  |
| Cart           | `/cart`         |                                  |
| Checkout       | `/checkout`     |                                  |

### 🟡 Next (new category pages — v4.5 mobile only)

| Page        | Route               | Chakra             | Quick-Nav? |
| ----------- | ------------------- | ------------------ | ---------- |
| Accessories | `/shop/accessories` | Solar — Yellow     | ❌         |
| Courses     | `/shop/courses`     | Third Eye — Indigo | ✅         |
| Mentorship  | `/shop/mentorship`  | Crown — Violet     | ❌         |

### 🟢 Lower priority

| Page          | Route                |
| ------------- | -------------------- |
| Shop overview | `/shop`              |
| Tour detail   | `/shop/tours/[slug]` |

### 🔁 Retrofit (mobile only, touch only when in scope)

| Page    | Route           | Status                                                   |
| ------- | --------------- | -------------------------------------------------------- |
| Clothes | `/shop/clothes` | ✅ built — desktop frozen, retrofit mobile when in scope |
| Candles | `/shop/candles` | ✅ built — desktop frozen, retrofit mobile when in scope |
| Stones  | `/shop/stones`  | ✅ built — desktop frozen, retrofit mobile when in scope |
| Tours   | `/shop/tours`   | ✅ built — desktop frozen, retrofit mobile when in scope |

### Components still needed

`HeroShimmer` (🔴 first), `FilterBar`, `CartDrawer`, `ProductImageGallery`, `CourseCard`, `MentorCard`, `NewsletterStrip`
