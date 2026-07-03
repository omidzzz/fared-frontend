# Fared Frontend — Homepage Responsiveness Changes

## Date
2026-06-26

## Summary
Unified the desktop-only and mobile-only layouts into a single fully responsive homepage (`app/page.tsx`). The previous code had two completely separate render paths (`hidden lg:block` for desktop, `block lg:hidden` for mobile), with the mobile path showing only a minimal hero and no other content.

## Files Modified

### `app/page.tsx`
- **Removed** the desktop/mobile split pattern (`hidden lg:block` / `block lg:hidden`).
- **Hero section** — converted from fixed-styles to responsive grid layout:
  - Desktop: side-by-side layout (text left, image right) 
  - Mobile/Tablet: stacked layout (image on top, text below)
  - Uses `lg:grid-cols-2` / `grid-cols-1` pattern.
- **Feature badges** — converted from 4-column grid to responsive:
  - Desktop: 4 columns
  - Tablet: 2×2 grid
  - Mobile: 2×2 grid with smaller padding
  - Uses `lg:grid-cols-4 grid-cols-2` pattern.
- **Quote of the Day** — added responsive padding and sizing.
- **Product sections** — the `BestSellersSection` already had responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`), kept as-is.
- **Footer** — already responsive via Tailwind classes, kept as-is.
- Removed duplicate mobile-only hero code since the unified hero handles all breakpoints.

### `components/home/FeatureBadges.tsx`
- Grid changed from hardcoded `gridTemplateColumns: 'repeat(4, 1fr)'` to Tailwind responsive classes `lg:grid-cols-4 grid-cols-2`.
- Removed the `borderRight` divider logic (which was keyed to index 0-2 for 4 cols) — replaced with CSS-based grid-cell border approach defined in `globals.css`.
- Adjusted padding/spacing for mobile sizes.

### `components/home/QuoteOfTheDay.tsx`
- Added responsive max-width: `max-w-[90%] lg:max-w-[700px]`.
- Reduced padding on mobile: `px-4 lg:px-10`.
- Font sizes scale down on small screens.

### `components/ui/CTAButton.tsx`
- No changes needed — already supports responsive widths.

### `components/layout/Footer.tsx`
- No changes needed — already responsive.

### `app/globals.css`
- Added `.feature-grid-cell` responsive border styles for the new 2-col grid approach:
  - Mobile (≤1024px): bottom border on top 2 cells, right border on the 2nd and 4th cells (RTL aware).
  - Desktop (>1024px): right border on first 3 cells only.

### Fix after first feedback
- **CTA button center on mobile**: Added `items-center lg:items-start` to the hero text container to center the "اکنون کشف کن" button on mobile while keeping it left-aligned on desktop.

### Fix after second feedback — duplicate hero images on mobile
- **Removed the separate mobile `<Image>` block** that was visible via `lg:hidden` class. The CSS `backgroundImage` on the `<section>` already renders the hero image on all screen sizes. The extra `<Image>` component (with `HeroShimmer`) created a double-image overlay on mobile.
- Cleaned up unused imports (`Image`, `HeroShimmer`).

## Testing Notes
- Test on mobile (375px+), tablet (768px+), and desktop (1024px+).
- Verify RTL rendering is correct at all breakpoints.
- Verify product cards render at 1-col (mobile), 2-col (tablet), 4-col (desktop).
