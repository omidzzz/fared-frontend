"use client";

import { useRef, useState, useLayoutEffect, useId } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import type { Stone } from "@/lib/mock-data";

const NATIVE_W = 463.37;
const NATIVE_H = 727.24;
const DEFAULT_SCALE = 260 / NATIVE_W;

// Image occupies top 62% of the gem. Info section sits in the remaining 38%.
// We add a small top margin so text clears the image/tint gradient.
const IMAGE_PCT = 0.62;

interface CrystalCardProps {
  stone: Stone;
}

export default function CrystalCard({ stone }: CrystalCardProps) {
  const { addItem } = useCart();
  const t = useTranslations("crystals");
  const { isRTL } = useLocale();
  const frameRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(DEFAULT_SCALE);
  const clipId = useId();

  useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const update = () => {
      if (frameRef.current) setScale(frameRef.current.offsetWidth / NATIVE_W);
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: stone.id,
      productType: "stone",
      name: stone.name,
      nameFA: stone.nameFA,
      price: stone.price,
      currency: "IRT" as const,
      quantity: 1,
      image: stone.image,
    });
  };

  // Actual rendered pixel height of the frame div
  const frameH = NATIVE_H * scale;
  const infoTop = frameH * IMAGE_PCT; // px from top of frame where info starts
  const infoBottom = frameH * 0.06; // leave room above the [+] button
  const infoHeight = frameH - infoTop - infoBottom;

  return (
    <Link
      href={`/shop/stones/${stone.id}`}
      style={{ textDecoration: "none", display: "block" }}
    >
      <div
        ref={frameRef}
        className="crystal-card-frame"
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: `${NATIVE_W} / ${NATIVE_H}`,
          overflow: "visible",
          cursor: "pointer",
          transition: "transform 0.3s ease, filter 0.3s ease",
          direction: isRTL ? "rtl" : "ltr",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.filter =
            "drop-shadow(0 8px 32px rgba(255,195,173,0.4))";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.filter = "none";
        }}
      >
        {/* ── ClipPath definition ── */}
        <svg
          width="0"
          height="0"
          style={{ position: "absolute" }}
          aria-hidden="true"
        >
          <defs>
            <clipPath id={clipId} clipPathUnits="userSpaceOnUse">
              <path
                d="M226.96,725.03c-66.52-.17-131.45-.12-197.98-.29,0,0-2.1-3.71-10.1-13.71s-16-17-16-17c0,0-2-652,0-657s17.64-11.84,23.5-25.5C30.89,1.03,40.49,2.03,40.49,2.03c127.47.07,249.03.64,376.5.71,0,0,15.5-1.5,20,9,5.86,13.66,21.5,20.5,23.5,25.5s0,657,0,657c0,0-8,7-16,17s-10.5,13.5-10.5,13.5l-197.57.5-9.45-.21Z"
                transform="translate(231.685, 363.62) scale(0.993) translate(-231.685, -363.62)"
              />
            </clipPath>
          </defs>
        </svg>

        {/* ── Scaled gem shell (image + tint + stroke) ── */}
        <div style={{ position: "absolute", inset: 0, overflow: "visible" }}>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: `${NATIVE_W}px`,
              height: `${NATIVE_H}px`,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            {/* Tint fill */}
            <svg
              viewBox={`0 0 ${NATIVE_W} ${NATIVE_H}`}
              width={NATIVE_W}
              height={NATIVE_H}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 0,
              }}
              aria-hidden="true"
            >
              <path
                d="M226.96,725.03c-66.52-.17-131.45-.12-197.98-.29,0,0-2.1-3.71-10.1-13.71s-16-17-16-17c0,0-2-652,0-657s17.64-11.84,23.5-25.5C30.89,1.03,40.49,2.03,40.49,2.03c127.47.07,249.03.64,376.5.71,0,0,15.5-1.5,20,9,5.86,13.66,21.5,20.5,23.5,25.5s0,657,0,657c0,0-8,7-16,17s-10.5,13.5-10.5,13.5l-197.57.5-9.45-.21Z"
                fill="rgba(26, 10, 61, 0.35)"
                stroke="none"
              />
            </svg>

            {/* Image + gradient — clipped to gem */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                clipPath: `url(#${clipId})`,
                zIndex: 1,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "70%",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={stone.image}
                  alt={stone.name}
                  fill
                  sizes="(min-width: 1024px) 20vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "60%",
                    background:
                      "linear-gradient(to top, rgba(26,10,61,0.8) 0%, transparent 100%)",
                  }}
                />
              </div>
            </div>

            {/* Gem stroke */}
            <svg
              className="crystal-card-frame-svg"
              viewBox={`0 0 ${NATIVE_W} ${NATIVE_H}`}
              width={NATIVE_W}
              height={NATIVE_H}
              style={{
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                zIndex: 2,
              }}
              aria-hidden="true"
            >
              <path
                d="M226.96,725.03c-66.52-.17-131.45-.12-197.98-.29,0,0-2.1-3.71-10.1-13.71s-16-17-16-17c0,0-2-652,0-657s17.64-11.84,23.5-25.5C30.89,1.03,40.49,2.03,40.49,2.03c127.47.07,249.03.64,376.5.71,0,0,15.5-1.5,20,9,5.86,13.66,21.5,20.5,23.5,25.5s0,657,0,657c0,0-8,7-16,17s-10.5,13.5-10.5,13.5l-197.57.5-9.45-.21Z"
                fill="none"
                stroke="#ffc3ad"
                strokeMiterlimit="10"
                strokeWidth="4"
              />
            </svg>
          </div>
        </div>

        {/*
          ── Info section — lives OUTSIDE the scaled wrapper ──
          Positioned in real frame pixels so font sizes are always correct
          regardless of how small the card is on mobile.
        */}
        <div
          className="crystal-card-info"
          style={{
            position: "absolute",
            top: `${IMAGE_PCT * 100}%`,
            left: "10%",
            right: "10%",
            // bottom clearance so price never overlaps the [+] button
            bottom: "0%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "3px",
            textAlign: isRTL ? "right" : "center",
            overflow: "hidden",
            zIndex: 3,
            pointerEvents: "none",
          }}
        >
          <h3
            className="crystal-card-name"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              // clamp: never smaller than 9px, never larger than 14px
              fontSize: "clamp(9px, 3.2cqi, 14px)",
              fontWeight: 600,
              color: "#ffffff",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              margin: 0,
              lineHeight: 1.2,
              // allow wrapping but cap at 2 lines
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical" as const,
              overflow: "hidden",
              width: "100%",
              textAlign: "center",
            }}
          >
            {isRTL ? stone.nameFA : stone.name}
          </h3>

          <p
            className="crystal-card-props"
            style={{
              fontSize: "clamp(7px, 2.4cqi, 11px)",
              color: "rgba(255,255,255,0.6)",
              margin: 0,
              lineHeight: 1.3,
              // single line, truncate if too long
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              textAlign: "center",
              direction: isRTL ? "rtl" : "ltr",
            }}
          >
            · {stone.properties?.slice(0, 3).join(" · ")} ·
          </p>

          <div
            style={{
              width: "60%",
              borderTop: "1px solid rgba(212,175,100,0.3)",
              margin: "2px 0",
              flexShrink: 0,
            }}
          />

          <p
            className="crystal-card-price"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: "clamp(10px, 3.6cqi, 16px)",
              fontWeight: 600,
              color: "#d4af64",
              margin: 0,
              lineHeight: 1,
              flexShrink: 0,
              textAlign: isRTL ? "right" : "center",
            }}
          >
            {stone.price.toFixed(2)} تومان
          </p>
        </div>

        {/* ── [+] button ── */}
        <button
          onClick={handleAdd}
          className="crystal-card-cart-btn"
          style={{
            position: "absolute",
            bottom: 0,
            left: "50%",
            transform: "translate(-50%, 50%)",
            width: "24px",
            height: "24px",
            borderRadius: "50%",
            border: "1px solid rgba(255, 195, 173, 0.6)",
            background: "rgba(10, 5, 30, 0.8)",
            backdropFilter: "blur(4px)",
            color: "rgba(255, 195, 173, 0.9)",
            fontSize: "14px",
            lineHeight: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,195,173,0.2)";
            e.currentTarget.style.borderColor = "rgba(255,195,173,1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(10,5,30,0.8)";
            e.currentTarget.style.borderColor = "rgba(255,195,173,0.6)";
          }}
          aria-label={t("addToCart", { name: stone.name })}
        >
          +
        </button>
      </div>
    </Link>
  );
}
