"use client";

import { useId } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";

/* ─────────────────────────────────────────────────────────────
   Custom SVG card frames (box1 / box2) replace the rounded-rect
   border on the 2×2 category grid. Two shapes alternate by
   `illustrationSide` (left → box1, right → box2).

   • viewBox — native viewBox, used by the visible fill + stroke
     SVGs with preserveAspectRatio="none" so they stretch to each
     card's real aspect ratio (no gaps).
   • clip    — the SAME path normalised to 0..1 for a
     <clipPath clipPathUnits="objectBoundingBox">, so the clipped
     background layers (cardBg gradient + image) stretch
     non-uniformly to fill the card box exactly like the fill/stroke
     do — no corner bleed past the curve.
   ───────────────────────────────────────────────────────────── */
const FRAMES = {
  box1: {
    viewBox: "0 0 500.7 315.8",
    path: "M438.6,304.6l-386.1,9.2c-22,.9-40.7-16.2-41.6-38.3L2,61c-.9-22,16.2-40.7,38.3-41.6L457.1,2c22-.9,40.7,16.2,41.6,38.3l-15,220.3c-4,25-23,43.1-45,44Z",
    clip: "M0.875974 0.964535l-0.77112 0.029132c-0.043938 0.00285 -0.081286 -0.051298 -0.083084 -0.121279L0.003994 0.19316c-0.001797 -0.069664 0.032355 -0.128879 0.076493 -0.131729L0.912922 0.006333c0.043938 -0.00285 0.081286 0.051298 0.083084 0.121279l-0.029958 0.697593c-0.007989 0.079164 -0.045936 0.136479 -0.089874 0.139329Z",
  },
  box2: {
    viewBox: "0 0 520.5 354",
    path: "M444.5,323.5l-394,28.5c-26.8,0-48.5-21.9-48.5-48.8V50.8C2,23.9,23.7,2,50.5,2h419.5c26.8,0,48.5,21.9,48.5,48.8l-27.8,231.2c-4,27-19.4,39.5-46.2,41.5Z",
    clip: "M0.853987 0.913842l-0.756964 0.080508c-0.051489 0 -0.09318 -0.061864 -0.09318 -0.137853V0.143503C0.003842 0.067514 0.045533 0.00565 0.097022 0.00565h0.805956c0.051489 0 0.09318 0.061864 0.09318 0.137853l-0.05341 0.653107c-0.007685 0.076271 -0.037272 0.111582 -0.088761 0.117232Z",
  },
} as const;

/* cardBg gradients as SVG stops (the exact two colors from each card's
   `linear-gradient(135deg, …)`). Used to paint the card fill INSIDE the
   frame SVG so the fill and the stroke share one path/coordinate system —
   that's what removes the faint inner duplicate outline (the old
   separately-clipped <div> rasterised on its own layer, landing a few px
   inside the stroke). 135° ≈ top-left → bottom-right (x1/y1 0→ x2/y2 1). */
const GRADIENTS = {
  "free-education": ["rgba(10,32,24,0.92)", "rgba(26,77,46,0.88)"],
  "book-intro": ["rgba(26,18,0,0.92)", "rgba(45,31,0,0.88)"],
  articles: ["rgba(4,14,36,0.92)", "rgba(13,30,61,0.88)"],
  poetry: ["rgba(18,8,40,0.92)", "rgba(42,16,80,0.88)"],
} as const;

const categories = [
  {
    id: "free-education",
    titleKey: "categories.freeEducation.title",
    descriptionKey: "categories.freeEducation.description",
    ctaTextKey: "categories.freeEducation.cta",
    ctaHref: "/tahririye/educational",
    icon: "book-open",
    themeColor: "#1a4d2e",
    borderColor: "#29D38A",
    glowColor: "rgba(41,211,138,0.3)",
    illustrationSide: "left" as const,
    cardBg:
      "linear-gradient(135deg, rgba(10,32,24,0.92) 0%, rgba(26,77,46,0.88) 100%)",
    image: "/images/tahririye/educational-card.webp",
  },
  {
    id: "book-intro",
    titleKey: "categories.bookIntro.title",
    descriptionKey: "categories.bookIntro.description",
    ctaTextKey: "categories.bookIntro.cta",
    ctaHref: "/tahririye/books",
    icon: "book",
    themeColor: "#3d2a00",
    borderColor: "#F0D28B",
    glowColor: "rgba(240,210,139,0.3)",
    illustrationSide: "right" as const,
    cardBg:
      "linear-gradient(135deg, rgba(26,18,0,0.92) 0%, rgba(45,31,0,0.88) 100%)",
    image: "/images/tahririye/books-card.webp",
  },
  {
    id: "articles",
    titleKey: "categories.articles.title",
    descriptionKey: "categories.articles.description",
    ctaTextKey: "categories.articles.cta",
    ctaHref: "/tahririye/articles",
    icon: "document",
    themeColor: "#0d1e3d",
    borderColor: "#4D9DFF",
    glowColor: "rgba(77,157,255,0.3)",
    illustrationSide: "left" as const,
    cardBg:
      "linear-gradient(135deg, rgba(4,14,36,0.92) 0%, rgba(13,30,61,0.88) 100%)",
    image: "/images/tahririye/articles-card.webp",
  },
  {
    id: "poetry",
    titleKey: "categories.poetry.title",
    descriptionKey: "categories.poetry.description",
    ctaTextKey: "categories.poetry.cta",
    ctaHref: "/tahririye/poetry",
    icon: "feather",
    themeColor: "#2a1050",
    borderColor: "#B07DFF",
    glowColor: "rgba(176,125,255,0.3)",
    illustrationSide: "right" as const,
    cardBg:
      "linear-gradient(135deg, rgba(18,8,40,0.92) 0%, rgba(42,16,80,0.88) 100%)",
    image: "/images/tahririye/poetry-card.webp",
    featuredVerseKey: "categories.poetry.verse",
  },
];

const IconSvg = ({ type, color }: { type: string; color: string }) => {
  const s: Record<string, React.ReactNode> = {
    "book-open": (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        width={22}
        height={22}
      >
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
        <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    book: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        width={22}
        height={22}
      >
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
      </svg>
    ),
    document: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        width={22}
        height={22}
      >
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    ),
    feather: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.3"
        width={22}
        height={22}
      >
        <path d="M20.24 12.24a6 6 0 00-8.49-8.49L5 10.5V19h8.5z" />
        <line x1="16" y1="8" x2="2" y2="22" />
      </svg>
    ),
  };
  return <>{s[type]}</>;
};

type Category = (typeof categories)[number];

function CategoryCard({
  card,
  index,
  t,
  isRTL,
}: {
  card: Category;
  index: number;
  t: (key: string) => string;
  isRTL: boolean;
}) {
  const uid = useId();
  const clipId = `tahrirye-clip-${uid}`;
  const gradId = `tahrirye-grad-${uid}`;

  const frame = card.illustrationSide === "left" ? FRAMES.box1 : FRAMES.box2;
  const verseKey = (card as { featuredVerseKey?: string }).featuredVerseKey;
  const grad = GRADIENTS[card.id as keyof typeof GRADIENTS];

  const title = t(card.titleKey);
  const description = t(card.descriptionKey);
  const ctaText = t(card.ctaTextKey);
  const verse = verseKey ? t(verseKey) : null;

  return (
    <Link
      href={card.ctaHref}
      aria-label={title}
      className="tahrirye-card"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        minHeight: 280,
        padding: "28px 50px",
        textDecoration: "none",
        color: "inherit",
        cursor: "pointer",
        transition: "transform 0.3s ease",
        animationDelay: `${index * 100}ms`,
        ["--frame-glow" as string]: "12px",
        direction: isRTL ? "rtl" : "ltr",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.setProperty(
          "--frame-glow",
          "22px",
        );
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.setProperty(
          "--frame-glow",
          "12px",
        );
      }}
    >
      <svg
        viewBox={frame.viewBox}
        preserveAspectRatio="none"
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          filter: `drop-shadow(0 0 var(--frame-glow) ${card.glowColor})`,
          transition: "filter 0.3s ease",
        }}
      >
        <defs>
          <clipPath id={clipId}>
            <path d={frame.path} />
          </clipPath>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor={grad[0]} />
            <stop offset="1" stopColor={grad[1]} />
          </linearGradient>
        </defs>

        <path d={frame.path} fill="rgba(7,7,20,0.55)" />

        <g clipPath={`url(#${clipId})`}>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill={`url(#${gradId})`}
          />
          <image
            href={card.image!}
            x="-7%"
            y="-7%"
            width="114%"
            height="114%"
            preserveAspectRatio="xMidYMid slice"
            opacity="0.55"
          />
        </g>

        <path
          d={frame.path}
          fill="none"
          stroke={card.borderColor}
          strokeWidth="2"
          strokeMiterlimit="10"
        />
      </svg>

      {/* ── Content ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          position: "relative",
          zIndex: 1,
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        <h2
          style={{
            fontFamily: "'Vazirmatn', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
            color: "#fff",
            margin: 0,
            flex: 1,
            textAlign: isRTL ? "right" : "left",
          }}
        >
          {title}
        </h2>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            border: `1px solid ${card.borderColor}`,
            flexShrink: 0,
            background: "rgba(255,255,255,0.08)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginRight: isRTL ? 0 : 12,
            marginLeft: isRTL ? 12 : 0,
          }}
        >
          <IconSvg type={card.icon} color={card.borderColor} />
        </div>
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        {verse ? (
          <div
            style={{
              fontFamily: "'Vazirmatn', serif",
              fontStyle: "italic",
              fontSize: "clamp(0.75rem, 1.5vw, 1.1rem)",
              color: "#F0D28B",
              lineHeight: 2,
              textAlign: isRTL ? "right" : "left",
              maxWidth: "70%",
              opacity: 0.9,
              whiteSpace: "pre-line",
              marginRight: isRTL ? 0 : "auto",
              marginLeft: isRTL ? "auto" : 0,
            }}
          >
            {verse}
          </div>
        ) : (
          <p
            style={{
              fontSize: "clamp(0.7rem, 1.2vw, 0.9rem)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.8,
              textAlign: isRTL ? "right" : "left",
              maxWidth: "70%",
              marginRight: isRTL ? 0 : "auto",
              marginLeft: isRTL ? "auto" : 0,
            }}
          >
            {description}
          </p>
        )}
      </div>

      <span
        className="tahrirye-cta"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          fontSize: "clamp(0.65rem, 1vw, 0.85rem)",
          color: card.borderColor,
          border: `1px solid ${card.borderColor}`,
          borderRadius: 100,
          padding: "6px 14px",
          background: "transparent",
          transition: "background 0.2s ease",
          direction: isRTL ? "rtl" : "ltr",
          alignSelf: isRTL ? "flex-end" : "flex-start",
          marginRight: isRTL ? 0 : 16,
          marginLeft: isRTL ? 16 : 0,
          position: "relative",
          zIndex: 1,
          ["--cta-fill" as string]: `${card.borderColor}1A`,
        }}
      >
        <span>{isRTL ? "›" : "‹"}</span>
        {ctaText}
      </span>
    </Link>
  );
}

export default function TahriryePage() {
  const t = useTranslations("tahririye");
  const { isRTL } = useLocale();

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        minHeight: "100vh",
        fontFamily: "'Vazirmatn', sans-serif",
        color: "#fff",
      }}
    >
      {/* Fixed background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: `
          radial-gradient(ellipse at ${
            isRTL ? "20%" : "80%"
          } 10%, rgba(180,130,20,0.35) 0%, transparent 45%),
          radial-gradient(ellipse at ${
            isRTL ? "80%" : "20%"
          } 50%, rgba(10,40,20,0.4) 0%, transparent 50%),
          radial-gradient(ellipse at 60% 80%, rgba(20,10,50,0.5) 0%, transparent 60%),
          linear-gradient(180deg, #040B1F 0%, #060D18 50%, #040812 100%)
        `,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            right: isRTL ? "auto" : 0,
            left: isRTL ? 0 : "auto",
            width: "55%",
            height: "55%",
            background: `
            conic-gradient(
              from ${isRTL ? "160deg" : "200deg"} at ${isRTL ? "5%" : "95%"} 5%,
              transparent 0deg,
              rgba(200,150,20,0.18) 8deg,
              transparent 16deg,
              rgba(200,150,20,0.12) 22deg,
              transparent 30deg,
              rgba(200,150,20,0.08) 36deg,
              transparent 44deg
            )
          `,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* ── HERO ── */}
        <section
          style={{
            textAlign: "center",
            padding: "80px 20px 32px",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: isRTL ? "auto" : "4%",
              right: isRTL ? "4%" : "auto",
              top: "8%",
              width: 60,
              opacity: 0.85,
              transform: isRTL ? "scaleX(-1) rotate(30deg)" : "rotate(30deg)",
              filter: "drop-shadow(0 0 20px rgba(240,180,30,0.5))",
            }}
          >
            <svg
              viewBox="0 0 48 96"
              fill="none"
              stroke="#F0D28B"
              strokeWidth="1"
              opacity={0.8}
              width={40}
              height={80}
            >
              <path
                d="M24 2 C20 20 10 40 8 60 C6 75 2 88 2 92 L24 88 L46 92 C46 88 42 75 40 60 C38 40 28 20 24 2Z"
                fill="rgba(240,210,139,0.15)"
              />
              <path d="M24 2 C22 20 14 38 12 58" opacity="0.6" />
              <path d="M24 2 C26 20 34 38 36 58" opacity="0.6" />
              <line x1="24" y1="30" x2="24" y2="80" opacity="0.4" />
            </svg>
          </div>

          <h1
            style={{
              fontFamily: "'Vazirmatn', serif",
              fontWeight: 700,
              fontSize: "clamp(3.5rem, 10vw, 10rem)",
              fontStyle: "italic",
              color: "#F0D28B",
              margin: 0,
              textShadow:
                "0 0 40px rgba(240,180,30,0.6), 0 0 80px rgba(240,160,10,0.3)",
            }}
          >
            {t("hero.title")}
          </h1>

          <p
            style={{
              fontSize: "clamp(0.7rem, 1.2vw, 1rem)",
              color: "rgba(240,210,139,0.75)",
              letterSpacing: "0.2em",
              marginTop: 8,
            }}
          >
            ◈ &nbsp; {t("hero.subtitle")} &nbsp; ◈
          </p>
        </section>

        {/* ── 2×2 CARD GRID ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
            maxWidth: 1100,
            margin: "0 auto",
            padding: "0 16px 60px",
            direction: isRTL ? "rtl" : "ltr",
          }}
        >
          {categories.map((card, i) => (
            <CategoryCard
              key={card.id}
              card={card}
              index={i}
              t={t}
              isRTL={isRTL}
            />
          ))}
        </div>

        {/* ── QUOTE BAR ── */}
        <div
          style={{
            textAlign: "center",
            fontSize: "clamp(0.7rem, 1.2vw, 0.95rem)",
            fontStyle: "italic",
            color: "rgba(240,210,139,0.6)",
            direction: isRTL ? "rtl" : "ltr",
            padding: "24px 16px 40px",
            letterSpacing: "0.05em",
          }}
        >
          ◈ &nbsp; &ldquo;{t("footer.quote")}&rdquo; &nbsp; ◈
        </div>
      </div>

      <style>{`
        @keyframes tahririye-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .tahrirye-card {
          opacity: 1;
          animation: tahririye-fade-in 0.5s ease both;
        }
        .tahrirye-card:hover .tahrirye-cta { background: var(--cta-fill); }
        @media (prefers-reduced-motion: reduce) {
          .tahrirye-card { animation: none; }
        }

        /* Mobile: single column */
        @media (max-width: 640px) {
          .tahrirye-card {
            min-height: 220px !important;
            padding: 20px 16px !important;
          }
          .tahrirye-card h2 {
            font-size: clamp(0.9rem, 4vw, 1.2rem) !important;
          }
          .tahrirye-card p,
          .tahrirye-card div[style*="font-style: italic"] {
            max-width: 100% !important;
            font-size: clamp(0.65rem, 2.5vw, 0.85rem) !important;
          }
          .tahrirye-card .tahrirye-cta {
            font-size: clamp(0.6rem, 2vw, 0.75rem) !important;
            padding: 4px 12px !important;
          }
        }
      `}</style>
    </main>
  );
}
