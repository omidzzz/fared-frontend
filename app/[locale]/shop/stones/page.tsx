"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ShopHero from "@/components/aura/ShopHero";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { useCart } from "@/hooks/useCart";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { useQuery } from "@tanstack/react-query";
import { getStones } from "@/lib/api";
import ProductGrid from "@/components/shop/ProductGrid";
import CrystalCard from "@/components/ui/CrystalCard";

/* ── Design tokens ── */
const GOLD = "#f5d87a";
const CREAM = "#ffffff";
const TEXT_DIM = "rgba(255,255,255,0.75)";

// Filter keys that match the translation keys in fa.json
const FILTER_KEYS = [
  "stones.filters.all",
  "stones.filters.protection",
  "stones.filters.love",
  "stones.filters.abundance",
  "stones.filters.healing",
  "stones.filters.manifestation",
  "stones.filters.clarity",
];

// Map filter keys to the English values used for filtering logic
const FILTER_MAP: Record<string, string> = {
  "stones.filters.all": "ALL STONES",
  "stones.filters.protection": "PROTECTION",
  "stones.filters.love": "LOVE",
  "stones.filters.abundance": "ABUNDANCE",
  "stones.filters.healing": "HEALING",
  "stones.filters.manifestation": "MANIFESTATION",
  "stones.filters.clarity": "CLARITY",
};

// Reverse map for getting the key from the value
const FILTER_REVERSE_MAP: Record<string, string> = {
  "ALL STONES": "stones.filters.all",
  PROTECTION: "stones.filters.protection",
  LOVE: "stones.filters.love",
  ABUNDANCE: "stones.filters.abundance",
  HEALING: "stones.filters.healing",
  MANIFESTATION: "stones.filters.manifestation",
  CLARITY: "stones.filters.clarity",
};

/* ── Animations ── */
const fadeSlideUp: React.CSSProperties = {
  animation: "fadeSlideUp 0.5s ease backwards",
};

/* ── Mobile filter sheet ── */

function MobileFilterBar({
  activeFilter,
  onOpen,
  t,
}: {
  activeFilter: string;
  onOpen: () => void;
  t: (key: string) => string;
}) {
  // Get the display label for the active filter
  const activeFilterKey =
    FILTER_REVERSE_MAP[activeFilter] || "stones.filters.all";
  const activeLabel = t(activeFilterKey);

  return (
    <button
      onClick={onOpen}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 20px",
        borderRadius: "100px",
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(212,175,100,0.3)",
        color: "#fff",
        fontSize: "0.85rem",
        margin: "0 16px 16px",
        width: "calc(100% - 32px)",
        minHeight: 44,
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      ⚙ {t("stones.filterTitle")}{" "}
      {activeFilter !== "ALL STONES" && ` · ${activeLabel}`}
    </button>
  );
}

function FilterBottomSheet({
  isOpen,
  onClose,
  activeFilter,
  onSelect,
  t,
}: {
  isOpen: boolean;
  onClose: () => void;
  activeFilter: string;
  onSelect: (f: string) => void;
  t: (key: string) => string;
}) {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 200,
          background: "rgba(0,0,0,0.6)",
          backdropFilter: "blur(4px)",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 201,
          background: "rgba(15, 8, 40, 0.97)",
          backdropFilter: "blur(20px)",
          borderRadius: "24px 24px 0 0",
          border: "1px solid rgba(212,175,100,0.2)",
          padding: "12px 20px 32px",
          maxHeight: "70vh",
          overflowY: "auto",
          animation: "slideUp 0.3s ease",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "4px",
            borderRadius: "100px",
            background: "rgba(255,255,255,0.25)",
            margin: "0 auto 20px",
          }}
        />
        <h3
          style={{
            color: "#fff",
            fontSize: "1.1rem",
            marginBottom: "16px",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {t("stones.filterTitle")}
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {FILTER_KEYS.map((key) => {
            const filterValue = FILTER_MAP[key];
            const isActive = activeFilter === filterValue;
            const label = t(key);

            return (
              <button
                key={key}
                onClick={() => {
                  onSelect(filterValue);
                  onClose();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "16px 20px",
                  borderRadius: "14px",
                  minHeight: "52px",
                  background: isActive
                    ? "rgba(212,175,100,0.15)"
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? "1px solid rgba(212,175,100,0.5)"
                    : "1px solid rgba(255,255,255,0.08)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.7)",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                }}
              >
                {label}
                {isActive && <span style={{ color: "#d4af64" }}>✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

/* ── Filter function for stones ── */
const stoneFilter = (activeFilter: string) => (stone: any) => {
  if (activeFilter === "ALL STONES") return true;

  const properties = (stone.tagsEN || []).map((p: string) => p.toUpperCase());
  if (activeFilter === "PROTECTION")
    return properties.some(
      (p: string) =>
        p.includes("PROTECTION") ||
        p.includes("SHIELD") ||
        p.includes("GROUNDING"),
    );
  if (activeFilter === "LOVE")
    return properties.some(
      (p: string) =>
        p.includes("LOVE") ||
        p.includes("COMPASSION") ||
        p.includes("HEART"),
    );
  if (activeFilter === "ABUNDANCE")
    return properties.some(
      (p: string) =>
        p.includes("ABUNDANCE") ||
        p.includes("JOY") ||
        p.includes("CONFIDENCE"),
    );
  if (activeFilter === "HEALING")
    return properties.some(
      (p: string) =>
        p.includes("HEALING") ||
        p.includes("BALANCE") ||
        p.includes("CLEANSING"),
    );
  if (activeFilter === "MANIFESTATION")
    return properties.some(
      (p: string) =>
        p.includes("MANIFESTATION") ||
        p.includes("MAGIC") ||
        p.includes("TRANSFORMATION"),
    );
  if (activeFilter === "CLARITY")
    return properties.some(
      (p: string) =>
        p.includes("CLARITY") ||
        p.includes("AMPLIFY") ||
        p.includes("INTUITION"),
    );
  return true;
};

/* ── Page ── */

export default function StonesPage() {
  const [activeFilter, setActiveFilter] = useState("ALL STONES");
  const [sheetOpen, setSheetOpen] = useState(false);
  const { totalItems } = useCart();
  const t = useTranslations();
  const { isRTL } = useLocale();

  // Fetch all stones products using the correct /api/stones endpoint
  const { data: stonesData, isLoading: featuredLoading } = useQuery({
    queryKey: ["stones"],
    queryFn: () => getStones(),
    staleTime: 30000,
  });

  const allProducts = stonesData || [];
  const featuredProducts = allProducts.filter(
    (product: any) => product.isFeatured === true,
  );

  // Map API product to CrystalCard-compatible format
  const mapToStone = (product: any) => ({
    id: product.id,
    slug: product.slug || product.id,
    name: product.nameEN || product.name || "Crystal",
    nameFA: product.nameFA || product.name || "سنگ",
    origin: product.origin || "",
    originFA: product.originFA || "",
    hardness: product.hardness || "",
    chakra: product.chakra || "",
    chakraFA: product.chakraFA || "",
    properties: product.tagsEN || [],
    propertiesFA: product.tagsFA || [],
    healingProperties: product.tagsEN || [],
    healingBenefitsFA: [],
    howToCleanseFA: "",
    price: product.price || 0,
    image: product.images?.[0]?.url || product.image || "",
    accentColor: "var(--chakra-solar)",
  });

  // Render function for carousel using CrystalCard
  const renderProduct = (product: any, index: number) => {
    const stone = mapToStone(product);
    return (
      <Link
        key={product.id}
        href={`/shop/stones/${product.slug || product.id}`}
        className="flex justify-center transition-opacity hover:opacity-90"
      >
        <div style={{ maxWidth: 250, width: "100%" }}>
          <CrystalCard stone={stone} />
        </div>
      </Link>
    );
  };

  // Render function for ProductGrid using CrystalCard
  const renderCrystalCard = (
    product: any,
    onAddToCart: (id: string) => void,
  ) => {
    const stone = mapToStone(product);
    return (
      <Link
        key={product.id}
        href={`/shop/stones/${product.slug || product.id}`}
        className="block transition-opacity hover:opacity-90"
      >
        <div style={{ maxWidth: 300, margin: "0 auto" }}>
          <CrystalCard stone={stone} />
        </div>
      </Link>
    );
  };

  return (
    <main className="min-h-screen stones-page" dir={isRTL ? "rtl" : "ltr"}>
      {/* ── MOBILE ── */}
      <div
        className="lg:hidden flex flex-col min-h-screen"
        style={{ background: "#1a0d3d" }}
      >
        {/* Fixed Background - MOBILE */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 0,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                'url("/images/hero-backgrounds/stones-hero.webp")',
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
          {/* Mobile overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `
                linear-gradient(180deg,
                  rgba(26,13,61,0.5) 0%,
                  rgba(26,13,61,0.2) 35%,
                  rgba(26,13,61,0.7) 100%),
                linear-gradient(90deg,
                  rgba(26,13,61,0.3) 0%,
                  transparent 20%,
                  transparent 80%,
                  rgba(26,13,61,0.3) 100%)
              `,
            }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "120px 20px 48px",
            gap: 24,
            flex: 1,
          }}
        >
          {/* Hero */}
          <ShopHero namespace="stones" fullWidth={true} />

          {/* Featured Products Carousel */}
          {featuredProducts.length > 0 && (
            <div className="w-full max-w-4xl">
              <h2
                className="text-center text-[#F5D79C] font-serif text-xl md:text-2xl mb-4"
                style={{
                  fontFamily: "var(--avad-serif)",
                  textShadow: "0 2px 20px rgba(212,175,100,0.15)",
                  letterSpacing: "0.05em",
                }}
              >
                {t("stones.featuredTitle") || "✨ Featured Collection"}
              </h2>

              {featuredLoading ? (
                <div className="flex flex-wrap justify-center gap-4 w-full max-w-2xl mx-auto">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse"
                      style={{
                        width: "clamp(130px, 42vw, 260px)",
                        height: "clamp(240px, 75vw, 460px)",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <ResponsiveCarousel
                  items={featuredProducts}
                  renderItem={renderProduct}
                  tabletItemsPerSlide={2}
                  desktopItemsPerSlide={4}
                  autoplayMs={3500}
                  className="w-full max-w-2xl mx-auto"
                />
              )}
            </div>
          )}

          {/* Filter */}
          <MobileFilterBar
            activeFilter={activeFilter}
            onOpen={() => setSheetOpen(true)}
            t={t}
          />
          <FilterBottomSheet
            isOpen={sheetOpen}
            onClose={() => setSheetOpen(false)}
            activeFilter={activeFilter}
            onSelect={setActiveFilter}
            t={t}
          />

          {/* Product Grid - Mobile */}
          <div className="w-full max-w-4xl">
            <h2
              className="font-display text-xl text-[var(--text-primary)] mb-6"
              style={{ color: CREAM }}
            >
              {t("stones.products")}
            </h2>
            <ProductGrid
              key={activeFilter}
              category="stones"
              itemsPerPage={12}
              renderCard={renderCrystalCard}
              cols={{ mobile: 2, tablet: 2, desktop: 3 }}
              gap="gap-4"
              loadMore={true}
              loadMoreLabel={t("stones.loadMore") || "Load More"}
              loadingLabel={t("stones.loadingMore") || "Loading..."}
              noMoreLabel={t("stones.noMoreProducts") || "No more products"}
              emptyMessage={t("stones.noProducts") || "No stones found"}
              filter={stoneFilter(activeFilter)}
              filterParams={activeFilter !== "ALL STONES" ? { property: activeFilter.toLowerCase() } : undefined}
            />
          </div>
        </div>

        {/* Footer - Stuck to bottom */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            width: "100%",
            marginTop: "auto",
          }}
        />
      </div>

      {/* ── DESKTOP ── */}
      <div
        className="hidden lg:block"
        style={{
          position: "relative",
          minHeight: "100vh",
          background: "#1a0d3d",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* Fixed background */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-backgrounds/stones-hero.webp"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            priority
            className="object-cover object-center"
            style={{ filter: "blur(3px)" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(ellipse at 50% 40%, rgba(10,5,30,0.15) 0%, transparent 55%), linear-gradient(180deg, rgba(26,13,61,0.35) 0%, transparent 30%, transparent 65%, rgba(26,13,61,0.8) 100%)",
            }}
          />
          {/* Aurora arc */}
          <svg
            style={{
              position: "absolute",
              left: 0,
              top: "20%",
              width: "100%",
              height: "45%",
              opacity: 0.3,
            }}
            viewBox="0 0 1920 400"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="aur" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#9b59b6" stopOpacity="0.8" />
                <stop offset="25%" stopColor="#1565c0" stopOpacity="0.7" />
                <stop offset="50%" stopColor="#00bcd4" stopOpacity="0.6" />
                <stop offset="75%" stopColor="#66bb6a" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f5d87a" stopOpacity="0.4" />
              </linearGradient>
            </defs>
            <path
              d="M0 300 Q480 40 960 140 Q1440 240 1920 70 L1920 400 L0 400 Z"
              fill="url(#aur)"
            />
          </svg>
          {/* Sparkle dots */}
          {[
            [150, 120],
            [580, 80],
            [920, 180],
            [1400, 90],
            [1700, 150],
            [300, 280],
            [750, 310],
            [1100, 250],
            [1550, 290],
            [1800, 200],
          ].map(([x, y], i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                left: x,
                top: y,
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: CREAM,
                boxShadow:
                  "0 0 6px rgba(255,255,255,0.5), 0 0 14px rgba(255,215,100,0.3)",
                opacity: 0.4 + (i % 3) * 0.15,
                animation: "pulse 3s ease-in-out infinite",
                animationDelay: `${i * 0.4}s`,
              }}
            />
          ))}
        </div>

        {/* Scrollable content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* ── HERO ── */}
          <section
            style={{
              minHeight: "55vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "100px 40px 60px",
              position: "relative",
            }}
          >
            {/* Mystic circles */}
            <div
              style={{
                position: "absolute",
                left: isRTL ? "auto" : "4vw",
                right: isRTL ? "4vw" : "auto",
                top: "25%",
                width: 130,
                height: 130,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
                animation: "spinSlow 60s linear infinite",
              }}
            >
              <svg
                viewBox="0 0 40 40"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.8"
                width={36}
                height={36}
              >
                <path
                  d="M20 5C12 18 12 25 20 38C28 25 28 18 20 5Z"
                  opacity="0.5"
                />
                <circle cx="20" cy="18" r="6" />
              </svg>
            </div>
            <div
              style={{
                position: "absolute",
                left: isRTL ? "4vw" : "auto",
                right: isRTL ? "auto" : "4vw",
                top: "25%",
                width: 130,
                height: 130,
                borderRadius: "50%",
                border: "1px solid rgba(255,255,255,0.25)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0.7,
                animation: "spinSlow 60s linear infinite reverse",
              }}
            >
              <svg
                viewBox="0 0 40 40"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="0.8"
                width={36}
                height={36}
              >
                <path d="M20 5L28 18L20 38L12 18Z" />
                <path d="M12 18h16" opacity="0.5" />
                <path d="M20 5v13" opacity="0.5" />
              </svg>
            </div>

            {/* Star icon */}
            <div
              className="hero-el"
              style={{
                ...fadeSlideUp,
                animationDelay: "0ms",
              }}
            >
              <svg
                width={22}
                height={22}
                viewBox="0 0 24 24"
                fill="none"
                stroke={GOLD}
                strokeWidth="1.2"
                style={{ animation: "pulse 2s ease-in-out infinite" }}
              >
                <path d="M12 2l3 7h7l-5.5 4 2.1 7L12 15.6 5.4 20l2.1-7L2 9h7z" />
              </svg>
            </div>

            {/* Eyebrow */}
            <p
              className="hero-el"
              style={{
                ...fadeSlideUp,
                animationDelay: "100ms",
                fontFamily: "Inter, sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.7)",
                marginTop: 12,
                textAlign: isRTL ? "right" : "center",
              }}
            >
              {t("stones.discover")}
            </p>

            {/* Headline */}
            <h1
              className="hero-el"
              style={{
                ...fadeSlideUp,
                animationDelay: "200ms",
                fontFamily: "'Playfair Display',Georgia,serif",
                fontSize: "clamp(3rem, 7vw, 6rem)",
                fontWeight: 400,
                color: CREAM,
                letterSpacing: "0.08em",
                marginTop: 4,
                marginBottom: 0,
                textAlign: isRTL ? "right" : "center",
              }}
            >
              {t("stones.title")}
            </h1>

            {/* Divider */}
            <div
              className="hero-el"
              style={{
                ...fadeSlideUp,
                animationDelay: "350ms",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                margin: "16px 0",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 120,
                  borderTop: "1px solid rgba(255,215,100,0.4)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    color: GOLD,
                  }}
                >
                  <svg
                    width={14}
                    height={20}
                    viewBox="0 0 14 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  >
                    <path d="M7 2 12 10l-5 8-5-8 5-8Z" />
                    <path d="M2 10h10" opacity="0.6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Subtitle */}
            <p
              className="hero-el"
              style={{
                ...fadeSlideUp,
                animationDelay: "450ms",
                fontSize: "1rem",
                color: TEXT_DIM,
                maxWidth: 560,
                textAlign: isRTL ? "right" : "center",
                lineHeight: 1.7,
                marginTop: 12,
              }}
            >
              {t("stones.subtitle")}
            </p>

          </section>

          {/* ── FEATURED PRODUCTS CAROUSEL ── */}
          {featuredProducts.length > 0 && (
            <section
              style={{
                position: "relative",
                zIndex: 2,
                marginBottom: 40,
              }}
            >
              <h2
                style={{
                  fontFamily: '"Playfair Display", serif',
                  fontWeight: 500,
                  color: CREAM,
                  fontSize: 38,
                  textShadow: "0 2px 14px rgba(0,0,0,.6)",
                  margin: 0,
                  marginBottom: 20,
                  textAlign: "center",
                }}
              >
                {t("stones.featuredTitle") || "✨ Featured Collection"}
              </h2>

              {featuredLoading ? (
                <div className="flex flex-wrap justify-center gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="animate-pulse"
                      style={{
                        width: "clamp(130px, 42vw, 260px)",
                        height: "clamp(240px, 75vw, 460px)",
                        background: "rgba(255,255,255,0.05)",
                        borderRadius: "8px",
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="max-w-6xl mx-auto">
                  <ResponsiveCarousel
                    items={featuredProducts}
                    renderItem={renderProduct}
                    tabletItemsPerSlide={2}
                    desktopItemsPerSlide={4}
                    autoplayMs={3500}
                    className="w-full"
                  />
                </div>
              )}
            </section>
          )}

          {/* ── FILTER BAR ── */}
          <div
            style={{
              background: "rgba(15,5,40,0.6)",
              borderRadius: 12,
              padding: "14px 24px",
              margin: "0 clamp(40px, 5vw, 100px) 32px",
              backdropFilter: "blur(8px)",
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {FILTER_KEYS.map((key) => {
              const filterValue = FILTER_MAP[key];
              const isActive = activeFilter === filterValue;
              const label = t(key);

              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filterValue)}
                  style={{
                    border: `1px solid ${
                      isActive
                        ? "rgba(255,215,100,0.8)"
                        : "rgba(255,215,100,0.35)"
                    }`,
                    borderRadius: 100,
                    padding: "6px 20px",
                    fontSize: "0.72rem",
                    letterSpacing: "0.12em",
                    color: isActive ? CREAM : "rgba(255,255,255,0.7)",
                    background: isActive
                      ? "rgba(255,215,100,0.15)"
                      : "transparent",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* ── PRODUCT GRID ── */}
          <div style={{ position: "relative", zIndex: 2, paddingBottom: "24px", maxWidth: "1440px", margin: "0 auto" }}>
            <ProductGrid
              key={activeFilter}
              category="stones"
              itemsPerPage={12}
              renderCard={renderCrystalCard}
              cols={{ mobile: 2, tablet: 3, desktop: 3 }}
              gap="gap-4"
              loadMore={true}
              loadMoreLabel={t("stones.loadMore") || "Load More"}
              loadingLabel={t("stones.loadingMore") || "Loading..."}
              noMoreLabel={t("stones.noMoreProducts") || "No more products"}
              emptyMessage={t("stones.noProducts") || "No stones found"}
              filter={stoneFilter(activeFilter)}
              filterParams={activeFilter !== "ALL STONES" ? { property: activeFilter.toLowerCase() } : undefined}
            />
          </div>
        </div>
      </div>

      {/* Floating cart button — mobile only */}
      <Link
        href="/cart"
        className="lg:hidden"
        style={{
          position: "fixed",
          bottom: "20px",
          right: isRTL ? "auto" : "20px",
          left: isRTL ? "20px" : "auto",
          zIndex: 150,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #c8a24a, #e8c96a 50%, #c8a24a)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(200,162,74,0.5)",
          textDecoration: "none",
        }}
      >
        <span style={{ fontSize: "1.3rem" }}>🛍</span>
        {totalItems > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              background: "#f5a623",
              color: "#fff",
              fontSize: "0.7rem",
              fontWeight: 700,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {totalItems > 9 ? "9+" : totalItems}
          </span>
        )}
      </Link>

      {/* Global keyframes + mobile responsive */}
      <style jsx global>{`
        @keyframes fadeSlideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.9;
            transform: scale(0.95);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .hero-el {
          animation-fill-mode: backwards;
        }

        /* Mobile: force 2 columns at ALL phone sizes */
        @media (max-width: 1024px) {
          .stones-mobile-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 40px 10px !important;
          }

          /* Ensure button stays usable on mobile (touch target) */
          .crystal-card-cart-btn {
            min-width: 28px !important;
            min-height: 28px !important;
          }

          /* Ensure price stays visible */
          .crystal-card-price {
            color: #d4af64 !important;
            position: relative !important;
            z-index: 5 !important;
            opacity: 1 !important;
          }
        }

        @media (max-width: 1199px) {
          .card-entrance {
            width: 100% !important;
            min-width: 100% !important;
          }
        }

        @media (max-width: 768px) {
          .stones-page button,
          .stones-page a,
          .stones-page input,
          .stones-page select {
            min-height: 44px;
            min-width: 44px;
          }
          .stones-page input,
          .stones-page select {
            font-size: 16px !important;
          }
        }
      `}</style>
    </main>
  );
}
