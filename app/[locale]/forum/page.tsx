"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";

/* ── Data ── */

const categories = [
  { id: "all", key: "all" },
  { id: "crystal-healing", key: "crystalHealing" },
  { id: "meditation", key: "meditation" },
  { id: "energy-work", key: "energyWork" },
  { id: "moon-rituals", key: "moonRituals" },
  { id: "personal-journey", key: "personalJourney" },
  { id: "knowledge", key: "knowledge" },
  { id: "questions", key: "questions" },
  { id: "conscious-living", key: "consciousLiving" },
];

const posts = [
  {
    id: 1,
    author: "Aurora Moon",
    category: "Personal Journey",
    date: "May 18, 2025",
    titleKey: "posts.amethyst.title",
    excerptKey: "posts.amethyst.excerpt",
    comments: 18,
    type: "post",
  },
  {
    id: 2,
    author: "Luna Hart",
    category: "Moon Rituals",
    date: "May 17, 2025",
    titleKey: "posts.fullMoon.title",
    excerptKey: "posts.fullMoon.excerpt",
    comments: 19,
    type: "post",
  },
  {
    id: 3,
    author: "Solene Light",
    category: "Energy Work",
    date: "May 16, 2025",
    titleKey: "posts.selenite.title",
    excerptKey: "posts.selenite.excerpt",
    comments: 16,
    type: "post",
  },
  {
    id: "fard-quote",
    type: "founder-quote",
  },
  {
    id: 4,
    author: "Isabella Rose",
    category: "Crystal Healing",
    date: "May 15, 2025",
    titleKey: "posts.labradorite.title",
    excerptKey: "posts.labradorite.excerpt",
    comments: 20,
    type: "post",
  },
  {
    id: 5,
    author: "Maya Willow",
    category: "Meditation",
    date: "May 14, 2025",
    titleKey: "posts.clearQuartz.title",
    excerptKey: "posts.clearQuartz.excerpt",
    comments: 14,
    type: "post",
  },
];

/* ── Components ── */

function HeroSection() {
  const t = useTranslations("forum");
  const { isRTL } = useLocale();

  return (
    <section
      style={{
        minHeight: "55vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "120px 40px 60px",
        position: "relative",
      }}
    >
      {/* Sacred geometry circles */}
      <div
        style={{
          position: "absolute",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          border: "1px solid rgba(212,175,100,0.12)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "280px",
          height: "280px",
          borderRadius: "50%",
          border: "1px solid rgba(212,175,100,0.08)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }}
      />

      {/* Star sparkle */}
      <div
        style={{ fontSize: "1.4rem", color: "#d4af64", marginBottom: "16px" }}
      >
        ✦
      </div>

      {/* Eyebrow */}
      <p
        style={{
          fontSize: "0.72rem",
          letterSpacing: "0.3em",
          color: "rgba(212,175,100,0.8)",
          marginBottom: "16px",
          textTransform: "uppercase",
        }}
      >
        {t("hero.eyebrow")}
      </p>

      {/* Main title */}
      <h1
        style={{
          fontFamily: isRTL
            ? "'Vazirmatn', 'IranSans', sans-serif"
            : "'Playfair Display', Georgia, serif",
          fontSize: isRTL
            ? "clamp(2.4rem, 5vw, 4rem)"
            : "clamp(2.8rem, 5vw, 4.5rem)",
          fontWeight: isRTL ? 700 : 600,
          color: "#ffffff",
          lineHeight: isRTL ? 1.3 : 1.15,
          maxWidth: "700px",
          marginBottom: "20px",
        }}
      >
        {t("hero.title")}
      </h1>

      {/* Gold ornament divider */}
      <div
        style={{ position: "relative", width: "120px", margin: "0 auto 20px" }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(212,175,100,0.4)",
            width: "100%",
          }}
        />
        <span
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "#d4af64",
            fontSize: "8px",
            lineHeight: 0,
          }}
        >
          ◆
        </span>
      </div>

      {/* Subtitle */}
      <p
        style={{
          fontSize: isRTL ? "0.9rem" : "1rem",
          color: "rgba(255,255,255,0.7)",
          lineHeight: isRTL ? 1.8 : 1.7,
          maxWidth: "480px",
          marginBottom: "0",
          fontFamily: isRTL ? "'Vazirmatn', 'IranSans', sans-serif" : "inherit",
        }}
      >
        {t("hero.subtitle")}
      </p>
    </section>
  );
}

function FilterBar({
  activeFilter,
  onFilterChange,
}: {
  activeFilter: string;
  onFilterChange: (id: string) => void;
}) {
  const t = useTranslations("forum");
  const { isRTL } = useLocale();

  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        padding: "0 40px 16px",
        maxWidth: "900px",
        margin: "0 auto",
        justifyContent: isRTL ? "flex-end" : "flex-start",
      }}
    >
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onFilterChange(cat.id)}
          style={{
            padding: "8px 18px",
            borderRadius: "100px",
            border: `1px solid ${
              activeFilter === cat.id
                ? "rgba(212,175,100,0.8)"
                : "rgba(255,255,255,0.2)"
            }`,
            background:
              activeFilter === cat.id
                ? "rgba(212,175,100,0.15)"
                : "transparent",
            color:
              activeFilter === cat.id ? "#ffffff" : "rgba(255,255,255,0.6)",
            fontSize: isRTL ? "0.72rem" : "0.78rem",
            cursor: "pointer",
            fontWeight: activeFilter === cat.id ? 600 : 400,
            transition: "all 0.2s ease",
            fontFamily: isRTL
              ? "'Vazirmatn', 'IranSans', sans-serif"
              : "inherit",
          }}
        >
          {t(`categories.${cat.key}`)}
        </button>
      ))}
    </div>
  );
}

function SearchBar({
  query,
  onChange,
}: {
  query: string;
  onChange: (q: string) => void;
}) {
  const t = useTranslations("forum");
  const { isRTL } = useLocale();

  return (
    <div
      style={{
        padding: "0 40px 32px",
        maxWidth: "900px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "12px",
          padding: "14px 20px",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
      >
        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: "1rem" }}>
          🔍
        </span>
        <input
          type="text"
          placeholder={t("search.placeholder")}
          value={query}
          onChange={(e) => onChange(e.target.value)}
          style={{
            flex: 1,
            background: "none",
            border: "none",
            outline: "none",
            color: "#ffffff",
            fontSize: "0.9rem",
            textAlign: isRTL ? "right" : "left",
            fontFamily: isRTL
              ? "'Vazirmatn', 'IranSans', sans-serif"
              : "inherit",
          }}
        />
      </div>
    </div>
  );
}

function PostCard({ post }: { post: any }) {
  const t = useTranslations("forum");
  const { isRTL } = useLocale();

  return (
    <Link
      href={`/forum/${post.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        dir={isRTL ? "rtl" : "ltr"}
        style={{
          display: "flex",
          alignItems: "flex-start",
          gap: "20px",
          padding: "24px",
          background: "rgba(15, 8, 40, 0.65)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "16px",
          transition: "border-color 0.2s ease, background 0.2s ease",
          cursor: "pointer",
          flexDirection: isRTL ? "row-reverse" : "row",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "rgba(212,175,100,0.25)";
          e.currentTarget.style.background = "rgba(15,8,40,0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.background = "rgba(15,8,40,0.65)";
        }}
      >
        {/* Author avatar + info */}
        <div
          style={{
            flexShrink: 0,
            textAlign: "center",
            width: "80px",
            order: isRTL ? 2 : 1,
          }}
        >
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "2px solid rgba(212,175,100,0.4)",
              overflow: "hidden",
              margin: "0 auto 8px",
              background: "rgba(212,175,100,0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
              color: "#d4af64",
            }}
          >
            <span>{post.author[0]}</span>
          </div>
          <p
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: "#ffffff",
              marginBottom: "2px",
            }}
          >
            {post.author}
          </p>
          <p style={{ fontSize: "0.62rem", color: "#d4af64" }}>
            {post.category}
          </p>
          <p
            style={{
              fontSize: "0.6rem",
              color: "rgba(255,255,255,0.4)",
              marginTop: "2px",
            }}
          >
            {post.date}
          </p>
        </div>

        {/* Post content */}
        <div
          style={{
            flex: 1,
            minWidth: 0,
            textAlign: isRTL ? "right" : "left",
            order: isRTL ? 1 : 2,
          }}
        >
          <h3
            style={{
              fontFamily: isRTL
                ? "'Vazirmatn', 'IranSans', sans-serif"
                : "'Playfair Display', Georgia, serif",
              fontSize: isRTL ? "1rem" : "1.1rem",
              fontWeight: isRTL ? 700 : 600,
              color: "#ffffff",
              marginBottom: "8px",
              lineHeight: isRTL ? 1.4 : 1.3,
            }}
          >
            {t(post.titleKey)}
          </h3>
          <p
            style={{
              fontSize: isRTL ? "0.78rem" : "0.82rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: isRTL ? 1.8 : 1.6,
              fontFamily: isRTL
                ? "'Vazirmatn', 'IranSans', sans-serif"
                : "inherit",
            }}
          >
            {t(post.excerptKey)}
          </p>
        </div>

        {/* Comment count */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            gap: "4px",
            color: "rgba(255,255,255,0.5)",
            fontSize: "0.8rem",
            minWidth: "36px",
            justifyContent: "center",
            order: isRTL ? 0 : 3,
          }}
        >
          <span>💬 {post.comments}</span>
        </div>
      </div>
    </Link>
  );
}

function FounderQuoteCard() {
  const t = useTranslations("forum");
  const { isRTL } = useLocale();

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "28px 32px",
        background: "rgba(40, 15, 80, 0.7)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(212,175,100,0.2)",
        borderRadius: "16px",
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
    >
      {/* Fard avatar */}
      <div
        style={{
          flexShrink: 0,
          order: isRTL ? 2 : 1,
        }}
      >
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            border: "2px solid rgba(212,175,100,0.5)",
            overflow: "hidden",
            background: "rgba(212,175,100,0.1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
          }}
        >
          F
        </div>
        <p
          style={{
            fontSize: "0.72rem",
            color: "#d4af64",
            textAlign: "center",
            marginTop: "6px",
          }}
        >
          {t("founder.name")}
        </p>
        <p
          style={{
            fontSize: "0.62rem",
            color: "rgba(255,255,255,0.45)",
            textAlign: "center",
          }}
        >
          {t("founder.title")}
        </p>
      </div>

      {/* Quote */}
      <p
        style={{
          fontFamily: isRTL
            ? "'Vazirmatn', 'IranSans', sans-serif"
            : "'Playfair Display', Georgia, serif",
          fontStyle: "italic",
          fontSize: isRTL ? "1rem" : "1.1rem",
          color: "#d4af64",
          lineHeight: isRTL ? 1.8 : 1.7,
          flex: 1,
          textAlign: isRTL ? "right" : "left",
          order: isRTL ? 1 : 2,
        }}
      >
        &ldquo;{t("founder.quote")}&rdquo;
      </p>

      <Link
        href="/about"
        style={{
          flexShrink: 0,
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.6)",
          textDecoration: "none",
          whiteSpace: "nowrap",
          order: isRTL ? 0 : 3,
        }}
      >
        {t("founder.readReflection")} {isRTL ? "←" : "→"}
      </Link>
    </div>
  );
}

function PostFeed({ posts }: { posts: any[] }) {
  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "0 40px",
        display: "flex",
        flexDirection: "column",
        gap: "12px",
      }}
    >
      {posts.map((post) =>
        post.type === "founder-quote" ? (
          <FounderQuoteCard key={post.id} />
        ) : (
          <PostCard key={post.id} post={post} />
        ),
      )}
    </div>
  );
}

function ShareWisdomBanner() {
  const t = useTranslations("forum");
  const { isRTL } = useLocale();

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto 80px",
        padding: "0 40px",
      }}
    >
      <div
        style={{
          padding: "40px 48px",
          background: "rgba(20, 8, 50, 0.75)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(212,175,100,0.2)",
          borderRadius: "20px",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontFamily: isRTL
              ? "'Vazirmatn', 'IranSans', sans-serif"
              : "'Playfair Display', Georgia, serif",
            fontSize: isRTL ? "1.8rem" : "2rem",
            fontWeight: isRTL ? 700 : 600,
            color: "#d4af64",
            marginBottom: "12px",
          }}
        >
          {t("share.title")}
        </h2>
        <p
          style={{
            fontSize: isRTL ? "0.82rem" : "0.88rem",
            color: "rgba(255,255,255,0.65)",
            lineHeight: isRTL ? 1.8 : 1.6,
            maxWidth: "480px",
            margin: "0 auto",
            fontFamily: isRTL
              ? "'Vazirmatn', 'IranSans', sans-serif"
              : "inherit",
          }}
        >
          {t("share.subtitle")}
        </p>
      </div>
    </div>
  );
}

/* ── Page ── */

export default function CommunityPage() {
  const t = useTranslations("forum");
  const { isRTL } = useLocale();
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = posts.filter((post: any) => {
    if (post.type === "founder-quote") return true;
    const matchesFilter =
      activeFilter === "all" ||
      post.category.toLowerCase().replace(" ", "-") === activeFilter;
    const matchesSearch =
      !searchQuery ||
      t(post.titleKey).toLowerCase().includes(searchQuery.toLowerCase()) ||
      t(post.excerptKey).toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <main dir={isRTL ? "rtl" : "ltr"}>
      {/* Fixed background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: "url(/images/hero-backgrounds/mentorship-bg.webp)",
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      />

      {/* Scrollable content */}
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <HeroSection />
        <FilterBar
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
        <SearchBar query={searchQuery} onChange={setSearchQuery} />
        <PostFeed posts={filteredPosts} />
        <ShareWisdomBanner />
      </div>
    </main>
  );
}
