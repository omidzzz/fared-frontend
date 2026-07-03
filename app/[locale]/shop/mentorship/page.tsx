"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import CTAButton from "@/components/ui/CTAButton";

/* ── Design tokens ── */
const GOLD = "#d4af64";
const GOLD_BRIGHT = "rgba(212, 175, 100, 0.85)";
const WHITE_FULL = "#ffffff";
const WHITE_70 = "rgba(255, 255, 255, 0.7)";
const WHITE_50 = "rgba(255, 255, 255, 0.5)";
const CARD_BG = "rgba(15, 8, 40, 0.55)";
const CARD_BORDER = "rgba(212, 175, 100, 0.2)";
const ROW_SELECTED = "rgba(212, 175, 100, 0.08)";

const sessions = [
  {
    id: "private-session",
    nameKey: "privateSession",
    descriptionKey: "privateSessionDesc",
    duration: "60 Min",
    price: "۲۲,۲۰۰,۰۰۰ تومان",
    icon: "person",
  },
  {
    id: "energy-reading",
    nameKey: "energyReading",
    descriptionKey: "energyReadingDesc",
    duration: "45 Min",
    price: "۱۵,۵۰۰,۰۰۰ تومان",
    icon: "eye",
  },
  {
    id: "aura-cleansing",
    nameKey: "auraCleansing",
    descriptionKey: "auraCleansingDesc",
    duration: "60 Min",
    price: "۱۸,۸۰۰,۰۰۰ تومان",
    icon: "body",
  },
  {
    id: "feminine-energy",
    nameKey: "feminineEnergy",
    descriptionKey: "feminineEnergyDesc",
    duration: "75 Min",
    price: "۲۴,۴۰۰,۰۰۰ تومان",
    icon: "circle",
  },
  {
    id: "spiritual-guidance",
    nameKey: "spiritualGuidance",
    descriptionKey: "spiritualGuidanceDesc",
    duration: "60 Min",
    price: "۱۹,۹۰۰,۰۰۰ تومان",
    icon: "lotus",
  },
];

const IconSvg = ({ type }: { type: string }) => {
  const p = "rgba(212,175,100,0.8)";
  const s: Record<string, React.ReactNode> = {
    person: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={p}
        strokeWidth="1.3"
        width={18}
        height={18}
      >
        <circle cx="12" cy="7" r="3" />
        <path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2" />
      </svg>
    ),
    eye: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={p}
        strokeWidth="1.3"
        width={18}
        height={18}
      >
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
    body: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={p}
        strokeWidth="1.3"
        width={18}
        height={18}
      >
        <circle cx="12" cy="4" r="2" />
        <path d="M9 10v10M15 10v10M12 10v10M8 14h8" />
      </svg>
    ),
    circle: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={p}
        strokeWidth="1.3"
        width={18}
        height={18}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 8v4M12 16h.01" />
      </svg>
    ),
    lotus: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={p}
        strokeWidth="1.3"
        width={18}
        height={18}
      >
        <path d="M12 3c-2 4-2 9 0 13 2-4 2-9 0-13z" />
        <path d="M12 16c-4-2-8-1.5-11 1 3.5 2 7.5 1.5 11-1zM12 16c4-2 8-1.5 11 1-3.5 2-7.5 1.5-11-1z" />
      </svg>
    ),
  };
  return <>{s[type]}</>;
};

const steps = [
  { num: "01", titleKey: "step1Title", descKey: "step1Desc", icon: "star" },
  { num: "02", titleKey: "step2Title", descKey: "step2Desc", icon: "calendar" },
  { num: "03", titleKey: "step3Title", descKey: "step3Desc", icon: "card" },
  { num: "04", titleKey: "step4Title", descKey: "step4Desc", icon: "check" },
];

const StepIcon = ({ type, active }: { type: string; active: boolean }) => {
  const c = active ? GOLD : "rgba(130,100,200,0.6)";
  const s: Record<string, React.ReactNode> = {
    star: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={16}
        height={16}
      >
        <path d="M12 2l3 7h7l-5.5 4 2.1 7L12 15.6 5.4 20l2.1-7L2 9h7z" />
      </svg>
    ),
    calendar: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={16}
        height={16}
      >
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </svg>
    ),
    card: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke={c}
        strokeWidth="1.2"
        width={16}
        height={16}
      >
        <rect x="1" y="4" width="22" height="16" rx="2" />
        <path d="M1 10h22" />
      </svg>
    ),
    check: (
      <svg
        viewBox="0 0 24 24"
        fill={active ? GOLD : "none"}
        stroke={c}
        strokeWidth="1.2"
        width={16}
        height={16}
      >
        <path d="M20 6L9 17l-5-5" />
      </svg>
    ),
  };
  return <>{s[type]}</>;
};

export default function MentorshipPage() {
  const t = useTranslations("mentorship");
  const [selected, setSelected] = useState<string>(() => {
    if (typeof window === "undefined") return "private-session";
    const saved = sessionStorage.getItem("lumina-selected-session");
    if (saved)
      try {
        return JSON.parse(saved).id;
      } catch {
        /* ignore */
      }
    return "private-session";
  });

  const handleSelectSession = (s: (typeof sessions)[number]) => {
    setSelected(s.id);
    sessionStorage.setItem(
      "lumina-selected-session",
      JSON.stringify({
        id: s.id,
        name: t(s.nameKey),
        price: s.price,
        duration: s.duration,
      }),
    );
    toast.success("Session selected ✦");
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "transparent",
        color: WHITE_FULL,
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Fixed background */}
      <div
        className="hidden lg:block"
        style={{ position: "fixed", inset: 0, zIndex: 0 }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/images/hero-backgrounds/mentorship-bg.webp)",
            backgroundSize: "cover",
            backgroundPosition: "center bottom",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(5, 2, 15, 0.35)",
          }}
        />
      </div>

      {/* Scrollable content */}
      <div
        className="hidden lg:block"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* ── HERO ── */}
        <section style={{ textAlign: "center", padding: "120px 40px 60px" }}>
          <p
            style={{
              fontSize: "0.72rem",
              letterSpacing: "0.3em",
              color: GOLD_BRIGHT,
              marginBottom: 20,
            }}
          >
            {t("awakenAlignTransform")}
          </p>
          <h1 style={{ margin: 0 }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2.4rem, 5vw, 4rem)",
                fontWeight: 600,
                color: WHITE_FULL,
                lineHeight: 1.1,
              }}
            >
              {t("title")}
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "clamp(2rem, 4.5vw, 3.6rem)",
                fontWeight: 400,
                fontStyle: "italic",
                color: GOLD,
                lineHeight: 1.1,
                marginTop: 4,
              }}
            >
              {t("withFard")}
            </span>
          </h1>

          {/* Ornament divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "24px 0",
            }}
          >
            <div
              style={{
                width: 180,
                borderTop: "1px solid rgba(212,175,100,0.4)",
                position: "relative",
              }}
            >
              <svg
                viewBox="0 0 14 20"
                fill="none"
                stroke={GOLD}
                strokeWidth="1.2"
                width={10}
                height={10}
                style={{
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <path d="M7 2L12 10l-5 8-5-8z" />
                <path d="M2 10h10" opacity="0.5" />
              </svg>
            </div>
          </div>

          <p
            style={{
              fontSize: "1rem",
              color: WHITE_70,
              lineHeight: 1.7,
              maxWidth: 480,
              margin: "0 auto",
            }}
          >
            {t("subtitle")}
          </p>
        </section>

        {/* ── THREE-COLUMN LAYOUT ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr 1fr",
            gap: 40,
            maxWidth: 1360,
            margin: "0 auto",
            padding: "0 40px 80px",
            alignItems: "start",
          }}
        >
          {/* ── LEFT: Quote + Badges ── */}
          <div>
            <div
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontStyle: "italic",
                fontSize: "1rem",
                color: WHITE_70,
                lineHeight: 1.8,
                marginBottom: 32,
              }}
            >
              &ldquo;{t("quote")}
              <br />
              {t("author")}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                {
                  icon: "🛡",
                  labelKey: "sacredSpace",
                  subKey: "sacredSpaceSub",
                },
                {
                  icon: "👤",
                  labelKey: "trustedGuide",
                  subKey: "trustedGuideSub",
                },
                {
                  icon: "♡",
                  labelKey: "soulCentered",
                  subKey: "soulCenteredSub",
                },
              ].map((b) => (
                <div
                  key={b.labelKey}
                  style={{
                    flex: 1,
                    textAlign: "center",
                    padding: "12px 8px",
                    borderRadius: 12,
                    background: "rgba(212,175,100,0.06)",
                    border: "1px solid rgba(212,175,100,0.15)",
                  }}
                >
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{b.icon}</div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.8rem",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {t(b.labelKey)}
                  </div>
                  <div
                    style={{
                      fontSize: "0.68rem",
                      color: WHITE_50,
                      marginTop: 2,
                    }}
                  >
                    {t(b.subKey)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CENTER: Session Selector Card ── */}
          <div
            style={{
              background: CARD_BG,
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: `1px solid ${CARD_BORDER}`,
              borderRadius: 20,
              overflow: "hidden",
              boxShadow:
                "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
            }}
          >
            {/* Card header */}
            <div
              style={{
                padding: "20px 24px",
                background: "rgba(20, 10, 50, 0.4)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "20px 20px 0 0",
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 12 }}>
                <span style={{ color: GOLD, fontSize: 18 }}>✦</span>
                <div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      letterSpacing: "0.12em",
                    }}
                  >
                    {t("chooseSession")}
                  </div>
                  <div
                    style={{
                      fontSize: "0.72rem",
                      color: WHITE_50,
                      marginTop: 2,
                    }}
                  >
                    {t("personalized")}
                  </div>
                </div>
              </div>
              <div
                style={{
                  background: "rgba(212,175,100,0.1)",
                  border: "1px solid rgba(212,175,100,0.3)",
                  borderRadius: 100,
                  padding: "4px 14px",
                  fontSize: "0.68rem",
                  color: GOLD_BRIGHT,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  whiteSpace: "nowrap",
                }}
              >
                ✿ {t("sacredSessions")}
              </div>
            </div>

            {/* Session rows */}
            {sessions.map((s) => (
              <div
                key={s.id}
                onClick={() => handleSelectSession(s)}
                style={{
                  padding: "18px 20px",
                  margin: "6px 12px",
                  cursor: "pointer",
                  display: "grid",
                  gridTemplateColumns: "44px 1fr auto 44px",
                  gap: "0 16px",
                  alignItems: "center",
                  background:
                    selected === s.id
                      ? "rgba(212, 175, 100, 0.08)"
                      : "rgba(255, 255, 255, 0.04)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border:
                    selected === s.id
                      ? "1px solid rgba(212, 175, 100, 0.45)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                  borderLeft:
                    selected === s.id
                      ? "3px solid rgba(212, 175, 100, 0.9)"
                      : "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: "12px",
                  transition: "all 0.2s ease",
                  boxShadow:
                    selected === s.id
                      ? "0 0 20px rgba(212, 175, 100, 0.08)"
                      : "none",
                }}
                onMouseEnter={(e) => {
                  if (selected !== s.id) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255, 255, 255, 0.06)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255, 255, 255, 0.14)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selected !== s.id) {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(255, 255, 255, 0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255, 255, 255, 0.08)";
                  }
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(212,175,100,0.35)",
                    background: "rgba(212,175,100,0.06)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <IconSvg type={s.icon} />
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 700,
                      fontSize: "0.78rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {t(s.nameKey)}
                  </div>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: WHITE_50,
                      lineHeight: 1.5,
                      marginTop: 4,
                    }}
                  >
                    {t(s.descriptionKey)}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "0.72rem", color: WHITE_70 }}>
                    {s.duration}
                  </div>
                  <div
                    style={{
                      fontWeight: 600,
                      fontSize: "0.88rem",
                      marginTop: 2,
                    }}
                  >
                    {s.price}
                  </div>
                </div>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    border:
                      selected === s.id
                        ? `2px solid ${GOLD}`
                        : "1.5px solid rgba(255,255,255,0.3)",
                    background: selected === s.id ? GOLD : "transparent",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selected === s.id && (
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: "50%",
                        background: "#0a0514",
                      }}
                    />
                  )}
                </div>
              </div>
            ))}

            {/* Card footer */}
            <div style={{ padding: "20px 24px 24px" }}>
              <Link
                href="/shop/mentorship/select-time"
                style={{ textDecoration: "none" }}
              >
                <button
                  style={{
                    width: "100%",
                    maxWidth: "460px",
                    padding: "16px 24px",
                    background:
                      "linear-gradient(135deg, rgba(212,175,100,0.12) 0%, rgba(212,175,100,0.22) 100%)",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                    border: "1px solid rgba(212,175,100,0.45)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: "0.82rem",
                    fontWeight: 400,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    display: "block",
                    margin: "0 auto",
                    transition: "all 0.25s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(212,175,100,0.2) 0%, rgba(212,175,100,0.35) 100%)";
                    e.currentTarget.style.borderColor = "rgba(212,175,100,0.8)";
                    e.currentTarget.style.boxShadow =
                      "0 0 24px rgba(212,175,100,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background =
                      "linear-gradient(135deg, rgba(212,175,100,0.12) 0%, rgba(212,175,100,0.22) 100%)";
                    e.currentTarget.style.borderColor =
                      "rgba(212,175,100,0.45)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {t("continue")}
                </button>
              </Link>
              <div
                style={{
                  textAlign: "center",
                  marginTop: 12,
                  fontSize: "0.68rem",
                  color: WHITE_50,
                }}
              >
                🔒 &nbsp; {t("privacyNote")}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Journey Steps ── */}
          <div>
            <div
              style={{
                fontSize: "0.72rem",
                letterSpacing: "0.35em",
                color: WHITE_70,
                marginBottom: 32,
                textTransform: "uppercase",
              }}
            >
              {t("yourJourney")}
            </div>
            {steps.map((step, i) => (
              <div key={step.num}>
                {i > 0 && (
                  <div
                    style={{
                      width: 2,
                      height: 56,
                      marginLeft: 23,
                      background: "rgba(100,80,180,0.5)",
                    }}
                  />
                )}
                <div
                  style={{ display: "flex", gap: 14, alignItems: "flex-start" }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      border: "1px solid rgba(212,175,100,0.8)",
                      background: "rgba(212,175,100,0.12)",
                      boxShadow: "0 0 16px rgba(140,80,255,0.5)",
                    }}
                  >
                    <StepIcon type={step.icon} active={true} />
                  </div>
                  <div style={{ paddingTop: 4 }}>
                    <div
                      style={{
                        fontSize: "0.65rem",
                        color: GOLD_BRIGHT,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {step.num}
                    </div>
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: "0.82rem",
                        letterSpacing: "0.08em",
                        marginTop: 2,
                      }}
                    >
                      {t(step.titleKey)}
                    </div>
                    <div
                      style={{
                        fontSize: "0.72rem",
                        color: WHITE_50,
                        lineHeight: 1.5,
                        maxWidth: 140,
                        marginTop: 3,
                      }}
                    >
                      {t(step.descKey)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM TRUST BAR ── */}
        <div
          style={{
            background: "rgba(10,5,30,0.65)",
            backdropFilter: "blur(8px)",
            borderTop: "1px solid rgba(212,175,100,0.12)",
            padding: "28px 40px",
            marginTop: 0,
            display: "flex",
            justifyContent: "center",
            gap: 80,
          }}
        >
          {[
            {
              icon: "🌐",
              labelKey: "globalSessions",
              subKey: "globalSessionsSub",
            },
            {
              icon: "🔒",
              labelKey: "privateSecure",
              subKey: "privateSecureSub",
            },
            { icon: "🪷", labelKey: "soulAligned", subKey: "soulAlignedSub" },
          ].map((b) => (
            <div key={b.labelKey} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{b.icon}</div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.8rem",
                  letterSpacing: "0.05em",
                }}
              >
                {t(b.labelKey)}
              </div>
              <div
                style={{
                  fontSize: "0.7rem",
                  color: WHITE_50,
                  lineHeight: 1.5,
                  marginTop: 4,
                  whiteSpace: "pre-line",
                }}
              >
                {t(b.subKey)}
              </div>
            </div>
          ))}
        </div>

        {/* ── ABOUT SECTION ── */}
        <section
          style={{
            maxWidth: 1100,
            margin: "60px auto 0",
            padding: "0 40px 80px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.2rem",
                color: GOLD,
                marginBottom: 16,
                letterSpacing: "0.05em",
              }}
            >
              {t("whatToExpect")}
            </h3>
            <p style={{ fontSize: "0.9rem", color: WHITE_70, lineHeight: 1.8 }}>
              {t("aboutBody")}
            </p>
          </div>
          <div
            style={{
              background: "rgba(10,5,30,0.6)",
              borderRadius: 16,
              border: "1px solid rgba(212,175,100,0.12)",
              padding: "24px 28px",
            }}
          >
            <h4
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.1rem",
                color: WHITE_FULL,
                marginBottom: 16,
              }}
            >
              {t("youllReceive")}
            </h4>
            {["receive1", "receive2", "receive3", "receive4"].map((key) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 12,
                  fontSize: "0.85rem",
                  color: WHITE_70,
                }}
              >
                <span style={{ color: GOLD, fontSize: 12 }}>✦</span> {t(key)}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── MOBILE ── */}
      <div
        className="lg:hidden flex flex-col"
        style={{ background: "#0a0514" }}
      >
        <section style={{ textAlign: "center", padding: "100px 20px 40px" }}>
          <p
            style={{
              fontSize: "0.68rem",
              letterSpacing: "0.25em",
              color: GOLD_BRIGHT,
              marginBottom: 16,
            }}
          >
            {t("awakenAlignTransform")}
          </p>
          <h1 style={{ margin: 0 }}>
            <span
              style={{
                display: "block",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "2rem",
                fontWeight: 600,
                color: WHITE_FULL,
              }}
            >
              {t("title")}
            </span>
            <span
              style={{
                display: "block",
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.6rem",
                fontWeight: 400,
                fontStyle: "italic",
                color: GOLD,
                marginTop: 4,
              }}
            >
              {t("withFard")}
            </span>
          </h1>
          <p
            style={{
              fontSize: "0.9rem",
              color: WHITE_70,
              lineHeight: 1.7,
              marginTop: 16,
            }}
          >
            {t("subtitle")}
          </p>
        </section>

        {/* Mobile: Session Card */}
        <div
          style={{
            margin: "0 16px",
            background: CARD_BG,
            backdropFilter: "blur(16px)",
            border: `1px solid ${CARD_BORDER}`,
            borderRadius: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid rgba(212,175,100,0.12)",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: "0.85rem",
                letterSpacing: "0.1em",
              }}
            >
              {t("chooseSession")}
            </div>
            <div style={{ fontSize: "0.7rem", color: WHITE_50, marginTop: 2 }}>
              {t("personalized")}
            </div>
          </div>
          {sessions.map((s) => (
            <div
              key={s.id}
              onClick={() => handleSelectSession(s)}
              style={{
                padding: "14px 16px",
                borderBottom: "1px solid rgba(255,255,255,0.06)",
                cursor: "pointer",
                background: selected === s.id ? ROW_SELECTED : "transparent",
                borderLeft:
                  selected === s.id
                    ? "2px solid rgba(212,175,100,0.7)"
                    : "2px solid transparent",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 4,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    letterSpacing: "0.06em",
                    flex: 1,
                  }}
                >
                  {t(s.nameKey)}
                </div>
                <div style={{ fontSize: "0.7rem", color: WHITE_70 }}>
                  {s.duration}
                </div>
                <div style={{ fontWeight: 600, fontSize: "0.8rem" }}>
                  {s.price}
                </div>
              </div>
              <div
                style={{
                  fontSize: "0.68rem",
                  color: WHITE_50,
                  lineHeight: 1.4,
                }}
              >
                {t(s.descriptionKey)}
              </div>
            </div>
          ))}
          <div style={{ padding: "16px" }}>
            <CTAButton href="/shop/mentorship/select-time" size="fullWidth">
              {t("continueMobile")}
            </CTAButton>
          </div>
        </div>

        {/* Mobile: Trust bar */}
        <div
          style={{
            textAlign: "center",
            padding: "40px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          {[
            { icon: "🌐", labelKey: "globalSessions" },
            { icon: "🔒", labelKey: "privateSecure" },
            { icon: "🪷", labelKey: "soulAligned" },
          ].map((b) => (
            <div key={b.labelKey}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{b.icon}</div>
              <div
                style={{
                  fontWeight: 600,
                  fontSize: "0.78rem",
                  letterSpacing: "0.04em",
                }}
              >
                {t(b.labelKey)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
