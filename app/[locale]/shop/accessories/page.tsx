"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MobileCategoryCard from "@/components/ui/MobileCategoryCard";
import { MOCK_ACCESSORIES } from "@/lib/mock-data";
import type { Accessory } from "@/lib/mock-data";
import AccessoryCard from "@/components/ui/AccessoryCard";
import { AccessorySidebarPanel } from "@/components/aura/ShopSidePanels";
import ShopHero from "@/components/aura/ShopHero";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { getAccessories } from "@/lib/api";

/* ---- Design tokens from Mystic Earth ---- */
const TEAL_GLOW = "#7fdccb";
const CREAM = "#f3eee2";
const TEXT_DIM = "#bcc8c2";
const PANEL_STRONG = "rgba(8,26,27,0.62)";
const DARK_BG = "#05100f";

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const t = useTranslations("accessories");
  const { isRTL } = useLocale();

  useEffect(() => {
    async function loadAccessories() {
      try {
        const data = await getAccessories();
        // Take first 10 items for display
        setAccessories(data.slice(0, 10));
      } catch (error) {
        console.error("Failed to load accessories:", error);
        // Fallback to mock data if API fails
        setAccessories(MOCK_ACCESSORIES.slice(0, 10));
      } finally {
        setIsLoading(false);
      }
    }
    loadAccessories();
  }, []);

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

  if (isLoading) {
    return (
      <main className="min-h-screen" style={{ background: DARK_BG }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <p style={{ color: CREAM }}>Loading...</p>
        </div>
      </main>
    );
  }

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

          {/* Product Grid - Mobile */}
          <div className="w-full max-w-4xl">
            <h2 className="font-display text-xl text-[var(--text-primary)] mb-6">
              {t("products")}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {accessories.map((p: Accessory) => (
                <div
                  key={p.id}
                  style={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <AccessoryCard accessory={p} />
                </div>
              ))}
            </div>
          </div>

          {/* Categories - Mobile */}
          <div className="w-full max-w-4xl mt-12">
            <h2 className="font-display text-xl text-[var(--text-primary)] mb-4">
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
              {accessories.map((p: Accessory) => (
                <div
                  key={p.id}
                  style={{
                    height: "100%",
                    display: "flex",
                  }}
                >
                  <AccessoryCard accessory={p} />
                </div>
              ))}
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
