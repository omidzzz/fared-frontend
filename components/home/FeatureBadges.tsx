"use client";

import { useTranslations } from "next-intl";

export default function FeatureBadges() {
  const t = useTranslations("home.featureBadges");

  const FEATURES = [
    {
      titleKey: "crystals",
      subtitleKey: "crystalsSub",
      svg: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M19 6 L29 6 L34 18 L24 42 L14 18 Z" />
          <path d="M19 6 L24 18 L29 6 M14 18 L34 18 M24 18 L24 42" />
        </svg>
      ),
    },
    {
      titleKey: "positiveEnergy",
      subtitleKey: "positiveEnergySub",
      svg: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M24 12c-3 5-3 11 0 18 3-7 3-13 0-18z" />
          <path d="M24 30c-5-4-12-4-18 0 5 6 13 7 18 2M24 30c5-4 12-4 18 0-5 6-13 7-18 2" />
        </svg>
      ),
    },
    {
      titleKey: "cleansing",
      subtitleKey: "cleansingSub",
      svg: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M32 24a11 11 0 1 1-9-10.8A9 9 0 0 0 32 24z" />
        </svg>
      ),
    },
    {
      titleKey: "shipping",
      subtitleKey: "shippingSub",
      svg: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.3"
        >
          <circle cx="24" cy="24" r="13" />
          <circle cx="24" cy="24" r="6" />
          <path d="M24 11v6M24 31v6M11 24h6M31 24h6M15 15l4 4M29 29l4 4M33 15l-4 4M19 29l-4 4" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 lg:-mt-20 ">
      <div
        className="relative overflow-hidden rounded-2xl p-5 sm:p-6 lg:p-8 "
        style={{
          background:
            "linear-gradient(160deg, rgba(59,28,110,.5), rgba(26,12,48,.62))",
          border: "1.5px solid rgba(231,193,111,.42)",
          boxShadow:
            "0 18px 50px rgba(0,0,0,.5), inset 0 1px 0 rgba(255,255,255,.08), 0 0 40px rgba(120,60,190,.2)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          isolation: "isolate",
          transform: "translateZ(0)",
        }}
      >
        {/* Corner accents */}
        <div className="hidden lg:block absolute -top-[3px] -left-[3px] w-8 h-8 border-t-2 border-l-2 border-gold/70 rounded-tl-md" />
        <div className="hidden lg:block absolute -top-[3px] -right-[3px] w-8 h-8 border-t-2 border-r-2 border-gold/70 rounded-tr-md" />
        <div className="hidden lg:block absolute -bottom-[3px] -left-[3px] w-8 h-8 border-b-2 border-l-2 border-gold/70 rounded-bl-md" />
        <div className="hidden lg:block absolute -bottom-[3px] -right-[3px] w-8 h-8 border-b-2 border-r-2 border-gold/70 rounded-br-md" />

        {/* Desktop vertical separators */}
        <div className="hidden lg:block absolute top-8 bottom-8 left-1/4 w-px bg-gradient-to-b from-transparent via-[#E7C16F]/30 to-transparent" />
        <div className="hidden lg:block absolute top-8 bottom-8 left-2/4 w-px bg-gradient-to-b from-transparent via-[#E7C16F]/30 to-transparent" />
        <div className="hidden lg:block absolute top-8 bottom-8 left-3/4 w-px bg-gradient-to-b from-transparent via-[#E7C16F]/30 to-transparent" />

        {/* Mobile horizontal separator */}
        <div className="lg:hidden absolute left-6 right-6 top-1/2 h-px bg-gradient-to-r from-transparent via-[#E7C16F]/30 to-transparent" />

        <div className="grid grid-cols-2 lg:grid-cols-4 " dir="rtl">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className="flex flex-col items-center justify-center text-center px-5 py-7"
            >
              <div
                className="text-gold-accent mb-3"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(231,193,111,.55))",
                }}
              >
                {f.svg}
              </div>

              <h3 className="font-farsi text-base font-semibold text-gold-accent mb-2">
                {t(f.titleKey)}
              </h3>

              <p className="font-farsi text-sm text-white/80 leading-relaxed">
                {t(f.subtitleKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
