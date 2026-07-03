"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";

const PANEL_PATH =
  "M273.785 67.2924V65.7286C273.785 50.6882 256.492 38.4976 235.156 38.4976H234.443V33.3594C234.443 4.64918 194.969 28.6377 173.452 18.6269C161.023 12.8426 152.497 0 152.497 0C152.497 0 143.977 12.8426 131.542 18.6269C110.025 28.6377 70.5566 4.64314 70.5566 33.3594V38.4976H69.8436C48.508 38.4976 31.2148 50.6882 31.2148 65.7286V67.2924C13.6436 69.2426 0 83.486 0 100.779V475.221C0 492.514 13.6436 506.757 31.2148 508.708V510.271C31.2148 525.312 48.508 537.502 69.8436 537.502H70.5566V542.641C70.5566 571.351 110.031 547.356 131.542 557.373C143.971 563.157 152.497 576 152.497 576C152.497 576 161.017 563.157 173.452 557.373C194.969 547.362 234.443 571.357 234.443 542.641V537.502H235.156C256.492 537.502 273.785 525.312 273.785 510.271V508.708C291.356 506.757 305 492.514 305 475.221V100.779C305 83.486 291.356 69.2426 273.785 67.2924Z";

const glassBg =
  "linear-gradient(180deg, rgba(8,26,27,0.72), rgba(5,16,15,0.6))";

// ─── DATA ───
const COURSES_SIDE_NAV = [
  {
    label: "انرژی",
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <defs>
          <linearGradient id="energyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f5d87a" />
            <stop offset="100%" stopColor="#c79a3f" />
          </linearGradient>
        </defs>
        <polygon
          points="13,2 15.5,9.5 23,9.5 17,14.5 19.5,22 13,17.5 6.5,22 9,14.5 3,9.5 10.5,9.5"
          stroke="url(#energyGrad)"
          strokeWidth="1.4"
          fill="rgba(245,216,122,0.15)"
          strokeLinejoin="round"
        />
        <circle cx="13" cy="13" r="3.5" fill="#f5d87a" />
        <circle cx="13" cy="13" r="2" fill="#fff" opacity="0.6" />
      </svg>
    ),
  },
  {
    label: "شفا",
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <defs>
          <linearGradient id="healingGrad" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#a8f0d0" />
            <stop offset="100%" stopColor="#4adeb5" />
          </linearGradient>
        </defs>
        <path
          d="M13 22 C13 22 4 16 4 10 C4 7 6.5 5 9 5 C11 5 12.5 6.2 13 7 C13.5 6.2 15 5 17 5 C19.5 5 22 7 22 10 C22 16 13 22 13 22Z"
          stroke="url(#healingGrad)"
          strokeWidth="1.4"
          fill="rgba(168,240,208,0.12)"
          strokeLinejoin="round"
        />
        <circle cx="13" cy="11" r="2.8" fill="#a8f0d0" opacity="0.9" />
      </svg>
    ),
  },
  {
    label: "آگاهی",
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <defs>
          <linearGradient
            id="awarenessGrad"
            x1="30%"
            y1="30%"
            x2="70%"
            y2="70%"
          >
            <stop offset="0%" stopColor="#c4a5ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
        <circle
          cx="13"
          cy="13"
          r="10.5"
          stroke="url(#awarenessGrad)"
          strokeWidth="1.3"
          fill="none"
        />
        <circle
          cx="13"
          cy="13"
          r="6.2"
          stroke="#c4a5ff"
          strokeWidth="1"
          fill="none"
          opacity="0.7"
        />
        <circle cx="13" cy="13" r="2.8" fill="#e0c4ff" />
        <line
          x1="13"
          y1="2.5"
          x2="13"
          y2="7.5"
          stroke="#c4a5ff"
          strokeWidth="1.1"
        />
        <line
          x1="13"
          y1="18.5"
          x2="13"
          y2="23.5"
          stroke="#c4a5ff"
          strokeWidth="1.1"
        />
        <line
          x1="2.5"
          y1="13"
          x2="7.5"
          y2="13"
          stroke="#c4a5ff"
          strokeWidth="1.1"
        />
        <line
          x1="18.5"
          y1="13"
          x2="23.5"
          y2="13"
          stroke="#c4a5ff"
          strokeWidth="1.1"
        />
      </svg>
    ),
  },
  {
    label: "تعادل",
    svg: (
      <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <defs>
          <linearGradient id="balanceGrad" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <path
          d="M13 3 L13 23 M3 13 L23 13"
          stroke="url(#balanceGrad)"
          strokeWidth="1.4"
        />
        <path
          d="M6.5 6.5 L19.5 19.5 M19.5 6.5 L6.5 19.5"
          stroke="#7dd3fc"
          strokeWidth="1"
          opacity="0.7"
        />
        <circle
          cx="13"
          cy="13"
          r="8.5"
          stroke="#7dd3fc"
          strokeWidth="1.1"
          fill="none"
        />
        <circle cx="13" cy="13" r="2.8" fill="#bae6fd" opacity="0.9" />
      </svg>
    ),
  },
];

const clothingFeatures = [
  {
    title: "High Vibrational",
    sub: "Fabrics",
    svg: (
      <svg
        viewBox="0 0 42 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        width={42}
        height={42}
      >
        <path
          d="M21 8c-2.5 5-2.5 10 0 15 2.5-5 2.5-10 0-15Z"
          fill="currentColor"
          fillOpacity=".2"
        />
        <path d="M21 23c-6-4-12-3-18 1 6 4 12 3 18-1ZM21 23c6-4 12-3 18 1-6 4-12 3-18-1Z" />
        <path
          d="M21 23c-3.5 4-3.5 8 0 12M21 23c3.5 4 3.5 8 0 12"
          opacity=".7"
        />
      </svg>
    ),
  },
  {
    title: "Ethically Sourced",
    sub: "Materials",
    svg: (
      <svg
        viewBox="0 0 42 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        width={42}
        height={42}
      >
        <path d="M21 7 35 15v14L21 37 7 29V15L21 7Z" />
        <path d="M21 7v15m0 0L7 15m14 7 14-8m-14 8v15" opacity=".55" />
        <circle cx="21" cy="22" r="2.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    title: "Infused with",
    sub: "Positive Energy",
    svg: (
      <svg
        viewBox="0 0 42 42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        width={42}
        height={42}
      >
        <circle cx="21" cy="21" r="7" />
        <g strokeLinecap="round">
          <path d="M21 5v4M21 33v4M5 21h4M33 21h4M9.6 9.6l2.8 2.8M29.6 29.6l2.8 2.8M32.4 9.6l-2.8 2.8M12.4 29.6l-2.8 2.8" />
        </g>
      </svg>
    ),
  },
];

const candleSidebarFeatures = [
  {
    iconPath:
      "M9 3c-3 5-5 8-5 11a8 8 0 0 0 16 0c0-3-2-6-5-11z M9 10c0 3 1.5 5 3 6",
    title: "naturalIngredients",
    subtitle: "cleanPlantBasedWax",
  },
  {
    iconPath: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z",
    title: "energyInfused",
    subtitle: "intentionsInEveryCandle",
  },
  {
    iconPath:
      "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c2.5 3 2.5 13 0 16",
    title: "worldwideShipping",
    subtitle: "bringingLightToYourDoor",
  },
];

const candleFeatureBarFeatures = [
  {
    icon: "M20 4c-4 6-7 10-7 15a7 7 0 0 0 14 0c0-5-3-9-7-15z",
    title: "naturalIngredients",
    subtitle: "cleanPlantBasedWax",
  },
  {
    icon: "M20 8l3 9h9l-7 5 3 9-8-6-8 6 3-9-7-5h9z",
    title: "handPoured",
    subtitle: "madeWithCare",
  },
  {
    icon: "M20 8c-4 6-6 10-6 14a6 6 0 0 0 12 0c0-4-2-8-6-14z M14 20c0 4 2 6 6 8",
    title: "energyInfused",
    subtitle: "intentionsInEveryCandle",
  },
  {
    icon: "M12 4c-2 3-3 6-3 9a4 4 0 0 0 8 0c0-3-1-6-3-9M8 34c2-2 4-2 4-2M28 34c-2-2-4-2-4-2",
    title: "crueltyFree",
    subtitle: "neverTestedOnAnimals",
  },
];

const accessorySidebarFeatures = [
  {
    iconPath: "M9 9l3-5 3 5v8l-3 4-3-4z M9 9h6",
    title: "ethicallySourced",
    subtitle: "everyPieceChosenWithLove",
  },
  {
    iconPath:
      "M12 13c2.5-1 4-3 4-6 0 0-3 1-4 4-1-3-4-4-4-4 0 3 1.5 5 4 6z M4 13c2 0 4 1 5 3M20 13c-2 0-4 1-5 3M12 13v4",
    title: "highVibration",
    subtitle: "energyCleansingSpirituallyAligned",
  },
  {
    iconPath:
      "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c2.5 2.5 2.5 13 0 16 M12 3c-2.5 2.5-2.5 13 0 16",
    title: "worldwideShipping",
    subtitle: "bringingLightToYourDoor",
  },
];

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M21.5 3.5 2.6 10.9c-1.1.44-1.1 1.05-.2 1.33l4.8 1.5 1.85 5.65c.22.6.42.84.86.84.36 0 .53-.16.75-.38l1.86-1.8 4.02 2.97c.74.41 1.27.2 1.46-.68l2.65-12.5c.28-1.24-.44-1.8-1.15-1.34Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="m9.05 13.73-.9 5.19c.24 0 .35-.1.48-.24l2.3-2.2-3.88-2.75Z"
        fill="currentColor"
      />
      <path
        d="M7.2 13.73 20 6.3c.58-.34 1.1-.15.67.23L9.9 15.9"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" />
    </svg>
  );
}

function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <path
        d="M12 3.5a8.4 8.4 0 0 0-7.24 12.68L3.5 20.5l4.46-1.2A8.4 8.4 0 1 0 12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 8.9c.16-.5.5-.5.8-.5h.5c.18 0 .38.02.53.35.2.42.66 1.5.7 1.6.05.12.08.26 0 .42-.08.16-.13.26-.26.4-.13.15-.27.33-.38.44-.13.13-.26.28-.11.55.14.27.63 1.07 1.36 1.73.94.85 1.72 1.11 1.98 1.24.26.13.42.11.57-.07.16-.18.66-.77.84-1.03.18-.27.35-.22.6-.13.24.09 1.55.74 1.82.87.26.13.44.2.5.31.06.12.06.68-.16 1.34-.22.66-1.28 1.28-1.76 1.34-.47.06-.94.24-3.16-.65-2.68-1.09-4.4-3.79-4.53-3.97-.13-.18-1.08-1.44-1.08-2.75 0-1.3.68-1.94.92-2.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none">
      <rect
        x="3"
        y="5.5"
        width="18"
        height="13"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="m4 7 7.3 5.7a1.1 1.1 0 0 0 1.4 0L20 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── REUSABLE COMPONENTS ───
type FeatureItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  iconSize?: number;
  isCircular?: boolean;
  iconColor?: string;
  iconBg?: string;
  iconBorder?: string;
};

function FeatureItem({
  icon,
  title,
  subtitle,
  iconSize = 42,
  isCircular = false,
  iconColor,
  iconBg,
  iconBorder,
}: FeatureItemProps) {
  const { isRTL } = useLocale();

  return (
    <div
      style={{
        display: "flex",
        gap: 16,
        alignItems: "flex-start",
        flexDirection: isRTL ? "row-reverse" : "row",
      }}
    >
      <div
        style={{
          flex: "0 0 auto",
          width: iconSize,
          height: iconSize,
          borderRadius: isCircular ? "50%" : undefined,
          display: "grid",
          placeItems: "center",
          background:
            iconBg || (isCircular ? "rgba(50,20,80,0.5)" : "transparent"),
          border:
            iconBorder ||
            (isCircular ? "1px solid rgba(254,203,125,0.15)" : "none"),
          boxShadow: isCircular ? "0 0 20px rgba(254,203,125,0.05)" : "none",
          color: iconColor,
          order: isRTL ? 2 : 1,
        }}
      >
        {icon}
      </div>

      <div
        style={{
          textAlign: isRTL ? "right" : "left",
          order: isRTL ? 1 : 2,
        }}
      >
        <div
          style={{
            color: "#f3eee2",
            fontFamily: isRTL
              ? "'Vazirmatn', 'IranSans', sans-serif"
              : "Jost, sans-serif",
            fontWeight: 600,
            fontSize: isRTL ? 12 : 13,
            letterSpacing: isRTL ? "0.02em" : ".08em",
            textTransform: "uppercase",
            marginBottom: subtitle ? 4 : 0,
          }}
        >
          {title}
        </div>
        {subtitle && (
          <div
            style={{
              color: "rgba(255,255,255,0.6)",
              fontWeight: 300,
              fontSize: isRTL ? 12.5 : 13.5,
              lineHeight: 1.35,
              fontFamily: isRTL
                ? "'Vazirmatn', 'IranSans', sans-serif"
                : "inherit",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}

function SidebarContent({
  children,
  padding = "40px 24px",
  gap = 28,
  align = "flex-start",
}: {
  children: React.ReactNode;
  padding?: string;
  gap?: number;
  align?: "flex-start" | "center" | "flex-end";
}) {
  return (
    <div
      style={{
        padding,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: align,
        gap,
        height: "100%",
      }}
    >
      {children}
    </div>
  );
}

// ─── PANEL FRAME ───
function PanelFrame({
  id,
  width,
  mobileWidth = "100%",
  children,
  isTeal = false,
}: {
  id: string;
  width: string;
  mobileWidth?: string;
  children: React.ReactNode;
  isTeal?: boolean;
}) {
  const maskSvg = `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 305 576' preserveAspectRatio='none'%3E%3Cpath d='${encodeURIComponent(
    PANEL_PATH,
  )}' fill='black'/%3E%3C/svg%3E`;

  const borderColors = isTeal
    ? {
        start: "%237fdccb",
        mid: "%2360b8a8",
        end: "%237fdccb",
        startOpacity: "0.9",
        midOpacity: "0.7",
        endOpacity: "0.9",
      }
    : {
        start: "%23f3dca0",
        mid: "%23d4af64",
        end: "%23b88f44",
        startOpacity: "0.9",
        midOpacity: "0.7",
        endOpacity: "0.9",
      };

  const borderSvg = `%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 305 576' preserveAspectRatio='none'%3E%3Cdefs%3E%3ClinearGradient id='grd-${id}' x1='0' y1='0' x2='0' y2='1'%3E%3Cstop offset='0' stop-color='${
    borderColors.start
  }' stop-opacity='${
    borderColors.startOpacity
  }'/%3E%3Cstop offset='0.3' stop-color='${borderColors.mid}' stop-opacity='${
    borderColors.midOpacity
  }'/%3E%3Cstop offset='0.7' stop-color='${borderColors.mid}' stop-opacity='${
    borderColors.midOpacity
  }'/%3E%3Cstop offset='1' stop-color='${borderColors.end}' stop-opacity='${
    borderColors.endOpacity
  }'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cpath d='${encodeURIComponent(
    PANEL_PATH,
  )}' fill='none' stroke='url(%23grd-${id})' stroke-width='2'/%3E%3C/svg%3E`;

  return (
    <div
      className="relative pointer-events-none lg:aspect-auto transition-all duration-300 ease-out"
      style={{
        flexShrink: 1,
        width: mobileWidth,
        maxWidth: width,
        aspectRatio: "305 / 576",
        height: "auto",
        minHeight: "340px",
        filter:
          "drop-shadow(0 12px 40px rgba(0,0,0,0.5)) drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
      }}
    >
      <div
        className="absolute -inset-8 opacity-0 transition-opacity duration-700 blur-3xl pointer-events-none"
        style={{
          background: isTeal
            ? "radial-gradient(60% 55% at 50% 45%, rgba(127,220,203,0.15), transparent 70%)"
            : "radial-gradient(60% 55% at 50% 45%, rgba(212,175,100,0.15), transparent 70%)",
          transform: "scale(1.1)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          WebkitMaskImage: `url("data:image/svg+xml,${maskSvg}")`,
          maskImage: `url("data:image/svg+xml,${maskSvg}")`,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          background: isTeal
            ? glassBg
            : "linear-gradient(180deg, rgba(28,12,54,0.72), rgba(18,8,38,0.6))",
          backdropFilter: "blur(3px)",
          WebkitBackdropFilter: "blur(3px)",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          backgroundImage: `url("data:image/svg+xml,${borderSvg}")`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          filter: isTeal
            ? "drop-shadow(0 0 6px rgba(127,220,203,0.3)) drop-shadow(0 0 20px rgba(127,220,203,0.1))"
            : "drop-shadow(0 0 6px rgba(212,175,100,0.3)) drop-shadow(0 0 20px rgba(212,175,100,0.1))",
        }}
      />
    </div>
  );
}

// ─── PANELS ───
export function ClothingFeaturesPanel() {
  const t = useTranslations("sidePanels.clothing");
  return (
    <PanelFrame
      id="features"
      width="clamp(150px, 12vw, 195px)"
      mobileWidth="100%"
      isTeal={false}
    >
      <div
        style={{
          padding: "34px 20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 22,
          height: "100%",
        }}
      >
        {clothingFeatures.map((item, index) => {
          const titleKey =
            item.title === "High Vibrational"
              ? "highVibrational"
              : item.title === "Ethically Sourced"
              ? "ethicallySourced"
              : "infusedWith";

          const subKey =
            item.sub === "Fabrics"
              ? "fabrics"
              : item.sub === "Materials"
              ? "materials"
              : "positiveEnergy";

          return (
            <div
              key={index}
              style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  color: "var(--avad-gold)",
                  filter:
                    "drop-shadow(0 0 6px rgba(216,179,106,0.5)) drop-shadow(0 0 20px rgba(216,179,106,0.1))",
                  flexShrink: 0,
                }}
              >
                {item.svg}
              </div>
              <div>
                <div
                  style={{
                    fontFamily: "var(--avad-serif)",
                    fontWeight: 600,
                    fontSize: 17,
                    color: "var(--avad-cream)",
                    lineHeight: 1.05,
                    textShadow: "0 2px 8px rgba(0,0,0,0.3)",
                  }}
                >
                  {t(titleKey)}
                </div>
                <div
                  style={{
                    fontFamily: "var(--avad-sans)",
                    fontWeight: 300,
                    fontSize: 11,
                    letterSpacing: "0.04em",
                    color: "var(--avad-gold)",
                    marginTop: 3,
                    textShadow: "0 2px 4px rgba(0,0,0,0.2)",
                  }}
                >
                  {t(subKey)}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </PanelFrame>
  );
}

export function ClothingNotePanel() {
  const t = useTranslations("sidePanels.clothing");
  return (
    <PanelFrame
      id="note"
      width="clamp(140px, 11vw, 185px)"
      mobileWidth="100%"
      isTeal={false}
    >
      <div
        style={{
          padding: "28px 20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 14,
          textAlign: "center",
          height: "100%",
        }}
      >
        <svg
          viewBox="0 0 40 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          width={32}
          height={12}
          style={{
            color: "var(--avad-gold)",
            opacity: 0.8,
            filter: "drop-shadow(0 0 6px rgba(212,175,100,0.3))",
          }}
        >
          <path d="M20 2c-1.2 2.5-1.2 5 0 7M20 9c-3-1.2-5-.8-7 1M20 9c3-1.2 5-.8 7 1" />
          <path d="M2 9c3 .8 5 .8 7 0M38 9c-3 .8-5 .8-7 0" opacity=".6" />
        </svg>
        <p
          style={{
            fontFamily: "var(--avad-serif)",
            fontWeight: 400,
            fontStyle: "italic",
            fontSize: 18,
            lineHeight: 1.3,
            color: "var(--avad-cream)",
            textShadow: "0 2px 10px rgba(0,0,0,0.6), 0 0 30px rgba(0,0,0,0.3)",
          }}
        >
          {t("note")}
        </p>
        <svg
          viewBox="0 0 40 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.1"
          width={32}
          height={12}
          style={{
            color: "var(--avad-gold)",
            opacity: 0.8,
            filter: "drop-shadow(0 0 6px rgba(212,175,100,0.3))",
          }}
        >
          <path d="M20 2c-1.2 2.5-1.2 5 0 7M20 9c-3-1.2-5-.8-7 1M20 9c3-1.2 5-.8 7 1" />
          <path d="M2 9c3 .8 5 .8 7 0M38 9c-3 .8-5 .8-7 0" opacity=".6" />
        </svg>
      </div>
    </PanelFrame>
  );
}

export function CandleSidebarPanel() {
  const t = useTranslations("sidePanels.candles");
  return (
    <PanelFrame
      id="candle-sidebar"
      width="60%"
      mobileWidth="100%"
      isTeal={false}
    >
      <SidebarContent padding="40px 15px 40px 20px" gap={12}>
        {candleSidebarFeatures.map((item, index) => (
          <FeatureItem
            key={index}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b8a4e8"
                strokeWidth="1.5"
              >
                <path d={item.iconPath} />
              </svg>
            }
            title={t(item.title)}
            subtitle={t(item.subtitle)}
            iconSize={36}
            isCircular={true}
            iconBg="rgba(50,20,80,0.5)"
            iconBorder="1px solid rgba(212,175,100,0.12)"
          />
        ))}
      </SidebarContent>
    </PanelFrame>
  );
}

export function CandleFeatureBarPanel() {
  const t = useTranslations("sidePanels.candles");
  return (
    <PanelFrame
      id="candle-featurebar"
      width="clamp(150px, 12vw, 195px)"
      mobileWidth="100%"
      isTeal={false}
    >
      <div
        style={{
          padding: "16px 14px",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          height: "100%",
        }}
      >
        {candleFeatureBarFeatures.map((item, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: 6,
              padding: "6px 0",
            }}
          >
            <div
              style={{
                flex: "0 0 auto",
                width: 32,
                height: 38,
                display: "grid",
                placeItems: "center",
              }}
            >
              <svg
                width="32"
                height="36"
                viewBox="0 0 40 46"
                fill="none"
                stroke="#c8a951"
                strokeWidth="1.4"
                style={{
                  filter: "drop-shadow(0 0 8px rgba(200,169,81,0.04))",
                }}
              >
                <path d={item.icon} />
              </svg>
            </div>
            <div>
              <div
                style={{
                  color: "#f5f0e8",
                  fontFamily: "Jost, sans-serif",
                  fontWeight: 500,
                  fontSize: 10,
                  marginBottom: 2,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                }}
              >
                {t(item.title)}
              </div>
              <div
                style={{
                  color: "#a090c0",
                  fontWeight: 300,
                  fontSize: 9,
                  lineHeight: 1.2,
                }}
              >
                {t(item.subtitle)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </PanelFrame>
  );
}

export function AccessorySidebarPanel() {
  const t = useTranslations("sidePanels.accessories");
  return (
    <PanelFrame
      id="accessory-sidebar"
      width="70%"
      mobileWidth="100%"
      isTeal={true}
    >
      <SidebarContent padding="40px 15px 40px 20px" gap={12}>
        {accessorySidebarFeatures.map((item, index) => (
          <FeatureItem
            key={index}
            icon={
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#7fdccb"
                strokeWidth="1.5"
              >
                <path d={item.iconPath} />
              </svg>
            }
            title={t(item.title)}
            subtitle={t(item.subtitle)}
            iconSize={36}
            isCircular={true}
            iconBg="rgba(127,220,203,0.1)"
            iconBorder="1px solid rgba(127,220,203,0.2)"
          />
        ))}
      </SidebarContent>
    </PanelFrame>
  );
}

export function CoursesSidebarPanel() {
  const t = useTranslations("courses");
  return (
    <PanelFrame
      id="courses-sidebar"
      width="200px"
      mobileWidth="100%"
      isTeal={false}
    >
      <SidebarContent gap={32} padding="40px 20px" align="center">
        {COURSES_SIDE_NAV.map((item, index) => {
          const translationKey =
            item.label === "انرژی"
              ? "energy"
              : item.label === "شفا"
              ? "healing"
              : item.label === "آگاهی"
              ? "awareness"
              : "balance";

          return (
            <FeatureItem
              key={index}
              icon={item.svg}
              title={t(`sideNav.${translationKey}`)}
              iconSize={42}
              isCircular={false}
            />
          );
        })}
      </SidebarContent>
    </PanelFrame>
  );
}

const SUPPORT_ACCENTS = ["#ff00ff", "#00e6ff", "#ffd700"];

export function SupportFeaturesPanel() {
  const t = useTranslations("support");
  const { isRTL } = useLocale();

  const supportFeatures = [
    {
      iconPath:
        "M9 3c-3 5-5 8-5 11a8 8 0 0 0 16 0c0-3-2-6-5-11z M9 10c0 3 1.5 5 3 6",
      titleKey: "fastResponse",
      subtitleKey: "fastResponseSub",
    },
    {
      iconPath: "M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z",
      titleKey: "professionalTeam",
      subtitleKey: "professionalTeamSub",
    },
    {
      iconPath:
        "M21 12a9 9 0 11-18 0 9 9 0 0118 0z M3 12h18 M12 3c2.5 3 2.5 13 0 16",
      titleKey: "yourSatisfaction",
      subtitleKey: "yourSatisfactionSub",
    },
  ];

  const SUPPORT_ACCENTS = ["#ff6bff", "#6bffff", "#ffd700"];

  return (
    <PanelFrame
      id="support-features"
      width="200px"
      mobileWidth="100%"
      isTeal={false}
    >
      <SidebarContent 
        gap={24} 
        align={isRTL ? "flex-end" : "flex-start"}
        padding="32px 20px"
      >
        {supportFeatures.map((item, index) => {
          const accent = SUPPORT_ACCENTS[index % SUPPORT_ACCENTS.length];
          return (
            <div
              key={item.titleKey}
              className="psy-feature-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                width: "100%",
                flexDirection: isRTL ? "row-reverse" : "row",
                justifyContent: isRTL ? "flex-end" : "flex-start",
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ["--accent" as any]: accent,
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ["--delay" as any]: `${index * 0.6}s`,
              }}
            >
              <div
                className="psy-feature-icon"
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "grid",
                  placeItems: "center",
                  position: "relative",
                  color: accent,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.14)",
                  order: isRTL ? 2 : 1,
                }}
              >
                <span className="psy-feature-ring" aria-hidden="true" />
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <path d={item.iconPath} />
                </svg>
              </div>

              <div
                style={{
                  textAlign: isRTL ? "right" : "left",
                  order: isRTL ? 1 : 2,
                }}
              >
                <div
                  className="psy-feature-title"
                  style={{
                    color: "#f3eee2",
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "Jost, sans-serif",
                    fontWeight: 600,
                    fontSize: isRTL ? 10 : 10.5,
                    letterSpacing: isRTL ? "0.02em" : "0.03em",
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(item.titleKey)}
                </div>
                <div
                  style={{
                    marginTop: 2,
                    color: "rgba(243,238,226,0.55)",
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "Jost, sans-serif",
                    fontWeight: 400,
                    fontSize: isRTL ? 8.5 : 9,
                    letterSpacing: "0.01em",
                    lineHeight: 1.3,
                    textAlign: isRTL ? "right" : "left",
                  }}
                >
                  {t(item.subtitleKey)}
                </div>
              </div>
            </div>
          );
        })}
      </SidebarContent>

      <style jsx>{`
        .psy-feature-icon {
          animation: psyFeatureBreathe 4.5s ease-in-out infinite;
          animation-delay: var(--delay);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .psy-feature-ring {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          border: 1px solid var(--accent);
          opacity: 0;
          animation: psyRingPulse 4.5s ease-in-out infinite;
          animation-delay: var(--delay);
        }

        .psy-feature-row:hover .psy-feature-icon {
          transform: scale(1.1) rotate(-6deg);
          box-shadow: 0 0 0 1px
              color-mix(in srgb, var(--accent) 55%, transparent),
            0 0 20px 2px color-mix(in srgb, var(--accent) 60%, transparent),
            0 0 40px 6px color-mix(in srgb, var(--accent) 30%, transparent);
        }

        .psy-feature-row:hover .psy-feature-title {
          color: var(--accent);
          text-shadow: 0 0 12px
            color-mix(in srgb, var(--accent) 65%, transparent);
        }

        .psy-feature-title {
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        @keyframes psyFeatureBreathe {
          0%,
          100% {
            box-shadow: 0 0 0 0
              color-mix(in srgb, var(--accent) 0%, transparent);
          }
          50% {
            box-shadow: 0 0 16px 1px
              color-mix(in srgb, var(--accent) 35%, transparent);
          }
        }

        @keyframes psyRingPulse {
          0% {
            transform: scale(0.85);
            opacity: 0.5;
          }
          70%,
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .psy-feature-icon,
          .psy-feature-ring {
            animation: none;
          }
        }
      `}</style>
    </PanelFrame>
  );
}

export function SocialLinksPanel() {
  const t = useTranslations("social");
  const { isRTL } = useLocale();

  const SOCIAL_LINKS = [
    {
      id: "telegram",
      href: "https://t.me/yourchannel",
      Icon: TelegramIcon,
      labelKey: "telegram",
      accentColor: "#00e6ff",
    },
    {
      id: "instagram",
      href: "https://instagram.com/yourpage",
      Icon: InstagramIcon,
      labelKey: "instagram",
      accentColor: "#ff00ff",
    },
    {
      id: "whatsapp",
      href: "https://wa.me/yournumber",
      Icon: WhatsappIcon,
      labelKey: "whatsapp",
      accentColor: "#7cff5e",
    },
    {
      id: "email",
      href: "mailto:info@yourdomain.com",
      Icon: EmailIcon,
      labelKey: "email",
      accentColor: "#ffd700",
    },
  ];

  return (
    <PanelFrame
      id="social-links"
      width="200px"
      mobileWidth="100%"
      isTeal={false}
    >
      <SidebarContent
        padding="32px 20px"
        gap={16}
        align={isRTL ? "flex-end" : "flex-start"}
      >
        {SOCIAL_LINKS.map((s) => (
          <a
            key={s.id}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="psy-social-link"
            style={{
              textDecoration: "none",
              color: "inherit",
              pointerEvents: "auto",
              width: "100%",
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ["--accent" as any]: s.accentColor,
            }}
          >
            <div
              className="psy-social-row"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "6px 4px",
                borderRadius: 16,
                cursor: "pointer",
                flexDirection: isRTL ? "row-reverse" : "row",
                justifyContent: isRTL ? "flex-end" : "flex-start",
              }}
            >
              <div
                className="psy-social-icon"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  flexShrink: 0,
                  color: s.accentColor,
                  background:
                    "linear-gradient(145deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))",
                  border: "1px solid rgba(255,255,255,0.12)",
                  order: isRTL ? 2 : 1,
                }}
              >
                <s.Icon />
              </div>

              <div
                className="psy-social-label"
                style={{
                  color: "#f3eee2",
                  fontFamily: isRTL
                    ? "'Vazirmatn', 'IranSans', sans-serif"
                    : "Jost, sans-serif",
                  fontWeight: 500,
                  fontSize: isRTL ? 10 : 10.5,
                  letterSpacing: isRTL ? "0.02em" : "0.03em",
                  textAlign: isRTL ? "right" : "left",
                  order: isRTL ? 1 : 2,
                }}
              >
                {t(s.labelKey)}
              </div>
            </div>
          </a>
        ))}
      </SidebarContent>

      <style jsx>{`
        .psy-social-row {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.35s ease;
        }

        .psy-social-icon {
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.35s ease, border-color 0.35s ease,
            background 0.35s ease;
        }

        .psy-social-label {
          position: relative;
          transition: color 0.3s ease, text-shadow 0.3s ease;
        }

        .psy-social-link:hover .psy-social-row {
          background: linear-gradient(
            90deg,
            color-mix(in srgb, var(--accent) 12%, transparent),
            transparent
          );
          transform: translateX(${isRTL ? "-6px" : "6px"});
        }

        .psy-social-link:hover .psy-social-icon {
          transform: scale(1.12) rotate(-6deg);
          border-color: var(--accent);
          box-shadow: 0 0 0 1px
              color-mix(in srgb, var(--accent) 50%, transparent),
            0 0 22px 2px color-mix(in srgb, var(--accent) 65%, transparent),
            0 0 46px 6px color-mix(in srgb, var(--accent) 35%, transparent);
        }

        .psy-social-link:hover .psy-social-label {
          color: var(--accent);
          text-shadow: 0 0 14px
            color-mix(in srgb, var(--accent) 70%, transparent);
        }

        .psy-social-link:active .psy-social-icon {
          transform: scale(0.96) rotate(-6deg);
        }
      `}</style>
    </PanelFrame>
  );
}