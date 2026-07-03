"use client";

import React from "react";
import Link from "next/link";

interface CTAButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  className?: string;
  size?: "small" | "default" | "large" | "fullWidth";
  "aria-label"?: string;
  type?: "button" | "submit" | "reset";
}

const FRAME_PATH =
  "M522.91 47.4326C516.31 46.5026 512.96 41.0626 512.96 31.2626C512.96 27.4426 511.9 24.6626 509.8 23.0126C508 21.5926 505.9 21.3726 504.49 21.4326C503.68 10.3126 493.3 8.30265 489.68 7.93265C489.48 4.93265 488.5 2.73265 486.75 1.39265C484.36 -0.457353 481.38 0.0126474 480.62 0.172647L43.38 0.172648C42.62 0.012648 39.64 -0.447353 37.25 1.39265C35.5 2.74265 34.52 4.94265 34.32 7.93265C30.7 8.29265 20.32 10.3126 19.51 21.4326C18.1 21.3826 16 21.5926 14.2 23.0126C12.1 24.6626 11.04 27.4426 11.04 31.2626C11.04 41.0626 7.69 46.5026 1.09 47.4326C0.46 47.5226 0 48.0526 0 48.6926C0 49.3326 0.47 49.8626 1.09 49.9526C7.7 50.8826 11.04 56.3226 11.04 66.1226C11.04 69.9426 12.1 72.7226 14.2 74.3726C16 75.7926 18.1 76.0126 19.51 75.9526C20.32 87.0726 30.7 89.0926 34.32 89.4526C34.52 92.4526 35.5 94.6526 37.25 95.9926C38.71 97.1226 40.39 97.3826 41.64 97.3826C42.44 97.3826 43.08 97.2726 43.38 97.2126H480.61C481.37 97.3726 484.35 97.8326 486.74 95.9926C488.49 94.6426 489.47 92.4426 489.67 89.4526C493.29 89.0926 503.67 87.0726 504.48 75.9526C505.89 76.0026 507.99 75.7926 509.79 74.3726C511.89 72.7226 512.95 69.9426 512.95 66.1226C512.95 56.3226 516.3 50.8826 522.9 49.9526C523.53 49.8626 523.99 49.3326 523.99 48.6926C523.99 48.0526 523.52 47.5226 522.9 47.4326H522.91Z";

const HOVER_CSS = `
  .lumina-cta:hover .lumina-cta-svg {
    filter: drop-shadow(0 0 20px rgba(212,175,100,0.6)) drop-shadow(0 0 40px rgba(212,175,100,0.2));
  }
  .lumina-cta:hover .lumina-cta-label {
    color: #f5d87a !important;
    text-shadow: 0 0 20px rgba(245, 216, 122, 0.3);
  }
  .lumina-cta:not([disabled]):hover {
    transform: translateY(-2px);
    filter: drop-shadow(0 10px 28px rgba(0,0,0,0.5)) drop-shadow(0 0 30px rgba(212,175,100,0.2)) !important;
  }
  .lumina-cta:not([disabled]):active {
    transform: translateY(0) scale(0.98);
  }
  .lumina-cta:focus-visible .lumina-cta-svg {
    filter: drop-shadow(0 0 0 3px rgba(245, 216, 122, 0.9));
  }
`;

// SVG Gradient Definition with richer gold colors
const GradientDefs = () => (
  <defs>
    <linearGradient id="goldenBorder" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stopColor="#f5d87a" stopOpacity="0.95" />
      <stop offset="25%" stopColor="#d4af64" stopOpacity="0.8" />
      <stop offset="50%" stopColor="#b88a3a" stopOpacity="0.6" />
      <stop offset="75%" stopColor="#d4af64" stopOpacity="0.8" />
      <stop offset="100%" stopColor="#f5d87a" stopOpacity="0.95" />
    </linearGradient>
    {/* Subtle glow filter */}
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur" />
      <feMerge>
        <feMergeNode in="coloredBlur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
);

export function CTAButton({
  children,
  onClick,
  href,
  disabled = false,
  className = "",
  size = "default",
  "aria-label": ariaLabel,
  type = "button",
}: CTAButtonProps) {
  const widthMap: Record<string, string> = {
    small: "clamp(130px, 100%, 150px)",
    default: "clamp(220px, 80vw, 320px)",
    large: "clamp(260px, 90vw, 380px)",
    fullWidth: "100%",
  };

  const fontMap: Record<string, string> = {
    small: "clamp(0.52rem, 1.6vw, 0.72rem)",
    default: "clamp(0.68rem, 2vw, 0.82rem)",
    large: "clamp(0.74rem, 2.2vw, 0.88rem)",
    fullWidth: "clamp(0.68rem, 2vw, 0.82rem)",
  };

  const containerStyle: React.CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: widthMap[size],
    maxWidth:
      size === "small" ? "100%" : size === "fullWidth" ? "460px" : undefined,
    minWidth: 0,
    height: "auto",
    background: "none",
    border: "none",
    padding: 0,
    margin: 0,
    textDecoration: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.4 : 1,
    filter:
      "drop-shadow(0 6px 18px rgba(0,0,0,0.4)) drop-shadow(0 0 12px rgba(212,175,100,0.1))",
    transition: "transform 0.25s ease, filter 0.25s ease, opacity 0.25s ease",
  };

  const svgStyle: React.CSSProperties = {
    width: "100%",
    height: "auto",
    display: "block",
    transition: "filter 0.25s ease",
  };

  const labelStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Playfair Display', Georgia, serif",
    fontSize: fontMap[size],
    fontWeight: 400,
    letterSpacing:
      size === "small" ? "0.12em" : size === "large" ? "0.18em" : "0.16em",
    textTransform: "uppercase",
    color: "#ffffff",
    whiteSpace: "nowrap",
    pointerEvents: "none",
    transition: "color 0.25s ease, text-shadow 0.25s ease",
    textShadow: "0 0 10px rgba(0,0,0,0.5)",
  };

  const inner = (
    <>
      <style>{HOVER_CSS}</style>
      <svg
        width="524"
        height="98"
        viewBox="0 0 524 98"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="lumina-cta-svg"
        style={svgStyle}
        aria-hidden="true"
      >
        <GradientDefs />
        {/* Mobile stroke: 3, Desktop stroke: 4.5 */}
        <path
          d={FRAME_PATH}
          fill="none"
          stroke="url(#goldenBorder)"
          strokeWidth="clamp(3px, 0.85vw, 4.5px)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Secondary subtle glow layer - scales with main stroke */}
        <path
          d={FRAME_PATH}
          fill="none"
          stroke="url(#goldenBorder)"
          strokeWidth="clamp(5px, 1.4vw, 7px)"
          opacity="0.15"
          filter="url(#glow)"
        />
        {/* Extra inner highlight for elegance */}
        <path
          d={FRAME_PATH}
          fill="none"
          stroke="rgba(245, 216, 122, 0.5)"
          strokeWidth="clamp(1px, 0.25vw, 5.5px)"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="lumina-cta-label" style={labelStyle}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className={`lumina-cta ${className}`}
        style={containerStyle}
        aria-label={ariaLabel}
        aria-disabled={disabled}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      className={`lumina-cta ${className}`}
      style={containerStyle}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      type={type}
    >
      {inner}
    </button>
  );
}

export default CTAButton;
