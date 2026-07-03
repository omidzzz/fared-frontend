"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";

import {
  SocialLinksPanel,
  SupportFeaturesPanel,
} from "@/components/aura/ShopSidePanels";

const FAQ_ITEMS = [
  {
    id: "faq-1",
    questionKey: "faq.questions.shipping",
    answerKey: "faq.answers.shipping",
  },
  {
    id: "faq-2",
    questionKey: "faq.questions.returns",
    answerKey: "faq.answers.returns",
  },
  {
    id: "faq-3",
    questionKey: "faq.questions.authenticity",
    answerKey: "faq.answers.authenticity",
  },
  {
    id: "faq-4",
    questionKey: "faq.questions.mentor",
    answerKey: "faq.answers.mentor",
  },
];

const inputClass =
  "w-full bg-white/[0.07] border border-white/[0.15] rounded-3xl px-6 py-4 font-farsi text-sm text-white min-h-[52px] outline-none focus:border-[#ff00ff]/70 focus:ring-4 focus:ring-[#ff00ff]/20 backdrop-blur-2xl transition-all duration-500 hover:border-[#00ffff]/50 shadow-inner";

/** Decorative floating blob used in the desktop psychedelic backdrop */
function Blob({
  className,
  gradient,
  animation,
}: {
  className: string;
  gradient: string;
  animation: string;
}) {
  return (
    <div
      className={`absolute rounded-full blur-3xl mix-blend-screen ${className}`}
      style={{ background: gradient, animation }}
    />
  );
}

export default function ContactPage() {
  const t = useTranslations("contact");
  const { isRTL } = useLocale();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [openFaq, setOpenFaq] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError("");
    if (!name || !email || !message) {
      setError(t("form.errors.required"));
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject, message }),
      });
      if (!res.ok) throw new Error("Failed");
      toast.success(t("form.success"));
      setIsSubmitted(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      toast.error(t("form.errors.failed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName("");
    setEmail("");
    setPhone("");
    setSubject("");
    setMessage("");
    setIsSubmitted(false);
    setError("");
  };

  return (
    <main
      className="min-h-screen overflow-hidden relative bg-black"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Background Universe — MOBILE (lightweight, static) */}
      <div className="lg:hidden fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/hero-backgrounds/contacts-hero.webp"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          priority
          className="object-cover object-center scale-[1.08]"
        />

        {/* Single static color wash — no blur, no animation */}
        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 15%, rgba(255, 0, 255, 0.32) 0%, transparent 55%),
              radial-gradient(circle at 75% 65%, rgba(0, 255, 255, 0.28) 0%, transparent 55%),
              radial-gradient(circle at 40% 85%, rgba(255, 215, 0, 0.2) 0%, transparent 60%)
            `,
          }}
        />

        {/* Static dot grid, no pulse animation */}
        <div className="absolute inset-0 bg-[radial-gradient(#ff00ff_1px,transparent_2px)] [background-size:50px_50px] opacity-[0.12]" />

        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-950/40 to-black/80" />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      {/* Background Universe — DESKTOP (unchanged) */}
      <div className="hidden lg:block fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/images/hero-backgrounds/contacts-hero.webp"
          alt=""
          fill
          sizes="100vw"
          unoptimized
          priority
          className="object-cover object-center scale-[1.08]"
        />

        {/* Slow-spinning conic swirl */}
        <div
          className="absolute -inset-[20%] opacity-30"
          style={{
            background:
              "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffd700, #ff00ff)",
            filter: "blur(120px)",
            animation: "psySpin 40s linear infinite",
          }}
        />

        {/* Floating color blobs */}
        <Blob
          className="w-[45vw] h-[45vw] top-[-10%] left-[-10%]"
          gradient="radial-gradient(circle, rgba(255,0,255,0.55) 0%, transparent 70%)"
          animation="blobDrift1 22s ease-in-out infinite"
        />
        <Blob
          className="w-[38vw] h-[38vw] bottom-[-15%] right-[-10%]"
          gradient="radial-gradient(circle, rgba(0,255,255,0.5) 0%, transparent 70%)"
          animation="blobDrift2 26s ease-in-out infinite"
        />
        <Blob
          className="w-[30vw] h-[30vw] top-[35%] left-[45%]"
          gradient="radial-gradient(circle, rgba(255,215,0,0.4) 0%, transparent 70%)"
          animation="blobDrift3 19s ease-in-out infinite"
        />
        <Blob
          className="w-[26vw] h-[26vw] top-[10%] right-[15%]"
          gradient="radial-gradient(circle, rgba(153,0,255,0.45) 0%, transparent 70%)"
          animation="blobDrift1 30s ease-in-out infinite reverse"
        />

        {/* Dot grid, pulsing */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#ff00ff_1px,transparent_2px)] [background-size:50px_50px]"
          style={{ animation: "dotPulse 6s ease-in-out infinite" }}
        />

        {/* Fine secondary grid, offset, cyan */}
        <div className="absolute inset-0 bg-[radial-gradient(#00ffff_1px,transparent_2px)] [background-size:80px_80px] opacity-[0.06] [background-position:25px_25px]" />

        {/* Chromatic sweep line */}
        <div
          className="absolute inset-y-0 w-[2px] left-1/2"
          style={{
            background:
              "linear-gradient(to bottom, transparent, #ff00ff, #00ffff, transparent)",
            filter: "blur(2px)",
            opacity: 0.35,
            animation: "sweepX 14s ease-in-out infinite",
          }}
        />

        {/* Grain/noise overlay for texture */}
        <div
          className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: `
              radial-gradient(circle at 25% 15%, rgba(255, 0, 255, 0.35) 0%, transparent 60%),
              radial-gradient(circle at 75% 65%, rgba(0, 255, 255, 0.35) 0%, transparent 60%),
              radial-gradient(circle at 40% 85%, rgba(255, 215, 0, 0.25) 0%, transparent 70%)
            `,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-950/40 to-black/80" />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.75) 100%)",
          }}
        />
      </div>

      {/* ── MOBILE ── */}
      <div className="lg:hidden relative z-10 flex flex-col min-h-screen pt-16 pb-20 px-6">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4 text-[#ff00ff] uppercase tracking-[3px] text-xs font-medium">
            <span className="block w-6 h-px bg-gradient-to-r from-transparent to-[#ff00ff]" />
            <span
              style={{
                background:
                  "linear-gradient(90deg, #ff00ff, #00ffff, #ffd700, #ff00ff)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "textShimmer 6s linear infinite",
              }}
            >
              {t("hero.badge")}
            </span>
            <span className="block w-6 h-px bg-gradient-to-l from-transparent to-[#00ffff]" />
          </div>
          <h1
            className="text-4xl sm:text-5xl leading-tight font-bold text-transparent bg-clip-text bg-gradient-to-b from-white via-purple-200 to-cyan-200 drop-shadow-[0_10px_30px_rgba(255,0,255,0.6)]"
            style={{
              fontFamily: isRTL
                ? "'Vazirmatn', sans-serif"
                : "'Playfair Display', serif",
              paddingBottom: "4px",
            }}
          >
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-white/80 max-w-[280px] mx-auto">
            {t("hero.subtitle")}
          </p>
        </div>

        {/* Form - Mobile */}
        <div className="relative z-20 mb-12">
          {!isSubmitted ? (
            <div className="relative rounded-3xl p-[1.5px] bg-gradient-to-br from-[#ff00ff]/60 via-[#00ffff]/40 to-[#ffd700]/60 shadow-2xl">
              <div className="rounded-3xl p-8 bg-black/60 border border-white/10 backdrop-blur-3xl">
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-4 text-white">
                  <span
                    className="text-4xl"
                    style={{ animation: "spinSlow 8s linear infinite" }}
                  >
                    ✹
                  </span>{" "}
                  {t("form.title")}
                </h2>

                {error && (
                  <div className="mb-6 p-4 rounded-2xl bg-red-500/10 border border-red-400/30 text-red-200 text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-6">
                  <input
                    type="text"
                    placeholder={t("form.labels.name")}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <input
                    type="email"
                    placeholder={t("form.labels.email")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="tel"
                      placeholder={t("form.labels.phone")}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                    <input
                      type="text"
                      placeholder={t("form.labels.subject")}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className={inputClass}
                      dir={isRTL ? "rtl" : "ltr"}
                    />
                  </div>
                  <textarea
                    rows={5}
                    placeholder={t("form.labels.message")}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-white/[0.07] border border-white/[0.15] rounded-3xl px-6 py-5 text-sm resize-none focus:border-[#ff00ff] focus:ring-4 focus:ring-[#ff00ff]/20"
                    dir={isRTL ? "rtl" : "ltr"}
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="mt-10 w-full py-5 rounded-3xl font-bold text-lg bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00ff] text-white shadow-xl shadow-purple-500/40 active:scale-95 transition-all"
                  style={{
                    backgroundSize: "200% 100%",
                    animation: "buttonPulse 4s ease-in-out infinite",
                  }}
                >
                  {isSubmitting
                    ? t("form.buttons.submitting")
                    : t("form.buttons.submit")}
                </button>
              </div>
            </div>
          ) : (
            <div className="relative text-center py-20 rounded-3xl border border-white/10 backdrop-blur-3xl bg-gradient-to-b from-white/5 to-transparent overflow-hidden">
              <div className="relative">
                <div
                  className="text-8xl mb-8"
                  style={{ animation: "floatBounce 3s ease-in-out infinite" }}
                >
                  🌌
                </div>
                <h3 className="text-3xl font-bold mb-3">
                  {t("form.successTitle")}
                </h3>
                <p className="text-white/70 max-w-xs mx-auto">
                  {t("form.successMessage")}
                </p>
                <button
                  onClick={handleReset}
                  className="mt-10 px-12 py-4 border-2 border-[#ff00ff] rounded-3xl text-[#ff00ff] hover:bg-[#ff00ff] hover:text-white transition-all font-medium"
                >
                  {t("form.buttons.newMessage")}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ── MOBILE: Badges side by side ── */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          <div className="rounded-2xl overflow-hidden">
            <SupportFeaturesPanel />
          </div>
          <div className="rounded-2xl overflow-hidden">
            <SocialLinksPanel />
          </div>
        </div>

        {/* FAQ - Mobile with RTL support */}
        <div>
          <h2
            className="text-3xl font-bold text-center mb-8 tracking-wider"
            style={{
              background:
                "linear-gradient(90deg, #ffffff, #ffccff, #ccffff, #ffffff)",
              backgroundSize: "300% 100%",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              animation: "textShimmer 8s linear infinite",
            }}
          >
            {t("faq.title")}
          </h2>
          {FAQ_ITEMS.map((faq) => (
            <div
              key={faq.id}
              className="mb-4 rounded-3xl bg-white/[0.05] border border-white/10 overflow-hidden backdrop-blur-xl hover:border-[#ff00ff]/40 transition-colors duration-500"
            >
              <button
                className="w-full px-7 py-6 flex justify-between items-center"
                dir={isRTL ? "rtl" : "ltr"}
                onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)}
                style={{
                  textAlign: isRTL ? "right" : "left",
                }}
              >
                <span
                  className="font-medium"
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    paddingRight: isRTL ? 0 : "2rem",
                    paddingLeft: isRTL ? "2rem" : 0,
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "inherit",
                  }}
                >
                  {t(faq.questionKey)}
                </span>
                <span
                  className={`text-3xl text-[#ff00ff] transition-transform duration-500 flex-shrink-0 ${
                    openFaq === faq.id ? "rotate-180" : ""
                  }`}
                >
                  ⟡
                </span>
              </button>
              {openFaq === faq.id && (
                <div
                  className="px-7 pb-8 text-white/80 border-t border-white/10 pt-6"
                  dir={isRTL ? "rtl" : "ltr"}
                  style={{
                    textAlign: isRTL ? "right" : "left",
                    fontFamily: isRTL
                      ? "'Vazirmatn', 'IranSans', sans-serif"
                      : "inherit",
                  }}
                >
                  {t(faq.answerKey)}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP (unchanged) ── */}
      <div className="hidden lg:block relative z-10 min-h-screen">
        <div className="max-w-screen-2xl mx-auto px-12 pt-24 pb-32">
          {/* Floating Hero */}
          <div className="flex flex-col items-center text-center mb-20">
            <div
              className="mb-6 inline-flex items-center gap-2 px-8 py-2.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl text-sm uppercase tracking-[4px]"
              style={{
                background:
                  "linear-gradient(90deg, #ff99ff, #99ffff, #ffe699, #ff99ff)",
                backgroundSize: "300% 100%",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                animation: "textShimmer 7s linear infinite",
              }}
            >
              {t("desktop.badge")}
            </div>
            <h1
              className="text-[5.2rem] leading-none font-medium tracking-tighter text-white relative"
              style={{
                fontFamily: isRTL
                  ? "'Vazirmatn', sans-serif"
                  : "'Playfair Display', serif",
                textShadow: "0 0 80px rgba(255, 0, 255, 0.7)",
                animation: "titleGlow 5s ease-in-out infinite",
              }}
            >
              {t("hero.title")}
            </h1>
            <p className="max-w-lg mt-6 text-xl text-white/75">
              {t("hero.subtitle")}
            </p>
          </div>

          {/* ── DESKTOP: Three Column Layout ── */}
          {isRTL ? (
            <div className="grid grid-cols-12 gap-8 relative">
              {/* RTL: Social Links → Form → Support Features */}
              <div className="col-span-3 flex items-start justify-center">
                <div className="w-full max-w-[260px]">
                  <SocialLinksPanel />
                </div>
              </div>
              <div className="col-span-6 px-4">
                <div>
                  {!isSubmitted ? (
                    <div
                      className="relative rounded-[2.75rem] p-[2px] shadow-2xl"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffd700, #ff00ff)",
                        backgroundSize: "200% 200%",
                        animation: "borderSpin 10s linear infinite",
                      }}
                    >
                      <div className="rounded-[2.7rem] p-14 border border-white/10 bg-[#0a0212]/80 backdrop-blur-3xl">
                        <div className="flex justify-center mb-10">
                          <div className="px-10 py-2 rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 text-[#ff99ff] text-sm tracking-widest">
                            {t("desktop.formBadge")}
                          </div>
                        </div>

                        {error && (
                          <div className="mb-8 text-center text-red-400 bg-red-900/20 py-4 rounded-2xl border border-red-500/30">
                            {error}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.name")}
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.email")}
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-6">
                          <div>
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.phone")}
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.subject")}
                            </label>
                            <input
                              type="text"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                            {t("form.labels.message")}
                          </label>
                          <textarea
                            rows={7}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white/[0.07] border border-white/[0.15] rounded-3xl px-6 py-5 text-sm resize-y min-h-[160px] focus:border-[#ff00ff] focus:ring-[#ff00ff]/30"
                          />
                        </div>

                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="mt-12 w-full py-6 text-xl font-bold rounded-3xl bg-gradient-to-r from-[#ff00ff] to-[#00ffff] text-w shadow-[0_0_50px_-10px] shadow-[#ff00ff] hover:brightness-110 active:scale-[0.985] transition-all duration-200"
                          style={{
                            backgroundSize: "200% 100%",
                            animation: "buttonPulse 4s ease-in-out infinite",
                          }}
                        >
                          {isSubmitting
                            ? t("desktop.submitting")
                            : t("form.buttons.submit")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-[2.75rem] p-20 text-center border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-3xl overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          background:
                            "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffd700, #ff00ff)",
                          filter: "blur(100px)",
                          animation: "psySpin 14s linear infinite",
                        }}
                      />
                      <div className="relative">
                        <div
                          className="text-[120px] leading-none mb-6"
                          style={{
                            animation: "floatBounce 3.5s ease-in-out infinite",
                          }}
                        >
                          🌈
                        </div>
                        <h2 className="text-5xl font-bold mb-4 tracking-tight">
                          {t("form.successTitle")}
                        </h2>
                        <p className="text-2xl text-white/70 mb-12">
                          {t("form.successMessage")}
                        </p>
                        <button
                          onClick={handleReset}
                          className="px-16 py-5 text-lg border-2 border-[#ff00ff] rounded-3xl hover:bg-[#ff00ff] hover:text-white transition-all"
                        >
                          {t("form.buttons.newMessage")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="col-span-3 flex items-start justify-center mr-20">
                <div className="w-full max-w-[260px]">
                  <SupportFeaturesPanel />
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-12 gap-8 relative">
              {/* LTR: Support Features → Form → Social Links */}
              <div
                className={`col-span-3 flex items-start justify-start ${
                  isRTL ? "mr-20" : "ml-20"
                }`}
              >
                <div className="w-full max-w-[260px]">
                  <SupportFeaturesPanel />
                </div>
              </div>
              <div className="col-span-6 px-4">
                <div>
                  {!isSubmitted ? (
                    <div
                      className="relative rounded-[2.75rem] p-[2px] shadow-2xl"
                      style={{
                        background:
                          "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffd700, #ff00ff)",
                        backgroundSize: "200% 200%",
                        animation: "borderSpin 10s linear infinite",
                      }}
                    >
                      <div className="rounded-[2.7rem] p-14 border border-white/10 bg-[#0a0212]/80 backdrop-blur-3xl">
                        <div className="flex justify-center mb-10">
                          <div className="px-10 py-2 rounded-3xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-white/10 text-[#ff99ff] text-sm tracking-widest">
                            {t("desktop.formBadge")}
                          </div>
                        </div>

                        {error && (
                          <div className="mb-8 text-center text-red-400 bg-red-900/20 py-4 rounded-2xl border border-red-500/30">
                            {error}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-6">
                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.name")}
                            </label>
                            <input
                              type="text"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div className="col-span-2 md:col-span-1">
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.email")}
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mt-6">
                          <div>
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.phone")}
                            </label>
                            <input
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                          <div>
                            <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                              {t("form.labels.subject")}
                            </label>
                            <input
                              type="text"
                              value={subject}
                              onChange={(e) => setSubject(e.target.value)}
                              className={inputClass}
                            />
                          </div>
                        </div>

                        <div className="mt-6">
                          <label className="block text-xs tracking-[2px] text-white/60 mb-3">
                            {t("form.labels.message")}
                          </label>
                          <textarea
                            rows={7}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="w-full bg-white/[0.07] border border-white/[0.15] rounded-3xl px-6 py-5 text-sm resize-y min-h-[160px] focus:border-[#ff00ff] focus:ring-[#ff00ff]/30"
                          />
                        </div>

                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="mt-12 w-full py-6 text-xl font-bold rounded-3xl bg-gradient-to-r from-[#ff00ff] to-[#00ffff] text-w shadow-[0_0_50px_-10px] shadow-[#ff00ff] hover:brightness-110 active:scale-[0.985] transition-all duration-200"
                          style={{
                            backgroundSize: "200% 100%",
                            animation: "buttonPulse 4s ease-in-out infinite",
                          }}
                        >
                          {isSubmitting
                            ? t("desktop.submitting")
                            : t("form.buttons.submit")}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-[2.75rem] p-20 text-center border border-white/10 bg-gradient-to-br from-white/[0.06] to-transparent backdrop-blur-3xl overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-40"
                        style={{
                          background:
                            "conic-gradient(from 0deg, #ff00ff, #00ffff, #ffd700, #ff00ff)",
                          filter: "blur(100px)",
                          animation: "psySpin 14s linear infinite",
                        }}
                      />
                      <div className="relative">
                        <div
                          className="text-[120px] leading-none mb-6"
                          style={{
                            animation: "floatBounce 3.5s ease-in-out infinite",
                          }}
                        >
                          🌈
                        </div>
                        <h2 className="text-5xl font-bold mb-4 tracking-tight">
                          {t("form.successTitle")}
                        </h2>
                        <p className="text-2xl text-white/70 mb-12">
                          {t("form.successMessage")}
                        </p>
                        <button
                          onClick={handleReset}
                          className="px-16 py-5 text-lg border-2 border-[#ff00ff] rounded-3xl hover:bg-[#ff00ff] hover:text-white transition-all"
                        >
                          {t("form.buttons.newMessage")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div
                className={`col-span-3 flex items-start justify-start ${
                  isRTL ? "" : "ml-20"
                }`}
              >
                <div className="w-full max-w-[260px]">
                  <SocialLinksPanel />
                </div>
              </div>
            </div>
          )}

          {/* ── FAQ ── */}
          <div className="mt-32 max-w-4xl mx-auto">
            <div className="flex justify-center mb-12">
              <div className="px-12 py-3 border border-white/20 rounded-3xl uppercase tracking-[3px] text-sm">
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #ff99ff, #99ffff, #ffe699, #ff99ff)",
                    backgroundSize: "300% 100%",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                    animation: "textShimmer 9s linear infinite",
                  }}
                >
                  {t("desktop.faqBadge")}
                </span>
              </div>
            </div>

            <div className="grid gap-5">
              {FAQ_ITEMS.map((faq) => (
                <div
                  key={faq.id}
                  className="group border border-white/10 bg-white/[0.04] rounded-3xl overflow-hidden backdrop-blur-xl hover:border-[#ff00ff]/40 hover:shadow-[0_0_40px_-15px_#ff00ff] transition-all duration-500"
                >
                  <button
                    className="w-full px-10 py-8 flex items-center justify-between text-left"
                    onClick={() =>
                      setOpenFaq(openFaq === faq.id ? null : faq.id)
                    }
                  >
                    <span className="text-xl text-white group-hover:text-[#ffccff] transition-colors">
                      {t(faq.questionKey)}
                    </span>
                    <span
                      className={`text-4xl text-[#ff00ff] transition-transform duration-500 ${
                        openFaq === faq.id ? "rotate-180" : ""
                      }`}
                    >
                      ⟡
                    </span>
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-10 pb-10 text-lg text-white/80 border-t border-white/10 pt-8 leading-relaxed">
                      {t(faq.answerKey)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes cosmicFloat {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(3deg);
          }
        }

        @keyframes psySpin {
          0% {
            transform: rotate(0deg) scale(1);
          }
          50% {
            transform: rotate(180deg) scale(1.15);
          }
          100% {
            transform: rotate(360deg) scale(1);
          }
        }

        @keyframes blobDrift1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(6%, 8%) scale(1.15);
          }
          66% {
            transform: translate(-4%, 4%) scale(0.9);
          }
        }

        @keyframes blobDrift2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          40% {
            transform: translate(-8%, -6%) scale(1.2);
          }
          75% {
            transform: translate(5%, -3%) scale(0.95);
          }
        }

        @keyframes blobDrift3 {
          0%,
          100% {
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            transform: translate(-45%, -55%) scale(1.3);
          }
        }

        @keyframes dotPulse {
          0%,
          100% {
            opacity: 0.1;
          }
          50% {
            opacity: 0.22;
          }
        }

        @keyframes sweepX {
          0%,
          100% {
            transform: translateX(-30vw);
            opacity: 0;
          }
          50% {
            transform: translateX(30vw);
            opacity: 0.35;
          }
        }

        @keyframes textShimmer {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 300% 50%;
          }
        }

        @keyframes titleGlow {
          0%,
          100% {
            filter: drop-shadow(0 0 30px rgba(255, 0, 255, 0.5));
          }
          50% {
            filter: drop-shadow(0 0 60px rgba(0, 255, 255, 0.6));
          }
        }

        @keyframes buttonPulse {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes borderSpin {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 200% 200%;
          }
        }

        @keyframes floatBounce {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-14px) scale(1.05);
          }
        }

        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.001ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>
    </main>
  );
}
