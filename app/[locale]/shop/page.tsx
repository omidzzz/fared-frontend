"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import { useProducts } from "@/hooks/useProducts";
import CategoryBackground from "@/components/backgrounds/CategoryBackground";
import ChakraIcon from "@/components/ui/ChakraIcon";
import { CATEGORY_CONFIG } from "@/types/category";

const categories = Object.values(CATEGORY_CONFIG);

export default function ShopPage() {
  const t = useTranslations("shop");
  const { isRTL } = useLocale();
  const { data, isLoading, error } = useProducts({ limit: 6 });

  return (
    <CategoryBackground category="home">
      <div
        className="min-h-screen px-4 pb-20 pt-28 relative overflow-hidden"
        dir={isRTL ? "rtl" : "ltr"}
      >
        {/* Subtle animated cosmic background layer */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_0.6px,transparent_1px)] bg-[length:4px_4px] opacity-10 pointer-events-none" />

        <motion.div
          className="text-center mb-16 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1
            className="font-display text-4xl sm:text-5xl mb-4 tracking-tight"
            style={{
              background:
                "linear-gradient(90deg, #FECB7D, #E0B3FF, #C8A2FF, #FECB7D)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 25px rgba(254,203,125,0.6))",
            }}
          >
            {t("allCollections")}
          </h1>
          <p
            className="text-[#D8C7C4] max-w-lg mx-auto text-lg leading-relaxed"
            style={{
              textAlign: isRTL ? "right" : "left",
            }}
          >
            {t("allCollectionsSubtitle")}
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.handle}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
            >
              <Link href={`/shop/${cat.handle}`} className="group block">
                <div
                  className="relative rounded-3xl overflow-hidden p-8 flex flex-col items-center text-center gap-6 transition-all duration-500 group-hover:scale-[1.03]"
                  style={{
                    background: "rgba(20, 10, 35, 0.65)",
                    backdropFilter: "blur(16px)",
                    border: `1px solid rgba(255,255,255,0.08)`,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
                    direction: isRTL ? "rtl" : "ltr",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${cat.color}80`;
                    e.currentTarget.style.boxShadow = `0 0 50px rgba(${cat.colorRgb},0.35), inset 0 0 40px rgba(${cat.colorRgb},0.1)`;
                    e.currentTarget.style.background = "rgba(30, 15, 50, 0.85)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor =
                      "rgba(255,255,255,0.08)";
                    e.currentTarget.style.boxShadow =
                      "0 10px 30px rgba(0,0,0,0.3)";
                    e.currentTarget.style.background = "rgba(20, 10, 35, 0.65)";
                  }}
                >
                  {/* Glow ring */}
                  <div
                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-700"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, rgba(${cat.colorRgb},0.25) 0%, transparent 70%)`,
                    }}
                  />

                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center relative z-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110"
                    style={{
                      background: `rgba(${cat.colorRgb},0.15)`,
                      boxShadow: `0 0 40px rgba(${cat.colorRgb},0.4), inset 0 0 25px rgba(255,255,255,0.1)`,
                    }}
                  >
                    <ChakraIcon chakra={cat.chakra} size="lg" />
                  </div>

                  <div className="space-y-2 relative z-10">
                    <h2
                      className="font-display text-2xl text-[#F0EBE3] group-hover:text-[#FECB7D] transition-all duration-300"
                      style={{
                        textShadow: `0 0 15px rgba(${cat.colorRgb},0.5)`,
                      }}
                    >
                      {isRTL ? cat.labelFa : cat.label}
                    </h2>
                    <p
                      className="text-sm text-[#C8B8B5] group-hover:text-[#D8C7C4] transition-colors"
                      dir={isRTL ? "rtl" : "ltr"}
                    >
                      {isRTL ? cat.label : cat.labelFa}
                    </p>
                  </div>

                  {/* Bottom shine effect */}
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-60" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="relative z-10 mt-16 max-w-5xl mx-auto rounded-3xl border border-white/10 bg-black/20 p-6 backdrop-blur-xl">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-[#FECB7D]">Live catalog</p>
              <h3 className="text-2xl font-display text-[#F0EBE3]">Products from the backend</h3>
            </div>
            <div className="text-sm text-[#C8B8B5]">
              {isLoading ? "Loading…" : error ? "Backend unavailable, showing fallback" : `${data?.products?.length ?? 0} items`}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {(data?.products ?? []).slice(0, 6).map((product) => (
              <div key={product.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm text-[#FECB7D]">{product.category ?? "catalog"}</p>
                <h4 className="mt-2 text-lg font-semibold text-[#F0EBE3]">
                  {isRTL ? product.nameFA : product.name}
                </h4>
                <p className="mt-2 text-sm text-[#C8B8B5] line-clamp-2">
                  {isRTL ? product.descriptionFA : product.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-[#FECB7D]">
                  {product.price.toLocaleString("fa-IR")} تومان
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating decorative elements */}
        <div
          className="absolute top-1/3 text-4xl opacity-10 pointer-events-none animate-[float_18s_ease-in-out_infinite]"
          style={{
            left: isRTL ? "auto" : "2rem",
            right: isRTL ? "2rem" : "auto",
          }}
        >
          ✧
        </div>
        <div
          className="absolute bottom-1/3 text-5xl opacity-10 pointer-events-none animate-[float_22s_ease-in-out_infinite_2s]"
          style={{
            right: isRTL ? "auto" : "3rem",
            left: isRTL ? "3rem" : "auto",
          }}
        >
          ⟡
        </div>
      </div>

      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-25px) rotate(8deg);
          }
        }
      `}</style>
    </CategoryBackground>
  );
}
