"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";

const GOLD = "#d9b25f";

const destinations = [
  {
    id: "bali",
    name: "BALI",
    subtitle: "AWAKENING RETREAT",
    dates: "May 10 – May 17, 2025",
    image: "/images/products/tours/bali.webp",
  },
  {
    id: "peru",
    name: "PERU",
    subtitle: "SACRED VALLEY JOURNEY",
    dates: "Jun 14 – Jun 21, 2025",
    image: "/images/products/tours/peru.webp",
  },
  {
    id: "greece",
    name: "GREECE",
    subtitle: "AEGEAN SOUL ESCAPE",
    dates: "Jul 19 – Jul 26, 2025",
    image: "/images/products/tours/greece.webp",
  },
  {
    id: "thailand",
    name: "THAILAND",
    subtitle: "SPIRIT PATH RETREAT",
    dates: "Aug 16 – Aug 23, 2025",
    image: "/images/products/tours/thailand.webp",
  },
];

const tours = [
  {
    id: "bali",
    country: "BALI",
    name: "AWAKENING RETREAT",
    dates: "May 10 – May 17, 2025",
    image: "/images/products/tours/bali.webp",
  },
  {
    id: "peru",
    country: "PERU",
    name: "SACRED VALLEY JOURNEY",
    dates: "Jun 14 – Jun 21, 2025",
    image: "/images/products/tours/peru.webp",
  },
  {
    id: "greece",
    country: "GREECE",
    name: "AEGEAN SOUL ESCAPE",
    dates: "Jul 19 – Jul 26, 2025",
    image: "/images/products/tours/greece.webp",
  },
  {
    id: "thailand",
    country: "THAILAND",
    name: "SPIRIT PATH RETREAT",
    dates: "Aug 16 – Aug 23, 2025",
    image: "/images/products/tours/thailand.webp",
  },
];

function TourCard({ tour }: { tour: (typeof tours)[number] }) {
  const t = useTranslations("tours");

  return (
    <Link href={`/shop/tours/${tour.id}`} className="block w-full">
      <div
        className="group relative w-full overflow-hidden rounded-2xl border border-white/15 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl"
        style={{
          height: "clamp(160px, 35vw, 250px)",
        }}
      >
        <Image
          src={tour.image}
          alt={t(`destinations.${tour.id}.country`)}
          fill
          sizes="(max-width: 400px) 42vw, (max-width: 768px) 45vw, 210px"
          unoptimized
          className="object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050f1e]/95 via-[#050f1e]/55 to-transparent" />
        <div className="absolute left-1/2 top-2 -translate-x-1/2 text-[0.65rem] text-[#d4af64]/85">
          🪷
        </div>
        <div className="absolute bottom-3 left-0 right-0 px-2 text-center">
          <h3
            className="mb-0.5 font-bold text-white"
            style={{
              fontSize: "clamp(0.65rem, 1.6vw, 1rem)",
              letterSpacing: "0.08em",
            }}
          >
            {t(`destinations.${tour.id}.country`)}
          </h3>
          <p
            className="text-[0.4rem] text-white/65"
            style={{
              fontSize: "clamp(0.4rem, 1vw, 0.58rem)",
              letterSpacing: "0.06em",
            }}
          >
            {t(`destinations.${tour.id}.name`)}
          </p>
          <p
            className="flex items-center justify-center gap-1 text-[#d4af64]/85"
            style={{ fontSize: "clamp(0.4rem, 1vw, 0.58rem)" }}
          >
            <span className="text-[0.45rem]">🕐</span>
            {t(`destinations.${tour.id}.dates`)}
          </p>
        </div>
      </div>
    </Link>
  );
}

const Icon = {
  compass: (s = 17) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="12" r="9" />
      <polygon
        points="15.5 8.5 10.5 10.5 8.5 15.5 13.5 13.5"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  ),
  person: (s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-5.6 7-5.6s7 2 7 5.6" />
    </svg>
  ),
  envelope: (s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  shield: (s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6z" />
    </svg>
  ),
  calendar: (s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" />
    </svg>
  ),
  chevron: (s = 14) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  arrow: (s = 16) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  ),
  crystal: (s = 38) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 48 48"
      fill="none"
      stroke={GOLD}
      strokeWidth="1.2"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M24 5l9 11-9 27-9-27z" fill="rgba(217,178,95,0.12)" />
      <path d="M15 16h18M24 5v38M19.5 16L24 43M28.5 16L24 43" />
    </svg>
  ),
  instagram: (s = 22) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  youtube: (s = 22) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  ),
  facebook: (s = 22) => (
    <svg
      width={s}
      height={s}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
};

export default function ToursPage() {
  const t = useTranslations("tours");
  const { isRTL } = useLocale();
  const [form, setForm] = useState({
    name: "",
    email: "",
    retreat: "",
    date: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Retreat registration:", form);
  };

  return (
    <main
      dir={isRTL ? "rtl" : "ltr"}
      className="relative min-h-screen text-white font-body overflow-x-hidden"
    >
      {/* Background */}
      <div className="fixed inset-0 z-0" aria-hidden>
        <Image
          src="/images/hero-backgrounds/tours-hero.webp"
          alt=""
          fill
          sizes="100vw"
          priority
          unoptimized
          className="object-cover object-center"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 hidden lg:block bg-gradient-to-br from-[#04101c]/30 via-[#04101c]/15 to-[#04101c]/25" />
        <div className="absolute inset-0 lg:hidden bg-gradient-to-br from-[#04101c]/70 via-[#04101c]/40 to-[#04101c]/60" />
      </div>

      {/* Content */}
      <div className="relative z-1 max-w-6xl mx-auto px-3 sm:px-4 py-[clamp(100px,18vh,150px)] pb-8 sm:pb-12">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-[1fr_330px] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-10 lg:px-4">
          {/* HERO */}
          <div className="flex flex-col items-center text-center gap-4 sm:gap-5 lg:items-start lg:text-left lg:col-start-1 lg:row-start-1">
            <h1
              className="w-full font-display font-semibold text-white"
              style={{
                fontSize: "clamp(1.8rem, 7vw, 3.8rem)",
                lineHeight: 1.06,
              }}
            >
              {t("hero.title")}
              <br />
              {t("hero.titleFor")}{" "}
              <span style={{ color: GOLD }}>{t("hero.titleAccent")}</span>
            </h1>
            <p className="w-full max-w-md text-[clamp(0.9rem,2.5vw,1.1rem)] font-light leading-relaxed text-white/90 lg:max-w-sm">
              {t("hero.subtitle")}
            </p>
            <button className="inline-flex items-center gap-2.5 rounded-full bg-gradient-to-br from-[#3a7bd5] to-[#2b5fa8] px-[clamp(1.25rem,4vw,2.125rem)] py-[clamp(0.75rem,2vw,1rem)] text-[clamp(0.65rem,1.6vw,0.8rem)] font-semibold tracking-[0.1em] text-white shadow-[0_8px_30px_rgba(42,95,168,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(42,95,168,0.5)] min-h-[clamp(2.5rem,6vw,3rem)] lg:self-start">
              <span className="inline-flex text-white">{Icon.compass()}</span>
              {t("hero.cta")}
            </button>
          </div>

          {/* DESTINATIONS */}
          <div className="lg:col-start-1 lg:row-start-2">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-[#d4af64]/30" />
                <span className="text-[#d4af64] text-[0.55rem]">✦</span>
                <span className="text-[clamp(0.45rem,1.2vw,0.65rem)] tracking-[0.15em] text-white/65 uppercase">
                  {t("featuredDestinations")}
                </span>
                <span className="text-[#d4af64] text-[0.55rem]">✦</span>
                <div className="h-px flex-1 bg-[#d4af64]/30" />
              </div>

              <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4 lg:gap-3">
                {tours.map((tour) => (
                  <TourCard key={tour.id} tour={tour} />
                ))}
              </div>
            </div>
          </div>

          {/* FORM */}
          <aside className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 sm:gap-5 rounded-2xl border border-[#d9b25f]/55 bg-gradient-to-br from-[#0c2834]/80 to-[#081c2c]/80 p-[clamp(1rem,3.5vw,2.125rem)] backdrop-blur-xl shadow-2xl lg:h-full lg:justify-between"
            >
              <div>
                <div className="flex items-center justify-center gap-3 mb-2">
                  <span className="h-px w-[clamp(1.5rem,6vw,4.375rem)] bg-gradient-to-r from-transparent to-[#d9b25f]" />
                  <span className="inline-flex">{Icon.crystal()}</span>
                  <span className="h-px w-[clamp(1.5rem,6vw,4.375rem)] bg-gradient-to-l from-transparent to-[#d9b25f]" />
                </div>
                <h2 className="font-display font-semibold text-center text-[clamp(1.25rem,4.5vw,1.75rem)] text-white">
                  {t("registration.title")}
                </h2>
                <p className="text-center text-[clamp(0.7rem,2vw,0.875rem)] font-light text-white/80">
                  {t("registration.subtitle")}
                </p>
                <div className="text-center text-[clamp(0.8rem,1.8vw,1rem)] text-[#d9b25f] tracking-[0.2em] mt-2">
                  ❦
                </div>
              </div>

              <div className="flex flex-col gap-3">
                {[
                  {
                    icon: Icon.person(),
                    name: "name",
                    placeholder: t("registration.fullName"),
                    type: "text",
                    autoComplete: "name",
                  },
                  {
                    icon: Icon.envelope(),
                    name: "email",
                    placeholder: t("registration.emailAddress"),
                    type: "email",
                    autoComplete: "email",
                  },
                ].map((field) => (
                  <label
                    key={field.name}
                    className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3.5"
                  >
                    <span className="inline-flex text-white/65">
                      {field.icon}
                    </span>
                    <input
                      type={field.type}
                      name={field.name}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      value={form[field.name as keyof typeof form]}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, [field.name]: e.target.value }))
                      }
                      className="flex-1 min-w-0 bg-transparent border-none outline-none text-white text-[clamp(0.7rem,1.8vw,0.875rem)] placeholder:text-white/65"
                    />
                  </label>
                ))}

                <label className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3.5">
                  <span className="inline-flex text-white/65">
                    {Icon.shield()}
                  </span>
                  <select
                    name="retreat"
                    value={form.retreat}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, retreat: e.target.value }))
                    }
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-[clamp(0.7rem,1.8vw,0.875rem)] text-white/65 cursor-pointer appearance-none"
                    style={{
                      color: form.retreat ? "#fff" : "rgba(255,255,255,0.65)",
                    }}
                  >
                    <option value="" disabled className="text-black">
                      {t("registration.selectRetreatOption")}
                    </option>
                    {destinations.map((d) => (
                      <option key={d.id} value={d.id} className="text-black">
                        {t(`destinations.${d.id}.country`)} —{" "}
                        {t(`destinations.${d.id}.name`)}
                      </option>
                    ))}
                  </select>
                  <span className="inline-flex text-white/55">
                    {Icon.chevron()}
                  </span>
                </label>

                <label className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2.5 sm:px-4 sm:py-3.5">
                  <span className="inline-flex text-white/65">
                    {Icon.calendar()}
                  </span>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, date: e.target.value }))
                    }
                    className="flex-1 min-w-0 bg-transparent border-none outline-none text-[clamp(0.7rem,1.8vw,0.875rem)] [color-scheme:dark]"
                    style={{
                      color: form.date ? "#fff" : "rgba(255,255,255,0.65)",
                    }}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#d9b25f] bg-transparent px-4 py-3 text-[clamp(0.7rem,1.8vw,0.875rem)] font-bold tracking-[0.1em] text-[#d9b25f] transition-all duration-300 hover:bg-[#d9b25f] hover:text-[#1a1a2e] hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(217,178,95,0.3)] min-h-[clamp(2.75rem,6vw,3.5rem)]"
              >
                {t("registration.registerNow")}
                <span className="inline-flex">{Icon.arrow()}</span>
              </button>
            </form>
          </aside>
        </div>

        {/* FOOTER */}
        <footer className="relative mt-8 sm:mt-10 rounded-2xl border border-white/10 bg-[#081c2c]/30 px-[clamp(0.75rem,2.5vw,1.875rem)] py-[clamp(1rem,2.5vw,1.875rem)] backdrop-blur-xl shadow-xl lg:mt-16">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:flex-wrap sm:justify-between sm:gap-4">
            {/* Left */}
            <div className="flex w-full flex-col items-center gap-2 sm:w-auto sm:items-start">
              <p className="text-[clamp(0.5rem,1.2vw,0.7rem)] uppercase tracking-[0.12em] text-white/50">
                {t("footer.followJourney")}
              </p>
              <div className="flex items-center justify-center gap-4 sm:justify-start">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="text-white/40 transition-all duration-300 hover:text-[#d9b25f] hover:scale-110 hover:-translate-y-0.5"
                >
                  {Icon.instagram()}
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-white/40 transition-all duration-300 hover:text-[#d9b25f] hover:scale-110 hover:-translate-y-0.5"
                >
                  {Icon.youtube()}
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-white/40 transition-all duration-300 hover:text-[#d9b25f] hover:scale-110 hover:-translate-y-0.5"
                >
                  {Icon.facebook()}
                </a>
              </div>
            </div>

            {/* Quote */}
            <div className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:gap-3 max-w-xs sm:max-w-sm">
              <svg
                width="clamp(0.875rem,2vw,1.25rem)"
                height="clamp(0.875rem,2vw,1.25rem)"
                viewBox="0 0 24 24"
                fill="none"
                stroke={GOLD}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="flex-shrink-0"
              >
                <path d="M10 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.667-4 6" />
                <path d="M20 11h-4a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v6c0 2.667-1.333 4.667-4 6" />
              </svg>
              <p className="text-[clamp(0.6rem,1.6vw,0.85rem)] font-medium italic leading-relaxed text-white/75">
                {t("footer.quote")}
                <br className="block sm:hidden" />
                <span style={{ color: GOLD, fontWeight: 600 }}>
                  {" "}
                  {t("footer.quoteAccent")}
                </span>
              </p>
              <svg
                width="clamp(0.875rem,2vw,1.25rem)"
                height="clamp(0.875rem,2vw,1.25rem)"
                viewBox="0 0 24 24"
                fill="none"
                stroke={GOLD}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
                className="flex-shrink-0"
              >
                <path d="M14 13h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-6c0-2.667 1.333-4.667 4-6" />
                <path d="M4 13h4a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6c0-2.667 1.333-4.667 4-6" />
              </svg>
            </div>

            {/* Newsletter */}
            <div className="flex w-full flex-col items-center gap-1.5 sm:w-auto sm:items-end">
              <p className="text-[clamp(0.5rem,1.2vw,0.7rem)] uppercase tracking-[0.1em] text-white/50">
                {t("footer.newsletter")}
              </p>
              <div className="flex w-full flex-col gap-1.5 sm:flex-row sm:gap-2">
                <input
                  type="email"
                  placeholder={t("footer.emailPlaceholder")}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-[clamp(0.6rem,1.2vw,0.8rem)] text-white outline-none placeholder:text-white/40 sm:w-auto sm:min-w-[140px]"
                />
                <button className="w-full rounded-lg bg-gradient-to-br from-[#d9b25f] to-[#c49a3f] px-4 py-2 text-[clamp(0.55rem,1.2vw,0.7rem)] font-semibold tracking-[0.08em] text-[#1a1a2e] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(217,178,95,0.3)] sm:w-auto">
                  {t("footer.subscribe")}
                </button>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
