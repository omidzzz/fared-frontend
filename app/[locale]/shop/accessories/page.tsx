"use client";

import Image from "next/image";
import Link from "next/link";
import MobileCategoryCard from "@/components/ui/MobileCategoryCard";
import { MOCK_ACCESSORIES } from "@/lib/mock-data";
import AccessoryCard from "@/components/ui/AccessoryCard";
import { AccessorySidebarPanel } from "@/components/aura/ShopSidePanels";
import ShopHero from "@/components/aura/ShopHero";
import { ResponsiveCarousel } from "@/components/ui/ResponsiveCarousel";
import { useCart } from "@/hooks/useCart";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { useProducts } from "@/hooks/useProducts";
import ProductGrid from "@/components/shop/ProductGrid";

/* ---- Design tokens from Mystic Earth ---- */
const TEAL_GLOW = "#7fdccb";
const CREAM = "#f3eee2";
const TEXT_DIM = "#bcc8c2";
const PANEL_STRONG = "rgba(8,26,27,0.62)";
const DARK_BG = "#05100f";

export default function AccessoriesPage() {
  const { totalItems, addItem } = useCart();
  const t = useTranslations("accessories");
  const { isRTL } = useLocale();

  // Fetch featured products for carousel
  const { data: featuredData, isLoading: featuredLoading } = useProducts({
    category: "accessories",
    limit: 10,
    offset: 0,
  });

  const allProducts = featuredData?.products || [];
  const featuredProducts = allProducts.filter(
    (product: any) => product.isFeatured === true,
  );

  // Map API product to AccessoryCard-compatible format
  const mapToAccessory = (product: any) => ({
    id: product.id,
    slug: product.slug || product.id,
    name: product.nameEN || product.name || "Accessory",
    nameFA: product.nameFA || product.name || "اکسسوری",
    material: (product.tagsFA?.[0] || product.tagsEN?.[0] || ""),
    materialFA: (product.tagsFA?.[0] || ""),
    descriptionFA: product.descriptionFA || "",
    price: product.price || 0,
    image: product.images?.[0]?.url || product.image || "",
    accentColor: "var(--chakra-solar)",
  });

  // Render function for carousel using AccessoryCard
  const renderProduct = (product: any, index: number) => {
    const accessory = mapToAccessory(product);
    return (
      <Link
        key={product.id}
        href={`/shop/accessories/${product.slug || product.id}`}
        className="flex justify-center transition-opacity hover:opacity-90"
      >
        <AccessoryCard accessory={accessory} />
      </Link>
    );
  };

  // Render function for ProductGrid using AccessoryCard
  const renderAccessoryCard = (
    product: any,
    onAddToCart: (id: string) => void,
  ) => {
    const accessory = mapToAccessory(product);
    return (
      <Link
        key={product.id}
        href={`/shop/accessories/${product.slug || product.id}`}
        className="block transition-opacity hover:opacity-90"
      >
        <AccessoryCard accessory={accessory} />
      </Link>
    );
  };

  // Sidebar data with translation keys
  const sidebarItems = [
    {
      iconPath: "M9 9l3-5 3 5v8l-3 4-3-4z M9 9h6",
      titleKey: "ethical",
      subtitleKey: "ethicalSub",
    },
    {
      iconPath:
        "M12 13c2.5-1 4-3 4-6 0 0-3 1-4 4-1-3-4-4-4-4 0 3 1.5 5 4 6z M4 13c2 0 4 1 5 3M20 13c-2 0-4 1-5 3M12 13v4",
      titleKey: "highVibration",
      subtitleKey: "highVibrationSub",
    },
    {
      iconPath:
        "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c2.5 2.5 2.5 13 0 16 M12 3c-2.5 2.5-2.5 13 0 16",
      titleKey: "worldwideShipping",
      subtitleKey: "bringingLightToYourDoor",
    },
  ];

  // Feature bar data with translation keys
  const featureBarItems = [
    {
      icon: "M14 16l4-9 4 9v18l-4 6-4-6z M14 16h8 M24 21l4-6 3 6v11l-3 4-4-5",
      titleKey: "crystalEnergy",
      subtitleKey: "crystalEnergySub",
    },
    {
      icon: "M33 23a13 13 0 100-26 13 13 0 000 26z M20 10v26 M7 23h26 M11 14l18 18 M29 14L11 32 M33 23a5 5 0 100-10 5 5 0 000 10z",
      titleKey: "sacredGeometry",
      subtitleKey: "sacredGeometrySub",
    },
    {
      icon: "M20 30c4-1.5 6-4.5 6-9 0 0-4 1.5-6 6-2-4.5-6-6-6-6 0 4.5 2 7.5 6 9z M9 30c3 0 6 1.5 7.5 4.5M31 30c-3 0-6 1.5-7.5 4.5M20 30v6",
      titleKey: "ambientGlow",
      subtitleKey: "ambientGlowSub",
    },
    {
      icon: "M20 18c-1.5-2.5-5-2.5-6 0-1 2.5 1.5 4.5 6 8 4.5-3.5 7-5.5 6-8-1-2.5-4.5-2.5-6 0z M9 31c2-3 4-4 6-4M31 31c-2-3-4-4-6-4",
      titleKey: "handcrafted",
      subtitleKey: "handcraftedSub",
    },
  ];

  return (
    <main className="min-h-screen" dir={isRTL ? "rtl" : "ltr"}>
      {/* ── MOBILE ── */}
      <div
        className="lg:hidden flex flex-col min-h-screen"
        style={{ background: DARK_BG, direction: isRTL ? "rtl" : "ltr" }}
      >
        {/* Fixed Background - NO OVERLAY */}
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
                'url("/images/hero-backgrounds/accessories-hero.webp")',
              backgroundSize: "cover",
              backgroundPosition: "left",
              backgroundRepeat: "no-repeat",
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
          }}
        >
          {/* Hero - Using ShopHero */}
          <ShopHero
            namespace="accessories"
            accentColor={TEAL_GLOW}
            ctaKey="shopCollection"
            fullWidth={true}
          />

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
                {t("featuredTitle") || "✨ Featured Collection"}
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

          {/* Product Grid - Mobile */}
          <div className="w-full max-w-4xl">
            <h2
              className="font-display text-xl text-[var(--text-primary)] mb-6"
              style={{ color: CREAM }}
            >
              {t("products")}
            </h2>
            <ProductGrid
              category="accessories"
              itemsPerPage={12}
              renderCard={renderAccessoryCard}
              cols={{ mobile: 2, tablet: 2, desktop: 4 }}
              gap="gap-4"
              loadMore={true}
              loadMoreLabel={t("viewAll") || "Load More"}
              loadingLabel={t("loadingMore") || "Loading..."}
              noMoreLabel={t("noMoreProducts") || "No more products"}
              emptyMessage={t("noProducts") || "No accessories found"}
            />
          </div>

          {/* Categories - Mobile */}
          <div className="w-full max-w-4xl mt-12">
            <h2
              className="font-display text-xl text-[var(--text-primary)] mb-4"
              style={{ color: CREAM }}
            >
              {t("collections")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {MOCK_ACCESSORIES.map((a) => (
                <div
                  key={a.id}
                  className="relative group transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    boxShadow:
                      "0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(127,220,203,0.03)",
                    borderRadius: "16px",
                  }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7fdccb] via-[#f3eee2] to-[#7fdccb] rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                  <div className="relative bg-[#05100f] rounded-2xl overflow-hidden">
                    <MobileCategoryCard
                      id={a.id}
                      name={a.name}
                      nameFA={a.nameFA ?? a.name}
                      image={a.image}
                      accentColor="var(--chakra-solar)"
                    />
                  </div>
                </div>
              ))}
              <Link href="/shop/accessories">
                <div className="relative group transition-all duration-300 hover:scale-[1.02] h-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7fdccb] via-[#f3eee2] to-[#7fdccb] rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                  <div className="relative bg-[#05100f] rounded-2xl overflow-hidden h-full">
                    <div
                      className="flex flex-col items-center justify-center gap-3 rounded-2xl h-full min-h-[200px] transition-all duration-300 hover:opacity-80"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        padding: "20px",
                        boxShadow:
                          "0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        className="font-display"
                        style={{
                          fontSize: "2rem",
                          color: "var(--gold-accent)",
                        }}
                      >
                        →
                      </span>
                      <p className="font-body text-sm text-[var(--text-secondary)] tracking-wider uppercase text-center">
                        {t("viewAll")}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          {/* Mobile Accessory Sidebar Panel - Centered */}
          <div className="w-full flex justify-center mt-12">
            <AccessorySidebarPanel />
          </div>
        </div>

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
        className="hidden lg:flex lg:flex-col"
        style={{
          position: "relative",
          minHeight: "100vh",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* Fixed full-screen background - NO OVERLAY */}
        <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
          <Image
            src="/images/hero-backgrounds/hero-accessories.webp"
            alt=""
            fill
            sizes="100vw"
            unoptimized
            priority
            className="object-cover object-center"
            style={{
              objectPosition: "center 8%",
              filter: "brightness(1.05) contrast(1.02)",
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flex: 1,
            flexDirection: "column",
          }}
        >
          {/* Main Content */}
          <div
            style={{
              flex: 1,
              padding:
                "120px clamp(40px, 5vw, 100px) 80px clamp(40px, 5vw, 100px)",
            }}
          >
            {/* Hero - ShopHero handles mobile/desktop internally */}
            <ShopHero
              namespace="accessories"
              fullWidth={true}
              ctaKey="shopCollection"
              badge={<AccessorySidebarPanel />}
            />

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
                  {t("featuredTitle") || "✨ Featured Collection"}
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

            {/* ── FEATURE BAR ── */}
            <section
              style={{
                position: "relative",
                zIndex: 2,
                marginBottom: 40,
                minHeight: 94,
                background: "rgba(9,28,28,0.46)",
                border: "1px solid rgba(127,220,203,0.12)",
                borderRadius: 18,
                backdropFilter: "blur(7px)",
                WebkitBackdropFilter: "blur(7px)",
                display: "grid",
                gridTemplateColumns: "repeat(4,1fr)",
                alignItems: "center",
                padding: "16px 26px",
                boxShadow:
                  "0 10px 40px rgba(0,0,0,.3), inset 0 1px 0 rgba(127,220,203,0.04)",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: `linear-gradient(90deg, transparent, ${TEAL_GLOW}22, ${TEAL_GLOW}44, ${TEAL_GLOW}22, transparent)`,
                }}
              />

              {featureBarItems.map((item, index) => {
                const title = t(item.titleKey);
                const subtitle = t(item.subtitleKey);

                return (
                  <div
                    key={item.titleKey}
                    style={{
                      display: "flex",
                      gap: 15,
                      alignItems: "center",
                      paddingRight: 0,
                      paddingLeft: 0,
                      position: "relative",
                      justifyContent: "center",
                    }}
                  >
                    {index < 3 && (
                      <div
                        style={{
                          position: "absolute",
                          right: -13,
                          top: "50%",
                          transform: "translateY(-50%)",
                          height: "40%",
                          width: "1px",
                          background:
                            "linear-gradient(180deg, transparent, rgba(127,220,203,0.08), rgba(127,220,203,0.12), rgba(127,220,203,0.08), transparent)",
                        }}
                      />
                    )}

                    <div
                      style={{
                        flex: "0 0 auto",
                        width: 40,
                        height: 46,
                        display: "grid",
                        placeItems: "center",
                      }}
                    >
                      <svg
                        width="38"
                        height="42"
                        viewBox="0 0 40 46"
                        fill="none"
                        stroke={TEAL_GLOW}
                        strokeWidth="1.4"
                        style={{
                          filter: "drop-shadow(0 0 8px rgba(127,220,203,0.04))",
                        }}
                      >
                        <path d={item.icon} />
                      </svg>
                    </div>
                    <div>
                      <div
                        style={{
                          color: CREAM,
                          fontFamily: "Jost, sans-serif",
                          fontWeight: 500,
                          fontSize: 16,
                          marginBottom: 4,
                          whiteSpace: "nowrap",
                          letterSpacing: "0.02em",
                        }}
                      >
                        {title}
                      </div>
                      <div
                        style={{
                          color: TEXT_DIM,
                          fontWeight: 300,
                          fontSize: 13,
                          lineHeight: 1.3,
                        }}
                      >
                        {subtitle}
                      </div>
                    </div>
                  </div>
                );
              })}
            </section>

            {/* ── SHOP HEADING ── */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: 20,
                position: "relative",
                zIndex: 2,
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
                }}
              >
                {t("shopHeading")}
              </h2>
              <Link
                href="/shop/accessories"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  color: TEAL_GLOW,
                  fontFamily: "Jost, sans-serif",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  textShadow: "0 2px 12px rgba(0,0,0,.7)",
                  textDecoration: "none",
                }}
              >
                {t("viewAllProducts")} →
              </Link>
            </div>

            {/* ── PRODUCT CARDS ── */}
            <section
              style={{
                position: "relative",
                zIndex: 2,
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "48px 14px",
                paddingBottom: "24px",
              }}
            >
              <ProductGrid
                category="accessories"
                itemsPerPage={12}
                renderCard={renderAccessoryCard}
                cols={{ mobile: 2, tablet: 3, desktop: 4 }}
                gap="gap-4"
                loadMore={true}
                loadMoreLabel={t("viewAll") || "Load More"}
                loadingLabel={t("loadingMore") || "Loading..."}
                noMoreLabel={t("noMoreProducts") || "No more products"}
                emptyMessage={t("noProducts") || "No accessories found"}
              />
            </section>

            {/* ── CATEGORIES SECTION (DESKTOP) ── */}
            <div className="mt-16 w-full">
              <h2
                className="font-display text-2xl text-[var(--text-primary)] mb-6"
                style={{ color: CREAM }}
              >
                {t("collections")}
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {MOCK_ACCESSORIES.map((a) => (
                  <div
                    key={a.id}
                    className="relative group transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      boxShadow:
                        "0 8px 30px rgba(0,0,0,0.4), 0 0 20px rgba(127,220,203,0.03)",
                      borderRadius: "16px",
                    }}
                  >
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7fdccb] via-[#f3eee2] to-[#7fdccb] rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                    <div className="relative bg-[#05100f] rounded-2xl overflow-hidden">
                      <MobileCategoryCard
                        id={a.id}
                        name={a.name}
                        nameFA={a.nameFA ?? a.name}
                        image={a.image}
                        accentColor="var(--chakra-solar)"
                      />
                    </div>
                  </div>
                ))}
                <Link href="/shop/accessories">
                  <div className="relative group transition-all duration-300 hover:scale-[1.02] h-full">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7fdccb] via-[#f3eee2] to-[#7fdccb] rounded-2xl opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500"></div>
                    <div className="relative bg-[#05100f] rounded-2xl overflow-hidden h-full">
                      <div
                        className="flex flex-col items-center justify-center gap-3 rounded-2xl h-full min-h-[200px] transition-all duration-300 hover:opacity-80"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          backdropFilter: "blur(12px)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          padding: "20px",
                          boxShadow:
                            "0 8px 30px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
                        }}
                      >
                        <span
                          className="font-display"
                          style={{ fontSize: "2rem", color: TEAL_GLOW }}
                        >
                          →
                        </span>
                        <p className="font-body text-sm text-[var(--text-secondary)] tracking-wider uppercase text-center">
                          {t("viewAll")}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}