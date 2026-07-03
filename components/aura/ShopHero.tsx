"use client";

import { useLocale } from "@/hooks/useLocale";
import { useTranslations } from "next-intl";
import CTAButton from "@/components/ui/CTAButton";

interface ShopHeroProps {
  namespace: string;
  titleKey?: string;
  subtitleKey?: string;
  ctaKey?: string;
  ctaHref?: string;
  badge?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  accentColor?: string;
  showOrnament?: boolean;
  fullWidth?: boolean;
}

export default function ShopHero({
  namespace,
  titleKey = "title",
  subtitleKey = "subtitle",
  ctaKey = "explore",
  ctaHref,
  badge,
  className = "",
  style,
  accentColor = "var(--avad-gold, #f5d87a)",
  showOrnament = true,
  fullWidth = false,
}: ShopHeroProps) {
  const { isRTL } = useLocale();

  // Get the translation function for the specific namespace
  const t = useTranslations(namespace);

  // Get translations using the keys directly
  const title = t(titleKey);
  const subtitle = t(subtitleKey);
  const ctaText = t(ctaKey);

  const href = ctaHref || `/shop/${namespace}`;

  const defaultOrnament = showOrnament ? (
    <svg
      viewBox="0 0 26 18"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.1"
      width={20}
      height={14}
      style={{ color: accentColor }}
    >
      <path d="M13 2c-1.5 3-1.5 6 0 8 1.5-2 1.5-5 0-8ZM13 10c-3-1.5-6-1-8 1 2.5 1.5 5.5 1 8-1ZM13 10c3-1.5 6-1 8 1-2.5 1.5-5.5 1-8-1Z" />
    </svg>
  ) : null;

  return (
    <div
      className={`shop-hero ${className}`}
      style={{
        width: "100%",
        maxWidth: fullWidth ? "100%" : 760,
        margin: "0 auto",
        marginBottom: fullWidth ? "20px" : "clamp(40px, 5vw, 100px)",
        paddingInline: fullWidth ? "clamp(40px, 5vw, 100px)" : 0,
        ...style,
      }}
    >
      {/* Desktop Layout - hidden on mobile, flex on lg+ */}
      <div
        className="hidden lg:flex"
        style={{
          flexDirection: isRTL ? "row-reverse" : "row",
          alignItems: "center",
          gap: 32,
          justifyContent: "space-between",
        }}
      >
        {/* Text Content - render first in LTR, second in RTL to keep it on the LEFT */}
        <div
          style={{
            flex: 1,
            textAlign: isRTL ? "right" : "left",
            order: isRTL ? 2 : 1,
          }}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div
            className="flex items-center gap-2.5 mb-4"
            style={{
              justifyContent: isRTL ? "flex-end" : "flex-start",
              color: accentColor,
            }}
          >
            {!isRTL && (
              <span
                className="w-9 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor})`,
                }}
              />
            )}
            {defaultOrnament}
            {isRTL && (
              <span
                className="w-9 h-px"
                style={{
                  background: `linear-gradient(270deg, transparent, ${accentColor})`,
                }}
              />
            )}
          </div>
          <h1
            className="text-[var(--avad-cream,#ffffff)]"
            style={{
              fontFamily: "var(--avad-serif, 'Playfair Display', serif)",
              fontWeight: 700,
              fontSize: "clamp(34px, 7vw, 62px)",
              lineHeight: 1.05,
              margin: 0,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {title}
          </h1>
          <p
            className="text-[var(--avad-text-dim,rgba(255,255,255,0.72))]"
            style={{
              marginTop: 20,
              maxWidth: fullWidth ? "100%" : 420,
              fontWeight: 300,
              fontSize: "clamp(15px, 2.8vw, 16px)",
              lineHeight: 1.7,
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {subtitle}
          </p>
          <div
            style={{
              marginTop: 30,
              marginInlineStart: "auto",
              textAlign: isRTL ? "right" : "left",
            }}
          >
            <CTAButton href={href} size="large">
              {ctaText}
            </CTAButton>
          </div>
        </div>

        {/* Badge - render second in LTR, first in RTL to keep it on the RIGHT */}
        {badge && (
          <div
            style={{
              flexShrink: 0,
              order: isRTL ? 1 : 2,
            }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Mobile Layout - flex on all screens, hidden on lg+ */}
      <div
        className="flex lg:hidden flex-col items-center text-center"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Ornament */}
        <div
          className="flex items-center justify-center gap-2.5 mb-4"
          style={{ color: accentColor }}
        >
          <span
            className="w-9 h-px"
            style={{
              background: `linear-gradient(90deg, transparent, ${accentColor})`,
            }}
          />
          {defaultOrnament}
          <span
            className="w-9 h-px"
            style={{
              background: `linear-gradient(270deg, transparent, ${accentColor})`,
            }}
          />
        </div>

        {/* Title */}
        <h1
          className="text-[var(--avad-cream,#ffffff)]"
          style={{
            fontFamily: "var(--avad-serif, 'Playfair Display', serif)",
            fontWeight: 700,
            fontSize: "clamp(28px, 8vw, 48px)",
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          className="text-[var(--avad-text-dim,rgba(255,255,255,0.72))]"
          style={{
            marginTop: 16,
            maxWidth: 420,
            fontWeight: 300,
            fontSize: "clamp(14px, 3.5vw, 16px)",
            lineHeight: 1.7,
          }}
        >
          {subtitle}
        </p>

        {/* CTA Button */}
        <div className="flex justify-center" style={{ marginTop: 24 }}>
          <CTAButton href={href} size="large">
            {ctaText}
          </CTAButton>
        </div>

        {/* Badge/panel - shown below the CTA button, centered */}
        {badge && (
          <div
            style={{
              marginTop: 32,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {badge}
          </div>
        )}
      </div>
    </div>
  );
}
