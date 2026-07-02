"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CTAButton from "@/components/ui/CTAButton";
import AccessoryCard from "@/components/ui/AccessoryCard";
import ShopHero from "@/components/aura/ShopHero";
import { useCart } from "@/hooks/useCart";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { getAccessories } from "@/lib/api";

export default function AccessoriesPage() {
  const [accessories, setAccessories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { totalItems } = useCart();
  const t = useTranslations();
  const { isRTL } = useLocale();

  useEffect(() => {
    async function loadAccessories() {
      try {
        const data = await getAccessories();
        setAccessories(data);
      } catch (error) {
        console.error('Failed to load accessories:', error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAccessories();
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen" style={{ background: "#1a0d3d" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
          <p style={{ color: "#fff" }}>Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen" dir={isRTL ? "rtl" : "ltr"} style={{ background: "#1a0d3d" }}>
      {/* Fixed Background */}
      <div style={{ position: "fixed", inset: 0, zIndex: 0 }}>
        <Image
          src="/images/hero-backgrounds/accessories-hero.webp"
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
              "linear-gradient(180deg, rgba(26,13,61,0.5) 0%, transparent 30%, transparent 65%, rgba(26,13,61,0.8) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, paddingTop: "96px" }}>
        <ShopHero
          namespace="accessories"
          titleKey="title"
          subtitleKey="subtitle"
          ctaKey="explore"
          fullWidth={true}
        />

        <div
          style={{
            padding: "40px clamp(20px, 5vw, 80px)",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {accessories.map((accessory) => (
              <AccessoryCard key={accessory.id} accessory={accessory} />
            ))}
          </div>

          {accessories.length === 0 && (
            <p style={{ color: "#fff", textAlign: "center", padding: "40px" }}>
              No accessories found
            </p>
          )}
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
    </main>
  );
}