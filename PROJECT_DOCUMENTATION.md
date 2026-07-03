# Project Documentation — Fared Frontend

> **Last updated:** June 2026  
> **Version:** 0.1.0  
> **Status:** Active development — pre-launch

---

## 1. Project Overview

**Fared Frontend** (branded as **Fared** / **فارد**) is a premium mystical-spiritual e-commerce platform built with Next.js. It serves as the customer-facing storefront for crystals, candles, clothing, accessories, courses, tours, mentorship sessions, and editorial content.

| Attribute | Value |
|-----------|-------|
| **Product categories** | Stones, Candles, Accessories, Clothes, Courses, Tours, Mentorship |
| **Content hubs** | Tahrirye (editorial), Blog, Forum, Energy Guide |
| **Languages** | English + Persian (RTL), bilingual throughout |
| **Design style** | Fixed-position cosmic/gradient backgrounds, frosted glass panels, gold accents, serif headings, thin-line SVG icons |
| **Target users** | Spiritual seekers, crystal enthusiasts, conscious consumers in Iran and internationally |

---

## 2. Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| **Framework** | Next.js (App Router) | 16.2.6 |
| **UI Library** | React | 19.2.4 |
| **Language** | TypeScript | 5.x |
| **Styling** | Tailwind CSS + inline styles | 3.4.19 |
| **RTL Support** | tailwindcss-rtl | 0.9.0 |
| **Animations** | Framer Motion | 12.38.0 |
| **State (Server)** | TanStack React Query | 5.100.10 |
| **State (Client)** | React Context + Zustand | 5.0.13 |
| **Icons** | react-icons | 5.6.0 |
| **Toasts** | react-hot-toast | 2.6.0 |
| **i18n** | next-intl | 4.12.0 |
| **Fonts** | Playfair Display, Cormorant Garamond, Inter, Vazirmatn | Google Fonts |
| **Package Manager** | npm | — |
| **Deployment** | Vercel (planned) | — |
| **Database** | None (mock data only) | — |

---

## 3. Architecture

### 3.1 Directory Structure

```
fared-frontend/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx                # Root layout — providers, fonts, header, toaster
│   ├── page.tsx                  # Home page
│   ├── globals.css               # Global styles, CSS variables, keyframes
│   ├── about/                    # About Us page + /about/story
│   ├── account/                  # Account management (orders)
│   ├── auth/                     # Login, register, password reset
│   ├── blog/                     # Blog listing + [slug] detail
│   ├── cart/                     # Shopping cart
│   ├── checkout/                 # 3-step checkout flow
│   ├── contact/                  # Contact form
│   ├── editorial/                # Legacy editorial (redirected to /tahrirye)
│   ├── energy-guide/             # Energy guide page
│   ├── faq/                      # FAQ page
│   ├── forum/                    # Forum listing + [id] post detail
│   ├── journal/                  # Journal page
│   ├── product/[id]/             # Generic product detail
│   ├── profile/                  # User profile dashboard (7 tabs)
│   ├── quotes/                   # Quotes page
│   ├── shop/
│   │   ├── page.tsx              # Shop overview
│   │   ├── layout.tsx            # Shop section layout
│   │   ├── stones/               # Lumina Crystals stones page + detail + products
│   │   ├── stones-v2/            # Alternate stones design (fixed canvas)
│   │   ├── candles/              # Candles listing + detail + products
│   │   ├── accessories/          # Accessories listing + detail + products
│   │   ├── clothes/              # Aura Veda clothes (arch cards) + detail + products
│   │   ├── courses/              # Courses listing + [slug] detail + products
│   │   ├── tours/                # Tours listing + [slug] detail + products
│   │   └── mentorship/           # Mentorship booking + select-time + payment
│   ├── tahrirye/                 # New editorial hub (2×2 card grid)
│   ├── tahririye/                # Old editorial detail pages (articles, books, educational, poetry)
│   ├── test/                     # Component test/showcase page
│   └── api/                      # API routes (7 endpoints)
│       ├── contact/              # POST /api/contact
│       ├── forum/posts/          # GET /api/forum/posts
│       ├── mentorship/book/      # POST /api/mentorship/book
│       ├── newsletter/           # POST /api/newsletter
│       ├── notifications/        # GET /api/notifications
│       ├── orders/               # POST /api/orders
│       ├── tours/enquiry/        # POST /api/tours/enquiry
│       └── users/me/             # GET/PUT /api/users/me + addresses CRUD
├── components/
│   ├── aura/                     # Aura Veda clothes page (ProductCards, ShopHero, ShopSidePanels, ShopBenefits)
│   ├── backgrounds/              # Background components (CategoryBackground, CosmicBackground, ParticleField)
│   ├── cards/                    # Reusable card components (CrystalCard, SoulCard, TourCard, SimpleProductCard, etc.)
│   ├── cart/                     # Cart components (CartItem, CartSummary)
│   ├── editorial/                # Editorial components (ArticleBody, ArticleHero, CommentSection)
│   ├── home/                     # Home page sections (BestSellers, FeatureBadges, QuoteOfTheDay, etc.)
│   ├── layout/                   # Layout components (DynamicHeader, Footer, MobileNav, PageWrapper)
│   ├── providers/                # QueryProvider (React Query)
│   ├── shop/                     # Shop components (AddToCartButton, FilterBar, ProductGrid)
│   └── ui/                       # Shared UI (Button, CTAButton, Modal, Drawer, ProductDetailView, etc.)
├── contexts/                     # (Deprecated — contexts now in lib/)
├── hooks/                        # Custom hooks (useCart, useLocale, useProducts)
├── lib/                          # Core libraries
│   ├── auth-context.tsx          # Authentication context + provider
│   ├── cart-context.tsx          # Cart context + provider (useReducer + localStorage)
│   ├── wishlist-context.tsx      # Wishlist context + provider
│   ├── mock-data.ts              # All mock product data (1000+ lines, 10+ types)
│   ├── api.ts                    # API client (unused — prepared for real backend)
│   ├── backgrounds.ts            # Background gradient definitions
│   └── utils.ts                  # Utility functions
├── public/images/                # Static assets (~50 images, ~100MB total)
│   ├── hero-backgrounds/         # 14 hero images (1.7-2.7MB each, PNG)
│   ├── products/                 # Product images by category
│   │   ├── stones/               # 4 PNGs (amethyst, clear-quartz, labradorite, rose-quartz)
│   │   ├── candles/              # 5 PNGs
│   │   ├── courses/              # 5 PNGs
│   │   ├── accessories/          # 4 PNGs
│   │   ├── clothes/              # 2 PNGs (luna-meditation-robe, placeholder)
│   │   └── tours/                # 4 PNGs (bali, peru, greece, thailand)
│   ├── tahririye/                # 5 editorial card/hero images
│   └── ui/                       # divider-card.svg
├── next.config.ts                # Next.js config (images, redirects)
├── tailwind.config.ts            # Tailwind config (colors, fonts, animations)
├── postcss.config.mjs            # PostCSS config
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies + scripts
```

### 3.2 Component Tree (Key Pages)

```
app/layout.tsx
├── AuthProvider
│   └── CartProvider
│       └── WishlistProvider
│           └── QueryProvider
│               ├── DynamicHeader (global nav)
│               ├── PageWrapper
│               │   └── {children} ← page content
│               └── Toaster
│
├── Home (/) — app/page.tsx
│   ├── Hero section (home-page-hero.png bg)
│   ├── FeatureBadges (4 badges overlapping hero bottom)
│   ├── QuoteOfTheDay (flip card — Hafez verse)
│   ├── BestSellersSection ×4 (Stones, Candles, Accessories, Clothes)
│   └── CTAButton "✦ VIEW ALL ✦"
│
├── Stones (/shop/stones) — app/shop/stones/page.tsx
│   ├── Fixed background (stones-hero.png + blur)
│   ├── Hero row (crystal star + "Healing Crystals & Stones" + CTA)
│   ├── Glass sidebar (3 trust items)
│   ├── Feature bar (4 items)
│   ├── Product grid (6-column, 6 stones, frosted overlay cards)
│   └── Benefits bar
│
├── Accessories (/shop/accessories) — app/shop/accessories/page.tsx
│   ├── Fixed background (hero-accessories.png)
│   ├── Hero row (title + CTA + glass sidebar)
│   ├── Feature bar (4 items)
│   ├── Product grid (5-column, frosted cards)
│   └── Benefits
│
├── Clothes (/shop/clothes) — app/shop/clothes/page.tsx
│   ├── Fixed background (clothes-hero-bg.png)
│   ├── ShopHero ("Sacred Clothing" + "EXPLORE COLLECTIONS" CTAButton)
│   ├── FeaturesPanel + ProductCards (arch-masked cards) + NotePanel
│   └── ShopBenefits
│
├── Mentorship (/shop/mentorship) — app/shop/mentorship/page.tsx
│   ├── Fixed background (mentorship-bg.png)
│   ├── Hero ("Private Consultation with Fard")
│   ├── 3-column: Quote+badges | Session selector | Journey steps
│   ├── Trust bar
│   └── About section
│
├── Tours (/shop/tours)
│   ├── 3-column upper zone (hero text | sacred emblem | registration form)
│   ├── Featured destinations carousel (4 cards)
│   └── Quote bar
│
├── Blog (/blog)
│   ├── Hero ("Stories for the Soul")
│   ├── 3-column: Latest Articles | Featured Story | Insights + Inspiration
│   └── Newsletter banner
│
├── Cart (/cart)
│   ├── Floating sidebar (nav icons)
│   └── Frosted glass panel with cart items, qty controls, checkout button
│
├── Checkout (/checkout) — 3-step flow
│   ├── Step 1: Shipping address (6 fields)
│   ├── Step 2: Payment (card fields + order summary) → POST /api/orders
│   └── Step 3: Confirmation
│
├── Profile (/profile) — 2-panel dashboard
│   ├── Left: Avatar + nav tabs (6) + quote card
│   └── Right: Orders (with filters/pagination), Sessions, Retreats, Forum, Saved, Settings
│
└── Tahrirye (/tahrirye) — Editorial hub
    ├── Hero ("تحریریه" gold title)
    └── 2×2 card grid (Education, Books, Articles, Poetry)
```

### 3.3 Data Flow

```mermaid
graph TD
    A[mock-data.ts] -->|static import| B[All Pages]
    C[cart-context.tsx] -->|useCart hook| D[Product Cards]
    C -->|useCart hook| E[Cart Page]
    C -->|useCart hook| F[Checkout Page]
    G[wishlist-context.tsx] -->|useWishlist hook| H[Heart Icons]
    G -->|useWishlist hook| I[Profile Wishlist Tab]
    J[auth-context.tsx] -->|useAuth hook| K[Profile Page]
    J -->|useAuth hook| L[Auth Pages]
    D -->|addItem| C
    E -->|removeItem/updateQuantity| C
    F -->|clearCart| C
    F -->|POST| M[/api/orders]
    N[Blog Subscribe] -->|POST| O[/api/newsletter]
    P[Contact Form] -->|POST| Q[/api/contact]
    R[Mentorship Flow] -->|POST| S[/api/mentorship/book]
    T[Tours Enquiry] -->|POST| U[/api/tours/enquiry]
    C -->|persist| V[localStorage - aura-cart-v1]
    G -->|persist| W[localStorage - lumina-wishlist]
    J -->|persist| X[localStorage - aura_user]
    R -->|temp store| Y[sessionStorage]
```

---

## 4. Setup & Installation

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
```bash
git clone <repository-url>
cd fared-frontend
npm install
```

### Environment Variables
No `.env` file is currently required. The project runs entirely on mock data. When a backend is connected, add:
```
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_MEDUSA_URL=https://medusa.example.com
```

### Development
```bash
npm run dev          # Start dev server at localhost:3000
npx tsc --noEmit     # TypeScript type check
npm run build        # Production build
npm run lint         # ESLint
```

### Fonts
Google Fonts loaded via `app/layout.tsx`:
- Playfair Display (display headings)
- Cormorant Garamond (serif body)
- Inter (sans-serif body)
- Vazirmatn (Persian/Farsi)

CSS import in `app/globals.css`:
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Jost:wght@300;400;500;600&display=swap');
```

---

## 5. Key Features

### 5.1 Fixed-Background Pattern
Every page uses a two-layer architecture:
```tsx
// Layer 1 — Fixed background (never scrolls)
<div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
  <Image src="/images/hero-backgrounds/..." fill />
</div>

// Layer 2 — Scrollable content (scrolls over the fixed background)
<div style={{ position: 'relative', zIndex: 1, overflowY: 'auto', height: '100vh' }}>
  {/* page content */}
</div>
```
**Except:** Home page uses hero-only background (hero image in hero section, plain dark gradient below).

### 5.2 Product Cards (6 Variants)
| Card Type | Component | Used By | Design |
|-----------|-----------|---------|--------|
| Crystal Card | `cards/CrystalCard.tsx` | Home FeaturedProducts | Image + glass morphism + wishlist heart |
| Soul Card | `cards/SoulCard.tsx` | Clothes (old) | Full arch SVG mask + clipPath |
| Aura ProductCard | `aura/ProductCards.tsx` | Clothes (new) | Arch mask + gold border SVG + wave divider |
| Frosted Card | inline | Stones/Accessories/Candles | Image fill + frosted text overlay + cart button |
| Tour Card | cards/TourCard.tsx | Tours | Portrait image + gradient overlay + country/name/dates |
| Crystal SVG Card | stones-v2/page.tsx | Stones v2 | Inline SVG crystal illustrations + fixed canvas |

### 5.3 CTAButton Component
**File:** `components/ui/CTAButton.tsx`
- Renders an ornate gem-cut SVG frame (524×98 viewBox) as the button shape
- Gold stroke (`currentColor`) with drop-shadow
- Inline `<style>` for hover/focus/active states
- Sizes: `small` (220px), `default` (320px), `large` (380px), `fullWidth` (100% max 460px)
- Supports `href` (renders as Next.js Link) or `onClick` (renders as button)
- Used on 9+ pages across the site

### 5.4 Cart System
**Context:** `lib/cart-context.tsx`
- `useReducer` + `localStorage` persistence (`aura-cart-v1`)
- Actions: `ADD_ITEM`, `REMOVE_ITEM`, `UPDATE_QUANTITY`, `CLEAR_CART`, `LOAD_CART`
- Item type: `{ id, productId, productType, name, nameFA, price, currency, quantity, image, variant? }`
- Computed: `totalItems`, `totalPrice`
- Toast notifications on add/remove/clear

### 5.5 Wishlist System
**Context:** `lib/wishlist-context.tsx`
- `useState` + `localStorage` persistence (`lumina-wishlist`)
- `toggleWishlist(item)` — adds if not present, removes if already in list
- `isWishlisted(id)` — boolean check
- Used by: FeaturedProducts (CrystalCard hearts), Profile wishlist tab

### 5.6 Authentication (Mock)
**Context:** `lib/auth-context.tsx`
- Demo credentials: `demo@aura.com` / `demo123`
- `login(email, password)`, `register(name, email, phone, password)`, `logout()`
- Persists to localStorage (`aura_user`)
- Redirects unauthenticated users from `/profile` to `/auth`

### 5.7 Mentorship Booking Flow
3-step process using `sessionStorage`:
1. **Select session** (`/shop/mentorship`) → saves to `lumina-selected-session`
2. **Select time** (`/shop/mentorship/select-time`) → reads session, picks date+time, saves to `lumina-booking`
3. **Payment** (`/shop/mentorship/payment`) → shows summary, placeholder card form, `POST /api/mentorship/book`

### 5.8 Checkout Flow
3-step process using local state:
1. **Shipping** — 6 fields (name, email, phone, address, city, postal code)
2. **Payment** — card fields + order summary → `POST /api/orders`
3. **Confirmation** — success message + order summary + CTAButtons

### 5.9 3D Flip Card (Quote of the Day)
`components/home/QuoteOfTheDay.tsx`
- Default: "پیام امروزت رو کشف کن" (front face)
- Click: 3D rotateY(180deg) transition reveals Hafez verse (back face)
- CTAButton appears only when flipped
- `minHeight: 260px` to prevent collapse

### 5.10 RTL / Persian Support
- Root `<html dir="rtl">` with Persian `lang="fa"`
- English pages (blog, about, cart) override with `dir="ltr"` locally
- Font families: `font-farsi` (Vazirmatn), `font-display` (Playfair Display), `font-body` (Inter)
- Pseudo-element arrow directions adjusted for RTL context

---

## 6. API Endpoints

All API routes are stubs — they accept requests and return mock responses. No database connection exists yet.

| Route | Method | Purpose | Input | Response |
|-------|--------|---------|-------|----------|
| `/api/newsletter` | POST | Blog newsletter subscribe | `{ email }` | `{ success, email }` |
| `/api/contact` | POST | Contact form submit | `{ name, email, subject, message }` | `{ success }` |
| `/api/orders` | POST | Checkout place order | `{ items, total, address }` | `{ success, order }` |
| `/api/mentorship/book` | POST | Mentorship booking | `{ session, date, time }` | `{ success, booking }` |
| `/api/tours/enquiry` | POST | Tour registration | `{ name, email, retreat, date }` | `{ success }` |
| `/api/users/me` | GET/PUT | Profile fetch/update | `{ nameFA, email, phone }` | `{ data }` |
| `/api/users/me/addresses` | GET/POST/DELETE | Address CRUD | `{ label, line1, city }` | `{ data }` |
| `/api/notifications` | GET | User notifications | — | `{ data: [] }` |
| `/api/forum/posts` | GET | User forum posts | — | `{ data: [] }` |

---

## 7. Database Schema

**None.** All data is from `lib/mock-data.ts`. Below are the mock data types:

```typescript
// Products
Stone        { id, slug, name, nameFA, price, image, origin, hardness, chakra, healingProperties, healingBenefitsFA, ... }
Candle       { id, name, nameFA, slug, price, image, scentFA, burnTimeFA, crystalKeywords, ... }
Accessory    { id, slug, name, nameFA, price, image, material, materialFA, descriptionFA, accentColor }
Product      { id, slug, name, nameFA, price, sizes, colors[], material, materialFA, accentColor } // Clothes
ClothingItem { id, name, nameFA, slug, price, image, images[], colors[] } // Clothes v2
Course       { id, slug, titleFA, descriptionFA, price, level, instructor, curriculum[], ... }
Tour         { id, slug, titleFA, descriptionFA, itinerary, includes[], ... }
Mentor       { id, slug, name, nameFA, specialty, rating, image, ... }

// Content
Book         { id, slug, titleFA, authorFA, descriptionFA, coverImage, rating, ... }
Poem         { id, slug, titleFA, poetFA, era, linesFA, category, ... }
Article      { id, slug, titleFA, excerptFA, content, image, author, ... }

// User
AuthUser     { id, name, nameFA, email, phone, avatar }
WishlistItem { id, name, price, image }
UserProfile  { id, nameFA, email, phone, avatar, joinedAt }
Order        { id, userId, items[], total, status, date, address }
Address      { id, userId, label, line1, city, province, zip }
```

**MOCK arrays:** `MOCK_STONES` (6), `MOCK_CANDLES` (5), `MOCK_ACCESSORIES` (10), `CLOTHES_PRODUCTS` (3), `MOCK_CLOTHES` (8), `MOCK_COURSES` (5), `MOCK_TOURS` (4), `MOCK_MENTORS` (3), `MOCK_BOOKS` (6), `MOCK_POEMS` (9), `MOCK_ARTICLES` (4)

---

## 8. Configuration

### next.config.ts
```typescript
{
  images: {
    remotePatterns: [
      { hostname: "res.cloudinary.com" },
      { hostname: "images.unsplash.com" },
      { hostname: "placehold.co" },
    ],
  },
  async redirects() {
    return [
      { source: '/tahririye/:path*', destination: '/tahrirye/:path*', permanent: true },
      { source: '/editorial/:path*', destination: '/tahrirye/:path*', permanent: true },
    ]
  },
}
```

### tailwind.config.ts
```typescript
{
  theme: {
    extend: {
      colors: {
        chakra: { root, sacral, solar, heart, throat, third, crown },
        cosmic: { dark, indigo, gold, 'gold-deep', 'gold-light', sand },
        teal: { glass },
        card: { bg },
        crystal: { blue },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        farsi: ['Vazirmatn', 'sans-serif'],
        serif: ['"Cormorant Garamond"', 'serif'],
        sans: ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-rtl')],
}
```

### CSS Variables (globals.css)
```css
:root {
  /* Chakra colors */
  --chakra-root, --chakra-sacral, --chakra-solar, --chakra-heart, 
  --chakra-throat, --chakra-third, --chakra-crown

  /* Cosmic */
  --cosmic-dark, --deep-indigo, --card-glass, --card-border

  /* Gold */
  --gold-accent: #fecb7d, --gold-deep: #c9a84c, --gold-light: #e8c97a

  /* Aura Veda tokens */
  --avad-gold, --avad-gold-bright, --avad-cream, --avad-text-dim,
  --avad-stage, --avad-viewport, --avad-serif, --avad-sans

  /* Text */
  --text-primary: #f0ebe3, --text-secondary: #b8aead, --text-muted
}
```

---

## 9. Testing

**No tests exist yet.** The project uses `npx tsc --noEmit` as the primary quality gate. ESLint is configured via `eslint-config-next`.

To add tests:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

---

## 10. Deployment

### Build
```bash
npm run build    # Outputs to .next/
npm start        # Serves production build
```

### Deployment target: Vercel
- Connect GitHub repository
- Framework preset: Next.js
- Build command: `next build`
- Output directory: `.next`
- No environment variables currently required

### Image handling
- All images are local PNGs (1.7-2.7MB each)
- Images use `unoptimized` prop to bypass Next.js Image Optimization (400 errors with large files)
- **TODO:** Implement proper image pipeline (Cloudinary, imgix, or sharp)

---

## 11. Known Issues & TODOs

### Critical
- [ ] **Zero real API integration** — all data is hardcoded mock data
- [ ] **No payment gateway** — checkout form is placeholder only
- [ ] **No real authentication** — demo credentials only (`demo@aura.com` / `demo123`)
- [ ] **Image pipeline broken** — large PNGs require `unoptimized` prop; 400 errors without it
- [ ] **No error boundaries** — unhandled React errors will crash pages

### High Priority
- [ ] Connect to backend API (replace mock-data.ts)
- [ ] Implement real payment processing
- [ ] Add proper image CDN/optimization
- [ ] Add SEO metadata to all pages
- [ ] Add loading skeletons for data fetching
- [ ] Fix `react-hot-toast` TypeScript type (currently using `any` workaround)

### Medium Priority
- [ ] Complete mobile layouts for all pages
- [ ] Add search functionality
- [ ] Implement proper i18n routing (currently mixed EN/FA)
- [ ] Add analytics (page views, cart events)
- [ ] Profile tabs: Sessions, Retreats, Forum, Saved still show placeholder content
- [ ] Courses page lacks desktop product cards

### Low Priority
- [ ] Remove `app/shop/stones-v2/` (duplicate)
- [ ] Remove `app/editorial/` (redirected to /tahrirye)
- [ ] Remove `app/tahririye/` (old editorial — detail pages still referenced by /tahrirye cards)
- [ ] Clean up unused components (AddToCartButton, old Button variants)
- [ ] Add Storybook for component documentation

---

## 12. Contributing Guide

### Code Style
- **TypeScript strict** — no `any` types, `npx tsc --noEmit` must pass before commit
- **Inline styles preferred** — most pages use inline `style={{}}` objects rather than Tailwind classes for precise positioning
- **No `<form>` tags** — use `useState` + `onClick`/`onChange` instead
- **Mobile-first** — base classes for mobile, `md:`/`lg:` for desktop enhancements
- **Default language is Persian** — all new UI text in Farsi unless explicitly English
- **No hardcoded hex colors** — use CSS variables or design tokens

### Component Patterns
1. **Fixed-background pattern** for all new pages:
   ```tsx
   <>
     <div style={{ position: 'fixed', inset: 0, zIndex: 0 }}>{/* bg image */}</div>
     <div style={{ position: 'relative', zIndex: 1 }}>{/* scrollable content */}</div>
   </>
   ```

2. **CTAButton** for all primary CTAs:
   ```tsx
   import CTAButton from '@/components/ui/CTAButton'
   <CTAButton href="/shop" size="large">EXPLORE COLLECTION ✦</CTAButton>
   ```

3. **useCart** for cart operations:
   ```tsx
   import { useCart } from '@/lib/cart-context'
   const { addItem, items, totalPrice } = useCart()
   ```

4. **Toast notifications** for user actions:
   ```tsx
   import toast from 'react-hot-toast'
   toast.success('Added to cart ✦')
   ```

### PR Process
1. Create feature branch from `main`
2. Implement changes following patterns above
3. Run `npx tsc --noEmit` — fix all errors
4. Verify visually on desktop (1440px) + mobile (375px)
5. Do NOT modify files outside the scope of the task (Sprint Rule 4)
6. Commit with descriptive message

### Adding a New Shop Category Page
1. Copy pattern from `app/shop/stones/page.tsx` (the latest production pattern)
2. Replace mock data references, colors, and hero image
3. Add mobile layout section
4. Wire cart buttons with `useCart().addItem()`
5. Add route to `DynamicHeader.tsx` navigation
6. Create product detail page at `app/shop/[category]/[id]/page.tsx` using `ProductDetailView`

---

## Appendix A: Design Tokens Quick Reference

| Token | Value | Usage |
|-------|-------|-------|
| `--gold-accent` | `#fecb7d` | Gold highlights, borders, accents |
| `--gold-deep` | `#c9a84c` | Darker gold |
| `--chakra-crown` | `#9b59b6` | Purple/crown chakra |
| `--text-primary` | `#f0ebe3` | Primary text on dark bg |
| `--text-secondary` | `#b8aead` | Secondary text |
| `--text-muted` | `rgba(180,200,220,0.7)` | Muted/tertiary text |
| `#d4af64` | Gold (Lumina brand) | Mentorship, about, tours pages |
| `#f5d87a` | Bright gold (Lumina Crystals) | Stones page, CTAButton |
| `#c8b27e` | Gold (Mystic Earth) | Accessories page |
| `--avad-gold` | `#d8b36a` | Aura Veda gold | Clothes page |
| `--avad-cream` | `#f6ecd6` | Aura Veda cream | Clothes page info panels |

## Appendix B: Route Map

| Route | Page | Desktop Pattern |
|-------|------|----------------|
| `/` | Home | Hero bg + dark gradient below |
| `/shop/stones` | Stones | Fixed bg + scrollable |
| `/shop/candles` | Candles | Fixed bg + scrollable |
| `/shop/accessories` | Accessories | Fixed bg + scrollable |
| `/shop/clothes` | Clothes (Aura Veda) | Fixed bg + scrollable |
| `/shop/courses` | Courses | Basic (mobile-only) |
| `/shop/tours` | Tours | Fixed bg + scrollable (3-col) |
| `/shop/mentorship` | Mentorship | Fixed bg + scrollable (3-col) |
| `/tahrirye` | Editorial Hub | Fixed bg (CSS gradient) |
| `/blog` | Blog | Fixed bg + scrollable (3-col) |
| `/cart` | Cart | Fixed bg + floating panel |
| `/checkout` | Checkout | Fixed bg + 3-step flow |
| `/profile` | Profile | Fixed bg + 2-panel dashboard |
| `/about` | About | Fixed bg + grid layout |
| `/auth` | Auth | Standard form |
| `/contact` | Contact | Standard form |
