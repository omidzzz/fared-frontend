"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale } from "@/hooks/useLocale";
import { getArticleBySlug, getArticles } from "@/lib/api";
import type { BlogArticle } from "@/lib/api";

export default function BlogDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogArticle | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isRTL } = useLocale();

  useEffect(() => {
    async function loadArticle() {
      try {
        setIsLoading(true);
        const article = await getArticleBySlug(slug);
        setPost(article);

        if (article) {
          const allArticles = await getArticles();
          let related = allArticles
            .filter((a: BlogArticle) => {
              const sameCategory =
                a.categoryFA &&
                article.categoryFA &&
                a.categoryFA.trim() === article.categoryFA.trim();
              return (
                a.id !== article.id && sameCategory && a.isPublished === true
              );
            })
            .slice(0, 4);

          if (related.length === 0) {
            related = allArticles
              .filter(
                (a: BlogArticle) =>
                  a.id !== article.id && a.isPublished === true,
              )
              .sort((a, b) => {
                const dateA = new Date(a.publishedAt || a.createdAt).getTime();
                const dateB = new Date(b.publishedAt || b.createdAt).getTime();
                return dateB - dateA;
              })
              .slice(0, 4);
          }
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error("Failed to load article:", error);
        setPost(null);
      } finally {
        setIsLoading(false);
      }
    }

    if (slug) loadArticle();
  }, [slug]);

  if (isLoading) {
    return (
      <main
        className="min-h-screen psyche-bg"
        style={{ background: "#1a0d3d" }}
      >
        <div className="psyche-aurora" aria-hidden="true">
          <span className="aurora-blob aurora-blob-1" />
          <span className="aurora-blob aurora-blob-2" />
          <span className="aurora-blob aurora-blob-3" />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
          }}
        >
          <p
            className="loading-shimmer"
            style={{ color: "#fff", fontSize: "1.05rem" }}
          >
            در حال بارگذاری...
          </p>
        </div>
      </main>
    );
  }

  if (!post) {
    return (
      <main
        className="min-h-screen psyche-bg"
        style={{ background: "#1a0d3d" }}
      >
        <div className="psyche-aurora" aria-hidden="true">
          <span className="aurora-blob aurora-blob-1" />
          <span className="aurora-blob aurora-blob-2" />
        </div>
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh",
            gap: "20px",
          }}
        >
          <p style={{ color: "#fff", fontSize: "1.2rem" }}>مطلب یافت نشد</p>
          <Link href="/blog">
            <button className="glow-border-btn">← بازگشت به بلاگ</button>
          </Link>
        </div>
      </main>
    );
  }

  const paragraphs = post.bodyFA?.split("\n\n").filter(Boolean) || [];
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("fa-IR")
    : new Date(post.createdAt).toLocaleDateString("fa-IR");

  return (
    <main
      className="min-h-screen psyche-bg"
      dir={isRTL ? "rtl" : "ltr"}
      style={{ background: "#1a0d3d" }}
    >
      {/* Fixed Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/hero-backgrounds/blog-detail-hero.webp"
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
              "linear-gradient(180deg, rgba(26,13,61,0.65) 0%, transparent 35%, transparent 70%, rgba(26,13,61,0.95) 100%)",
          }}
        />
        {/* Psychedelic aurora mesh + grain */}
        <div className="psyche-aurora" aria-hidden="true">
          <span className="aurora-blob aurora-blob-1" />
          <span className="aurora-blob aurora-blob-2" />
          <span className="aurora-blob aurora-blob-3" />
          <span className="aurora-blob aurora-blob-4" />
        </div>
        <div className="psyche-grain" aria-hidden="true" />
      </div>

      <div style={{ position: "relative", zIndex: 1, paddingTop: "96px" }}>
        {/* Hero Section */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(380px, 45vh, 520px)",
            maxHeight: "520px",
            overflow: "hidden",
            borderBottom: "1px solid rgba(200,162,74,0.2)",
          }}
        >
          {/* Decorative floating orbs (multi-hue) */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "10%",
              width: "180px",
              height: "180px",
              background:
                "radial-gradient(circle, rgba(200,162,74,0.18) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "floatOrb 30s ease-in-out infinite",
              zIndex: 1,
              filter: "blur(2px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "25%",
              right: "15%",
              width: "120px",
              height: "120px",
              background:
                "radial-gradient(circle, rgba(123,47,247,0.16) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "floatOrb 25s ease-in-out infinite reverse",
              zIndex: 1,
              filter: "blur(2px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              right: "35%",
              width: "90px",
              height: "90px",
              background:
                "radial-gradient(circle, rgba(46,230,214,0.14) 0%, transparent 70%)",
              borderRadius: "50%",
              animation: "floatOrb 20s ease-in-out infinite",
              animationDelay: "-6s",
              zIndex: 1,
              filter: "blur(2px)",
            }}
          />

          <Image
            src={post.image || "/images/default-thumbnail.jpg"}
            alt={post.titleFA}
            fill
            sizes="(max-width: 768px) 100vw, 1400px"
            className="object-cover"
            priority
            style={{ objectPosition: "center 35%" }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />

          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to top, rgba(26,13,61,0.9) 10%, rgba(0,0,0,0.4) 50%, transparent 80%)",
              zIndex: 2,
            }}
          />
          {/* Subtle prismatic sheen sweeping across the hero */}
          <div className="hero-sheen" aria-hidden="true" />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "clamp(20px, 5vw, 60px) clamp(20px, 5vw, 80px)",
              zIndex: 3,
            }}
            dir={isRTL ? "rtl" : "ltr"}
          >
            <span className="category-pill">{post.categoryFA}</span>

            <h1 className="gradient-title">{post.titleFA}</h1>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "16px",
                color: "rgba(255,255,255,0.8)",
                fontSize: "0.9rem",
                flexWrap: "wrap",
              }}
            >
              <span>{post.authorFA}</span>
              <span style={{ color: "#c8a24a" }}>•</span>
              <span>{formattedDate}</span>
              <span style={{ color: "#c8a24a" }}>•</span>
              <span>{post.readMinutes} دقیقه مطالعه</span>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div
          style={{
            padding: "50px clamp(20px, 5vw, 80px)",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div style={{ maxWidth: "920px", margin: "0 auto" }}>
            <div className="content-card" dir={isRTL ? "rtl" : "ltr"}>
              {/* Rotating conic glow ring behind the card */}
              <div className="content-card-glow" aria-hidden="true" />

              {/* Decorative corner accents */}
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  width: "40px",
                  height: "40px",
                  borderTop: "2px solid #c8a24a",
                  borderLeft: "2px solid #c8a24a",
                  opacity: 0.2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
                  width: "40px",
                  height: "40px",
                  borderBottom: "2px solid #c8a24a",
                  borderRight: "2px solid #c8a24a",
                  opacity: 0.2,
                }}
              />

              <div style={{ position: "relative", zIndex: 1 }}>
                {paragraphs.length > 0 ? (
                  paragraphs.map((para: string, i: number) => (
                    <p
                      key={i}
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "clamp(1rem, 1.15vw, 1.12rem)",
                        lineHeight: 1.95,
                        marginBottom: i < paragraphs.length - 1 ? "28px" : 0,
                        position: "relative",
                      }}
                    >
                      {para}
                    </p>
                  ))
                ) : (
                  <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 2 }}>
                    {post.bodyFA}
                  </p>
                )}
              </div>
            </div>

            {/* Author */}
            <div
              style={{
                marginTop: "40px",
                padding: "28px",
                background: "rgba(255,255,255,0.03)",
                borderRadius: "16px",
                border: "1px solid rgba(200,162,74,0.1)",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                position: "relative",
                overflow: "hidden",
              }}
              dir={isRTL ? "rtl" : "ltr"}
            >
              <div className="avatar-glow">
                {post.authorFA?.charAt(0) || "✍"}
              </div>
              <div>
                <p
                  style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}
                >
                  {post.authorFA}
                </p>
                <p
                  style={{ color: "rgba(200,162,74,0.7)", fontSize: "0.9rem" }}
                >
                  نویسنده
                </p>
              </div>
            </div>

            {/* Related Posts */}
            <div style={{ marginTop: "60px" }}>
              <h2
                style={{
                  color: "#fff",
                  fontSize: "clamp(1.3rem, 2.2vw, 1.6rem)",
                  fontWeight: 700,
                  marginBottom: "28px",
                  textAlign: "center",
                  position: "relative",
                }}
                dir={isRTL ? "rtl" : "ltr"}
              >
                <span className="section-title-accent">مطالب مرتبط</span>
              </h2>

              {relatedPosts.length > 0 ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fill, minmax(210px, 1fr))",
                    gap: "22px",
                  }}
                >
                  {relatedPosts.map((p) => (
                    <Link
                      key={p.id}
                      href={`/blog/${p.slug}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div className="related-card">
                        <div style={{ position: "relative", height: "145px" }}>
                          <Image
                            src={p.image || "/images/default-thumbnail.jpg"}
                            alt={p.titleFA}
                            fill
                            className="object-cover"
                          />
                          <div className="related-card-sheen" />
                        </div>
                        <div
                          style={{ padding: "18px" }}
                          dir={isRTL ? "rtl" : "ltr"}
                        >
                          <h3
                            style={{
                              color: "#fff",
                              fontSize: "0.95rem",
                              lineHeight: 1.45,
                              marginBottom: "10px",
                            }}
                          >
                            {p.titleFA}
                          </h3>
                          <p
                            style={{
                              color: "rgba(255,255,255,0.45)",
                              fontSize: "0.82rem",
                            }}
                          >
                            {p.readMinutes} دقیقه مطالعه
                          </p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.03)",
                    borderRadius: "12px",
                  }}
                >
                  در حال حاضر مطلب مرتبط دیگری وجود ندارد
                </div>
              )}
            </div>

            <Link href="/blog">
              <div
                style={{
                  margin: "60px auto 0",
                  textAlign: "center",
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "1rem",
                  cursor: "pointer",
                  transition: "color 0.3s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#c8a24a")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.5)")
                }
              >
                ← بازگشت به بلاگ
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Decorative Animations */}
      <style jsx global>{`
        @keyframes floatOrb {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          50% {
            transform: translate(30px, -40px) rotate(8deg);
          }
        }
        @keyframes psycheShift {
          0% {
            opacity: 0.6;
          }
          100% {
            opacity: 1;
          }
        }

        /* ---- Aurora mesh background ---- */
        .psyche-aurora {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }
        .aurora-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.5;
          will-change: transform;
        }
        .aurora-blob-1 {
          width: 420px;
          height: 420px;
          top: -10%;
          left: -8%;
          background: radial-gradient(
            circle,
            rgba(123, 47, 247, 0.35),
            transparent 70%
          );
          animation: drift1 34s ease-in-out infinite;
        }
        .aurora-blob-2 {
          width: 380px;
          height: 380px;
          top: 30%;
          right: -10%;
          background: radial-gradient(
            circle,
            rgba(200, 162, 74, 0.28),
            transparent 70%
          );
          animation: drift2 40s ease-in-out infinite;
        }
        .aurora-blob-3 {
          width: 320px;
          height: 320px;
          bottom: -8%;
          left: 20%;
          background: radial-gradient(
            circle,
            rgba(46, 230, 214, 0.22),
            transparent 70%
          );
          animation: drift3 46s ease-in-out infinite;
        }
        .aurora-blob-4 {
          width: 260px;
          height: 260px;
          bottom: 15%;
          right: 25%;
          background: radial-gradient(
            circle,
            rgba(255, 95, 162, 0.18),
            transparent 70%
          );
          animation: drift1 38s ease-in-out infinite reverse;
        }
        @keyframes drift1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(60px, 40px) scale(1.15);
          }
        }
        @keyframes drift2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-50px, 60px) scale(1.1);
          }
        }
        @keyframes drift3 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(40px, -50px) scale(1.2);
          }
        }

        /* ---- Subtle film grain for texture ---- */
        .psyche-grain {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0.035;
          mix-blend-mode: overlay;
          background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
        }

        /* ---- Hero prismatic sheen ---- */
        .hero-sheen {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(200, 162, 74, 0.06) 40%,
            rgba(123, 47, 247, 0.08) 50%,
            rgba(46, 230, 214, 0.06) 60%,
            transparent 80%
          );
          background-size: 250% 250%;
          animation: sheenMove 16s ease-in-out infinite;
        }
        @keyframes sheenMove {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* ---- Category pill ---- */
        .category-pill {
          display: inline-block;
          background: rgba(200, 162, 74, 0.25);
          color: #c8a24a;
          padding: 6px 20px;
          border-radius: 30px;
          font-size: 0.83rem;
          font-weight: 600;
          margin-bottom: 16px;
          box-shadow: 0 0 20px rgba(200, 162, 74, 0.35);
          border: 1px solid rgba(200, 162, 74, 0.4);
        }

        /* ---- Gradient shifting title ---- */
        .gradient-title {
          font-size: clamp(1.7rem, 4.5vw, 3rem);
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 16px;
          background: linear-gradient(
            90deg,
            #ffffff 0%,
            #f3e3ba 30%,
            #c8a24a 55%,
            #f3e3ba 75%,
            #ffffff 100%
          );
          background-size: 250% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 4px 30px rgba(0, 0, 0, 0.55);
          animation: titleSheen 10s linear infinite;
        }
        @keyframes titleSheen {
          0% {
            background-position: 0% center;
          }
          100% {
            background-position: 250% center;
          }
        }

        /* ---- Content card with rotating conic glow ---- */
        .content-card {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(200, 162, 74, 0.15);
          border-radius: 20px;
          padding: clamp(32px, 5vw, 56px);
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(6px);
        }
        .content-card-glow {
          position: absolute;
          inset: -2px;
          z-index: 0;
          border-radius: 20px;
          padding: 1px;
          opacity: 0.5;
          background: conic-gradient(
            from 0deg,
            rgba(200, 162, 74, 0.5),
            rgba(123, 47, 247, 0.4),
            rgba(46, 230, 214, 0.3),
            rgba(200, 162, 74, 0.5)
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotateGlow 18s linear infinite;
          pointer-events: none;
        }
        @keyframes rotateGlow {
          to {
            transform: rotate(360deg);
          }
        }

        /* ---- Author avatar glow ---- */
        .avatar-glow {
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          border-radius: 50%;
          background: linear-gradient(135deg, #c8a24a, #8a6f2e);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.8rem;
          color: #1a0d3d;
          box-shadow: 0 0 25px rgba(200, 162, 74, 0.5);
          position: relative;
        }

        /* ---- Section title accent ---- */
        .section-title-accent {
          position: relative;
          display: inline-block;
        }
        .section-title-accent::after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -10px;
          transform: translateX(-50%);
          width: 64px;
          height: 3px;
          border-radius: 3px;
          background: linear-gradient(90deg, #7b2ff7, #c8a24a, #2ee6d6);
          background-size: 200% auto;
          animation: titleSheen 6s linear infinite;
        }

        /* ---- Related post cards ---- */
        .related-card {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          overflow: hidden;
          border: 1px solid rgba(200, 162, 74, 0.1);
          transition: transform 0.4s ease, box-shadow 0.4s ease,
            border-color 0.4s ease;
          position: relative;
        }
        .related-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 15px 35px rgba(123, 47, 247, 0.25),
            0 8px 20px rgba(200, 162, 74, 0.15);
          border-color: rgba(200, 162, 74, 0.35);
        }
        .related-card-sheen {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(123, 47, 247, 0.18),
            rgba(46, 230, 214, 0.12) 50%,
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
        }
        .related-card:hover .related-card-sheen {
          opacity: 1;
        }

        /* ---- Glowing button (not-found state) ---- */
        .glow-border-btn {
          padding: 12px 24px;
          border-radius: 8px;
          border: 1px solid rgba(200, 162, 74, 0.4);
          background: rgba(200, 162, 74, 0.1);
          color: #c8a24a;
          cursor: pointer;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .glow-border-btn:hover {
          box-shadow: 0 0 22px rgba(200, 162, 74, 0.4);
          transform: translateY(-2px);
        }

        /* ---- Loading text shimmer ---- */
        .loading-shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.5),
            #fff,
            rgba(255, 255, 255, 0.5)
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: titleSheen 2.2s linear infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .aurora-blob,
          .hero-sheen,
          .gradient-title,
          .content-card-glow,
          .section-title-accent::after,
          .loading-shimmer {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
