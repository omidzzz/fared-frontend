// components/ui/BlogCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import type { BlogArticle } from "@/lib/api";

interface BlogCardProps {
  article: BlogArticle;
}

export default function BlogCard({ article }: BlogCardProps) {
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("fa-IR")
    : article.createdAt;

  return (
    <Link href={`/blog/${article.slug}`} style={{ textDecoration: "none" }}>
      <div
        style={{
          background: "rgba(255,255,255,0.05)",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid rgba(255,255,255,0.08)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "none";
        }}
      >
        <div style={{ position: "relative", height: "180px", width: "100%" }}>
          <Image
            src={article.image || "/images/default-thumbnail.jpg"}
            alt={article.titleFA}
            fill
            className="object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "8px",
              right: "8px",
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              color: "#c8a24a",
              padding: "2px 10px",
              borderRadius: "12px",
              fontSize: "0.65rem",
              fontWeight: 500,
            }}
          >
            {article.categoryFA}
          </div>
        </div>
        <div
          style={{
            padding: "16px",
            flex: 1,
            display: "flex",
            flexDirection: "column",
          }}
          dir="rtl"
        >
          <h3
            style={{
              color: "#fff",
              fontSize: "1rem",
              fontWeight: 600,
              marginBottom: "8px",
              lineHeight: 1.4,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              minHeight: "2.8rem",
            }}
          >
            {article.titleFA}
          </h3>
          <p
            style={{
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              marginBottom: "12px",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {article.excerptFA}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "rgba(255,255,255,0.4)",
              fontSize: "0.7rem",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "12px",
              marginTop: "auto",
            }}
          >
            <span>{article.authorFA}</span>
            <span>{article.readMinutes} دقیقه</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
