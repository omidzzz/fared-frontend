"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import CTAButton from "@/components/ui/CTAButton";
import { getArticles } from "@/lib/api";
import type { BlogArticle } from "@/lib/api";

const DARK_BG = "#0a0520";
const CARD_BG = "rgba(18,11,56,0.72)";
const BORDER = "rgba(120,80,220,0.28)";
const CREAM = "#f0eaff";
const TEXT_DIM = "#a090c8";
const GOLD = "#fecb7d";
const TEAL = "#7fd4dc";
const PURPLE_GLOW = "#9b5cf6";

const INSIGHTS = [
  {
    titleKey: "insights.meditation",
    subtitleKey: "insights.meditationSub",
    icon: "🧘",
  },
  {
    titleKey: "insights.energyHealing",
    subtitleKey: "insights.energyHealingSub",
    icon: "❄️",
  },
  {
    titleKey: "insights.moonWisdom",
    subtitleKey: "insights.moonWisdomSub",
    icon: "🌙",
  },
];

const RESPONSIVE_CSS = `
  /* ── THREE-COL GRID ── */
  .blog-three-col {
    display: grid;
    grid-template-columns: 1fr 1.6fr 1fr;
    gap: 20px;
    align-items: start;
  }

  /* ── NEWSLETTER ── */
  .blog-newsletter {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
    padding: 32px 40px;
    width: 100%;
  }
  .blog-newsletter-left {
    display: flex;
    align-items: center;
    gap: 16px;
  }
  .blog-newsletter-inputs {
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
    width: 100%;
  }
  .blog-newsletter-inputs input,
  .blog-newsletter-inputs .btn-wrap {
    width: 100%;
    max-width: 400px;
  }

  @media (max-width: 1024px) {
    .blog-three-col {
      grid-template-columns: 1fr 1.4fr;
    }
    .blog-col-right { display: none; }
  }

  @media (max-width: 768px) {
    .blog-wrap { padding: 100px 16px 48px !important; }

    .blog-three-col {
      grid-template-columns: 1fr !important;
    }
    
    .blog-col-center { order: 1 !important; }
    .blog-col-left { order: 2 !important; }
    .blog-col-right { 
      order: 3 !important;
      display: grid !important;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .blog-newsletter {
      grid-template-columns: 1fr !important;
      gap: 20px;
      padding: 28px 20px;
    }
    .blog-newsletter-left {
      flex-direction: column;
      text-align: center;
      gap: 12px;
    }
    .blog-newsletter-left > div {
      text-align: center !important;
    }
    .blog-newsletter-inputs {
      flex-direction: column !important;
      width: 100%;
      align-items: center !important;
      justify-content: center !important;
    }
    .blog-newsletter-inputs input,
    .blog-newsletter-inputs .btn-wrap {
      max-width: 100% !important;
    }
    .blog-newsletter-inputs .btn-wrap button {
      width: 100% !important;
      justify-content: center !important;
    }
  }

  /* RTL overrides for grid */
  [dir="rtl"] .blog-three-col {
    direction: rtl;
  }
  [dir="rtl"] .blog-col-left,
  [dir="rtl"] .blog-col-center,
  [dir="rtl"] .blog-col-right {
    direction: rtl;
  }
`;

export default function BlogV2Page() {
  const t = useTranslations("blog");
  const { isRTL } = useLocale();
  const [email, setEmail] = useState("");
  const [subLoading, setSubLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [articles, setArticles] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to load blog articles:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadArticles();
  }, []);

  const featuredArticle = articles.find((a) => a.isFeatured);
  const latestArticles = articles.filter((a) => !a.isFeatured).slice(0, 4);

  function formatReadTime(minutes: number): string {
    return `${minutes} min read`;
  }

  function formatDate(dateStr: string): string {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  }

  const handleSubscribe = async () => {
    if (!email.trim()) return;
    setSubLoading(true);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error("Failed");
      setSubscribed(true);
      toast.success("Subscribed successfully ✦");
      setEmail("");
    } catch {
      toast.error("Subscription failed. Try again.");
    } finally {
      setSubLoading(false);
    }
  };

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      style={{ background: DARK_BG, minHeight: "100vh", position: "relative" }}
    >
      <style>{RESPONSIVE_CSS}</style>

      {/* Fixed background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: 'url("/images/hero-backgrounds/blog-hero.webp")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            transform: isRTL ? "scaleX(-1)" : "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(10,5,32,0.25) 0%, rgba(10,5,32,0) 35%, rgba(10,5,32,0.7) 75%, rgba(10,5,32,1) 100%)",
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── HERO Section (ShopHero style) ── */}
        <section
          style={{
            minHeight: 420,
            display: "flex",
            alignItems: "center",
            padding: "120px 24px 60px",
          }}
        >
          <div
            style={{
              maxWidth: 1200,
              margin: "0 auto",
              width: "100%",
            }}
          >
            <div
              style={{
                maxWidth: 620,
                textAlign: isRTL ? "right" : "left",
                marginLeft: isRTL ? "auto" : 0,
                marginRight: isRTL ? 0 : "auto",
              }}
            >
              {/* Ornament */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 20,
                  justifyContent: isRTL ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 1,
                    background: `linear-gradient(to ${
                      isRTL ? "left" : "right"
                    }, ${GOLD}, transparent)`,
                  }}
                />
                <span style={{ color: GOLD, fontSize: 10, letterSpacing: 4 }}>
                  ◆◆◆
                </span>
              </div>

              {/* Title */}
              {!isRTL ? (
                <h1
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(40px, 5vw, 68px)",
                    fontWeight: 600,
                    lineHeight: 1.05,
                    marginBottom: 20,
                    textAlign: "left",
                  }}
                >
                  <span style={{ color: "#c9a8f0" }}>{t("hero.stories")}</span>
                  <span style={{ fontStyle: "italic", color: CREAM }}>
                    {" "}
                    {t("hero.forThe")}{" "}
                  </span>
                  <span style={{ color: TEAL }}>{t("hero.soul")}</span>
                </h1>
              ) : (
                <div style={{ marginBottom: 20 }}>
                  <h1
                    style={{
                      fontFamily: "'Vazirmatn', 'IranSans', sans-serif",
                      fontSize: "clamp(32px, 5vw, 56px)",
                      fontWeight: 700,
                      lineHeight: 1.2,
                      textAlign: "right",
                      margin: 0,
                    }}
                  >
                    <span style={{ color: "#c9a8f0" }}>
                      {t("hero.stories")}
                    </span>
                    <span style={{ color: CREAM }}>
                      &nbsp;{t("hero.forThe")}&nbsp;
                    </span>
                    <span style={{ color: TEAL }}>{t("hero.soul")}</span>
                  </h1>
                  <div
                    style={{
                      width: 80,
                      height: 3,
                      background: `linear-gradient(to right, ${TEAL}, ${GOLD})`,
                      borderRadius: 2,
                      marginTop: 12,
                      marginRight: 0,
                    }}
                  />
                </div>
              )}

              {/* Description */}
              <p
                style={{
                  color: CREAM,
                  fontSize: isRTL ? 16 : 18,
                  lineHeight: isRTL ? 1.8 : 1.6,
                  maxWidth: 520,
                  opacity: 0.9,
                  textAlign: isRTL ? "right" : "left",
                  marginLeft: isRTL ? "auto" : 0,
                  marginRight: isRTL ? 0 : "auto",
                  fontFamily: isRTL
                    ? "'Vazirmatn', 'IranSans', sans-serif"
                    : "inherit",
                }}
              >
                {t("hero.subtitle")}
              </p>

              {/* CTA Button */}
              <div
                style={{ marginTop: 28, textAlign: isRTL ? "right" : "left" }}
              >
                <CTAButton href="/blog" size="large">
                  {t("viewAllArticles")}
                </CTAButton>
              </div>
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <div
          className="blog-wrap"
          style={{
            maxWidth: 1200,
            margin: "-40px auto 0",
            padding: "0 24px 80px",
          }}
        >
          <div className="blog-three-col">
            {/* LEFT: Latest Articles */}
            <div
              className="blog-col-left"
              style={{
                background: CARD_BG,
                border: `1px solid ${BORDER}`,
                borderRadius: 16,
                padding: 20,
                backdropFilter: "blur(10px)",
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 8,
                  justifyContent: isRTL ? "flex-end" : "flex-start",
                }}
              >
                <span style={{ color: GOLD, fontSize: 12 }}>★</span>
                <span
                  style={{
                    color: GOLD,
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "Jost, sans-serif",
                    fontSize: isRTL ? 11 : 12,
                    letterSpacing: isRTL ? "0.1em" : ".18em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("latestArticles")}
                </span>
              </div>
              {isLoading ? (
                <p style={{ color: TEXT_DIM, padding: "20px" }}>Loading articles...</p>
              ) : (
                latestArticles.map((article) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                        padding: "12px 0",
                        borderBottom: "1px solid rgba(120,80,220,0.15)",
                        flexDirection: isRTL ? "row-reverse" : "row",
                      }}
                    >
                      <div
                        style={{
                          position: "relative",
                          width: 56,
                          height: 56,
                          borderRadius: 10,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "rgba(120,80,220,0.2)",
                        }}
                      >
                        <Image
                          src={article.image || "/images/hero-backgrounds/blog-hero.webp"}
                          alt=""
                          fill
                          className="object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                          }}
                        />
                      </div>
                      <div
                        style={{
                          textAlign: isRTL ? "right" : "left",
                          fontFamily: isRTL
                            ? "'Vazirmatn', 'IranSans', sans-serif"
                            : "inherit",
                          width: "100%",
                        }}
                      >
                        <div
                          style={{
                            fontFamily: isRTL
                              ? "'Vazirmatn', 'IranSans', sans-serif"
                              : "'Playfair Display', serif",
                            color: CREAM,
                            fontSize: isRTL ? 13 : 14,
                            fontWeight: isRTL ? 600 : 500,
                            lineHeight: isRTL ? 1.5 : 1.3,
                          }}
                        >
                          {article.titleFA}
                        </div>
                        <div
                          style={{
                            color: TEXT_DIM,
                            fontSize: isRTL ? 11 : 12,
                            marginTop: 3,
                          }}
                        >
                          {article.publishedAt ? formatDate(article.publishedAt) : formatDate(article.createdAt)} · {formatReadTime(article.readMinutes)}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              )}
              <div style={{ marginTop: 16 }}>
                <CTAButton href="/blog" size="fullWidth">
                  {t("viewAllArticles")}
                </CTAButton>
              </div>
            </div>

            {/* CENTER: Featured Story */}
            <div
              className="blog-col-center"
              style={{
                background: CARD_BG,
                border: `1px solid ${BORDER}`,
                borderRadius: 20,
                overflow: "hidden",
                backdropFilter: "blur(10px)",
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              <div
                style={{
                  padding: "16px 20px 0",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  justifyContent: isRTL ? "flex-end" : "flex-start",
                }}
              >
                <span style={{ color: GOLD }}>◇</span>
                <span
                  style={{
                    color: GOLD,
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "Jost, sans-serif",
                    fontSize: isRTL ? 11 : 12,
                    letterSpacing: isRTL ? "0.1em" : ".18em",
                    textTransform: "uppercase",
                  }}
                >
                  {t("featuredStory")}
                </span>
              </div>
              {featuredArticle ? (
                <>
                  <div
                    style={{
                      position: "relative",
                      height: 320,
                      background:
                        "linear-gradient(135deg, rgba(120,80,220,0.4), rgba(60,30,120,0.6))",
                    }}
                  >
                    <Image
                      src={featuredArticle.image || "/images/hero-backgrounds/blog-hero.webp"}
                      alt=""
                      fill
                      className="object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 14,
                        right: isRTL ? "auto" : 14,
                        left: isRTL ? 14 : "auto",
                        background: PURPLE_GLOW,
                        color: "#fff",
                        fontFamily: "Jost, sans-serif",
                        fontSize: 11,
                        borderRadius: 20,
                        padding: "4px 12px",
                      }}
                    >
                      ★ {t("featuredLabel")}
                    </div>
                  </div>
                  <div style={{ padding: "16px 20px 20px" }}>
                    <h2
                      style={{
                        fontFamily: isRTL
                          ? "'Vazirmatn', 'IranSans', sans-serif"
                          : "'Playfair Display', serif",
                        color: CREAM,
                        fontSize: isRTL ? 20 : 22,
                        fontWeight: isRTL ? 700 : 600,
                        marginBottom: 10,
                        textAlign: isRTL ? "right" : "left",
                        lineHeight: isRTL ? 1.4 : 1.3,
                      }}
                    >
                      {featuredArticle.titleFA}
                    </h2>
                    <p
                      style={{
                        color: TEXT_DIM,
                        fontSize: isRTL ? 13 : 14,
                        lineHeight: isRTL ? 1.8 : 1.6,
                        marginBottom: 16,
                        textAlign: isRTL ? "right" : "left",
                        fontFamily: isRTL
                          ? "'Vazirmatn', 'IranSans', sans-serif"
                          : "inherit",
                      }}
                    >
                      {featuredArticle.excerptFA}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexDirection: "row",
                      }}
                    >
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 10 }}
                      >
                        <div
                          style={{
                            position: "relative",
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            overflow: "hidden",
                            background: "rgba(120,80,220,0.3)",
                          }}
                        >
                          <Image
                            src={featuredArticle.image || "/images/hero-backgrounds/blog-hero.webp"}
                            alt=""
                            fill
                            className="object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = "none";
                            }}
                          />
                        </div>
                        <div style={{ textAlign: "left" }}>
                          <div style={{ color: CREAM, fontSize: 13 }}>
                            {featuredArticle.authorFA}
                          </div>
                          <div style={{ color: TEXT_DIM, fontSize: 12 }}>
                            {featuredArticle.publishedAt ? formatDate(featuredArticle.publishedAt) : formatDate(featuredArticle.createdAt)} · {formatReadTime(featuredArticle.readMinutes)}
                          </div>
                        </div>
                      </div>
                      <CTAButton href={`/blog/${featuredArticle.slug}`} size="small">
                        {t("readStory")}
                      </CTAButton>
                    </div>
                  </div>
                </>
              ) : (
                <p style={{ color: TEXT_DIM, padding: "20px" }}>{isLoading ? "Loading..." : t("noCoursesFound")}</p>
              )}
            </div>

            {/* RIGHT: Spiritual Insights + Daily Inspiration */}
            <div
              className="blog-col-right"
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              <div
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 20,
                  backdropFilter: "blur(10px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    marginBottom: 4,
                    justifyContent: isRTL ? "flex-end" : "flex-start",
                  }}
                >
                  <span style={{ color: TEAL, fontSize: 14 }}>○</span>
                  <span
                    style={{
                      color: GOLD,
                      fontFamily: isRTL
                        ? "'Vazirmatn', 'IranSans', sans-serif"
                        : "Jost, sans-serif",
                      fontSize: isRTL ? 11 : 12,
                      letterSpacing: isRTL ? "0.1em" : ".18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("spiritualInsights")}
                  </span>
                </div>
                {INSIGHTS.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "14px 0",
                      borderBottom: "1px solid rgba(120,80,220,0.12)",
                    }}
                  >
                    {isRTL ? (
                      <>
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: "rgba(120,80,220,0.2)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: 14,
                            flexShrink: 0,
                          }}
                        >
                          {item.icon}
                        </div>
                        <div
                          style={{
                            textAlign: "right",
                            fontFamily: "'Vazirmatn', 'IranSans', sans-serif",
                            flex: 1,
                          }}
                        >
                          <div
                            style={{
                              color: CREAM,
                              fontSize: 13,
                              fontWeight: 600,
                            }}
                          >
                            {t(item.titleKey)}
                          </div>
                          <div
                            style={{
                              color: TEXT_DIM,
                              fontSize: 11,
                              lineHeight: 1.6,
                            }}
                          >
                            {t(item.subtitleKey)}
                          </div>
                        </div>
                        <span
                          style={{
                            color: TEXT_DIM,
                            fontSize: 18,
                            flexShrink: 0,
                          }}
                        >
                          ›
                        </span>
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                          }}
                        >
                          <div
                            style={{
                              width: 36,
                              height: 36,
                              borderRadius: "50%",
                              background: "rgba(120,80,220,0.2)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 14,
                              flexShrink: 0,
                            }}
                          >
                            {item.icon}
                          </div>
                          <div
                            style={{
                              textAlign: "left",
                            }}
                          >
                            <div
                              style={{
                                color: CREAM,
                                fontSize: 14,
                                fontWeight: 500,
                              }}
                            >
                              {t(item.titleKey)}
                            </div>
                            <div
                              style={{
                                color: TEXT_DIM,
                                fontSize: 12,
                                lineHeight: 1.4,
                              }}
                            >
                              {t(item.subtitleKey)}
                            </div>
                          </div>
                        </div>
                        <span
                          style={{
                            color: TEXT_DIM,
                            fontSize: 18,
                            flexShrink: 0,
                          }}
                        >
                          ›
                        </span>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Daily Inspiration - VERTICALLY CENTERED */}
              <div
                style={{
                  background: CARD_BG,
                  border: `1px solid ${BORDER}`,
                  borderRadius: 16,
                  padding: 20,
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  minHeight: "180px",
                  height: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    marginBottom: 12,
                  }}
                >
                  <span style={{ color: GOLD, fontSize: 12 }}>✦</span>
                  <span
                    style={{
                      color: GOLD,
                      fontFamily: isRTL
                        ? "'Vazirmatn', 'IranSans', sans-serif"
                        : "Jost, sans-serif",
                      fontSize: isRTL ? 11 : 12,
                      letterSpacing: isRTL ? "0.1em" : ".18em",
                      textTransform: "uppercase",
                    }}
                  >
                    {t("dailyInspiration")}
                  </span>
                </div>
                <p
                  style={{
                    color: CREAM,
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "'Playfair Display', serif",
                    fontSize: isRTL ? 14 : 15,
                    fontStyle: "italic",
                    lineHeight: isRTL ? 1.8 : 1.7,
                    textAlign: "center",
                    padding: "0 8px",
                    margin: 0,
                  }}
                >
                  &ldquo;{t("dailyInspirationText")}&rdquo;
                </p>
                <div style={{ textAlign: "center", marginTop: 10 }}>
                  <span style={{ color: PURPLE_GLOW, fontSize: 18 }}>♥</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── NEWSLETTER ── */}
          <section
            style={{
              background:
                "linear-gradient(135deg, rgba(30,10,80,0.95) 0%, rgba(15,8,50,0.98) 100%)",
              border: "1px solid rgba(120,80,220,0.25)",
              borderRadius: 20,
              margin: "40px 0 0",
              boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
            }}
          >
            <div
              className="blog-newsletter"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 40,
                alignItems: "center",
                padding: "32px 40px",
                width: "100%",
                direction: isRTL ? "rtl" : "ltr",
              }}
            >
              {/* Left: Icon + Text */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  textAlign: isRTL ? "right" : "left",
                  flexDirection: isRTL ? "row-reverse" : "row",
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 28,
                    flexShrink: 0,
                    background: "rgba(120,80,220,0.15)",
                    borderRadius: "50%",
                  }}
                >
                  💜
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: isRTL
                        ? "'Vazirmatn', 'IranSans', sans-serif"
                        : "'Playfair Display', serif",
                      color: CREAM,
                      fontSize: isRTL ? 16 : 18,
                      fontWeight: isRTL ? 700 : 500,
                      marginBottom: 4,
                      letterSpacing: isRTL ? "0.02em" : "0.05em",
                      textAlign: isRTL ? "right" : "left",
                    }}
                  >
                    {t("newsletter.title")}
                  </div>
                  <div
                    style={{
                      color: TEXT_DIM,
                      fontSize: isRTL ? 12 : 13,
                      maxWidth: 420,
                      lineHeight: isRTL ? 1.8 : 1.5,
                      textAlign: isRTL ? "right" : "left",
                      fontFamily: isRTL
                        ? "'Vazirmatn', 'IranSans', sans-serif"
                        : "inherit",
                    }}
                  >
                    {t("newsletter.subtitle")}
                  </div>
                </div>
              </div>

              {/* Right: Input + Button - Stacked vertically with centered button */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <input
                  type="email"
                  placeholder={t("newsletter.placeholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(120,80,220,0.3)",
                    borderRadius: 10,
                    color: CREAM,
                    padding: "12px 20px",
                    fontSize: isRTL ? 13 : 14,
                    height: 50,
                    outline: "none",
                    transition: "border-color 0.3s ease",
                    textAlign: isRTL ? "right" : "left",
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "inherit",
                    direction: isRTL ? "rtl" : "ltr",
                    width: "100%",
                    maxWidth: "350px",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(120,80,220,0.6)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "rgba(120,80,220,0.3)";
                  }}
                />
                <div
                  style={{
                    width: "250px",
                    maxWidth: "100%",
                  }}
                >
                  <CTAButton
                    size="fullWidth"
                    onClick={handleSubscribe}
                    disabled={subLoading || subscribed}
                  >
                    {subLoading
                      ? t("newsletter.subscribing")
                      : subscribed
                      ? t("newsletter.subscribed")
                      : t("newsletter.subscribe")}
                  </CTAButton>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}