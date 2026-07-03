"use client";
import { useState, useEffect, useRef, useCallback } from "react";

interface ResponsiveCarouselProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  /** Items visible per slide on tablet (default: 2) */
  tabletItemsPerSlide?: number;
  /** Columns on desktop grid (default: 4) */
  desktopColumns?: number;
  autoplayMs?: number;
  className?: string;
}

// ── shared slider logic ──────────────────────────────────────────────
function useSlider(totalSlides: number, autoplayMs: number) {
  const [active, setActive] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(
    () => setActive((i) => (i + 1) % totalSlides),
    [totalSlides],
  );
  const prev = useCallback(
    () => setActive((i) => (i - 1 + totalSlides) % totalSlides),
    [totalSlides],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(next, autoplayMs);
  }, [next, autoplayMs]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = () => {
    prev();
    resetTimer();
  };
  const handleNext = () => {
    next();
    resetTimer();
  };
  const handleDot = (i: number) => {
    setActive(i);
    resetTimer();
  };

  return { active, handlePrev, handleNext, handleDot };
}

// ── nav arrow ────────────────────────────────────────────────────────
const NavArrow = ({
  direction,
  onClick,
  label,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
}) => (
  <button
    onClick={onClick}
    aria-label={label}
    className={`absolute ${
      direction === "prev" ? "right-4" : "left-4"
    } top-1/2 -translate-y-1/2 z-10`}
    style={{
      width: 36,
      height: 36,
      borderRadius: "50%",
      background:
        "linear-gradient(160deg, rgba(96,46,160,0.85), rgba(43,18,90,0.9))",
      border: "1px solid rgba(231,193,111,0.5)",
      boxShadow: "0 0 16px rgba(120,60,190,0.4)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#F5D79C"
      strokeWidth="2.2"
      strokeLinecap="round"
    >
      {direction === "prev" ? (
        <polyline points="9 18 15 12 9 6" />
      ) : (
        <polyline points="15 18 9 12 15 6" />
      )}
    </svg>
  </button>
);

// ── dots ─────────────────────────────────────────────────────────────
const Dots = ({
  count,
  active,
  onDot,
}: {
  count: number;
  active: number;
  onDot: (i: number) => void;
}) => (
  <div className="flex justify-center gap-2 mt-6">
    {Array.from({ length: count }).map((_, i) => (
      <button
        key={i}
        onClick={() => onDot(i)}
        className={`h-1.5 rounded-full transition-all ${
          i === active
            ? "w-6 bg-gradient-to-r from-[#FECB7D] to-[#f0d090] shadow"
            : "w-1.5 bg-[rgba(231,193,111,0.25)]"
        }`}
      />
    ))}
  </div>
);

// ── main export ──────────────────────────────────────────────────────
export function ResponsiveCarousel<T>({
  items,
  renderItem,
  tabletItemsPerSlide = 2,
  desktopColumns = 4,
  autoplayMs = 3500,
  className = "",
}: ResponsiveCarouselProps<T>) {
  const mobileSlider = useSlider(items.length, autoplayMs);

  const tabletSlides = Math.ceil(items.length / tabletItemsPerSlide);
  const tabletSlider = useSlider(tabletSlides, autoplayMs + 500);

  const tabletVisible = items.slice(
    tabletSlider.active * tabletItemsPerSlide,
    tabletSlider.active * tabletItemsPerSlide + tabletItemsPerSlide,
  );

  return (
    <>
      {/* Mobile — 1 item */}
      <div className={`md:hidden relative px-4 ${className}`} dir="rtl">
        <div
          key={mobileSlider.active}
          style={{ animation: "fadeSlide 0.35s ease forwards" }}
        >
          {renderItem(items[mobileSlider.active], mobileSlider.active)}
        </div>
        <NavArrow
          direction="prev"
          onClick={mobileSlider.handlePrev}
          label="قبلی"
        />
        <NavArrow
          direction="next"
          onClick={mobileSlider.handleNext}
          label="بعدی"
        />
        <Dots
          count={items.length}
          active={mobileSlider.active}
          onDot={mobileSlider.handleDot}
        />
      </div>

      {/* Tablet — N items per slide */}
      <div
        className={`hidden md:block lg:hidden relative px-4 ${className}`}
        dir="rtl"
      >
        <div
          key={tabletSlider.active}
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${tabletItemsPerSlide}, 1fr)`,
            gap: "18px",
            animation: "fadeSlide 0.35s ease forwards",
          }}
        >
          {tabletVisible.map((item, i) => renderItem(item, i))}
        </div>
        <NavArrow
          direction="prev"
          onClick={tabletSlider.handlePrev}
          label="قبلی"
        />
        <NavArrow
          direction="next"
          onClick={tabletSlider.handleNext}
          label="بعدی"
        />
        <Dots
          count={tabletSlides}
          active={tabletSlider.active}
          onDot={tabletSlider.handleDot}
        />
      </div>

      {/* Desktop — full grid */}
      <div
        className={`hidden lg:grid gap-[18px] px-4 lg:px-8 mx-auto ${className}`}
        style={{
          maxWidth: 1200,
          gridTemplateColumns: `repeat(${desktopColumns}, 1fr)`,
        }}
      >
        {items.map((item, i) => renderItem(item, i))}
      </div>
    </>
  );
}
