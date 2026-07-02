"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useTranslations } from "next-intl";
import { useLocale } from "@/hooks/useLocale";
import type { CatalogProduct } from "@/lib/api";

interface CourseCardProps {
  course: CatalogProduct;
}

const LEVEL_COLORS: Record<
  string,
  { bg: string; text: string; border: string }
> = {
  BEGINNER: {
    bg: "rgba(74, 222, 128, 0.15)",
    text: "#4ade80",
    border: "#4ade80",
  },
  INTERMEDIATE: {
    bg: "rgba(251, 191, 36, 0.15)",
    text: "#fbbf24",
    border: "#fbbf24",
  },
  ADVANCED: {
    bg: "rgba(248, 113, 113, 0.15)",
    text: "#f87171",
    border: "#f87171",
  },
};

const GOLD = "#f5d87a";

export default function CourseCard({ course }: CourseCardProps) {
  const { addItem } = useCart();
  const t = useTranslations("courses");
  const { isRTL } = useLocale();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: course.id,
      productType: "course",
      name: course.nameFA,
      nameFA: course.nameFA,
      price: course.price,
      currency: "IRT",
      quantity: 1,
      image: course.heroImage || course.image || "",
    });
  };

  const lc = LEVEL_COLORS[course.level ?? ''] ?? LEVEL_COLORS.BEGINNER;

  if (!course) return null

  return (
    <Link href={`/product/${course.id}`} className="block group h-full">
      <div
        className="course-card relative flex flex-col rounded-3xl overflow-hidden cursor-pointer h-full transition-all duration-500"
        style={{
          background:
            "linear-gradient(145deg, rgba(35, 12, 72, 0.85), rgba(15, 6, 38, 0.95))",
          border: "1.5px solid rgba(245, 216, 122, 0.25)",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.5)",
          direction: isRTL ? "rtl" : "ltr",
        }}
      >
        {/* Image Container */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <Image
            src={course.heroImage || course.image || "/images/placeholder.webp"}
            alt={course.nameFA || "Course image"}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-all duration-700 group-hover:scale-110"
          />

          {/* Mystical Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />

          {/* Top Decorative Glow */}
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/10 to-transparent opacity-60" />

          {/* Instructor Badge */}
          <div
            className="absolute top-4 left-4 z-20 px-3 py-1 rounded-2xl text-[10px] md:text-xs font-medium backdrop-blur-md"
            style={{
              background: "rgba(15, 6, 38, 0.85)",
              color: GOLD,
              border: "1px solid rgba(245, 216, 122, 0.3)",
            }}
          >
            {course.instructor?.nameFA || "Instructor"}
          </div>

          {/* Level Badge */}
          <div
            className="absolute top-4 right-4 z-20 px-3 py-1 rounded-2xl text-[10px] md:text-xs font-medium backdrop-blur-md"
            style={{
              background: lc.bg,
              color: lc.text,
              border: `1px solid ${lc.border}60`,
            }}
          >
            {course.level}
          </div>

          {/* Lotus Accent */}
          <div className="absolute bottom-4 right-4 z-20 opacity-70 hidden sm:block">
            <svg width="28" height="28" viewBox="0 0 60 60" fill="none">
              <circle
                cx="30"
                cy="30"
                r="12"
                stroke={GOLD}
                strokeWidth="1.5"
                opacity="0.6"
              />
              <circle cx="30" cy="30" r="6" fill={GOLD} opacity="0.4" />
            </svg>
          </div>
        </div>

        {/* Card Body */}
        <div className="flex-1 p-4 sm:p-5 flex flex-col">
          <h3 className="font-display text-base sm:text-lg leading-tight text-white mb-3 line-clamp-2">
            {course.nameFA}
          </h3>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {(course.tags || []).slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 text-[9px] sm:text-[10px] rounded-full font-light tracking-wider"
                style={{
                  background: "rgba(245, 216, 122, 0.1)",
                  color: "#f5d87a",
                  border: "1px solid rgba(245, 216, 122, 0.2)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="mt-auto text-[10px] sm:text-xs text-white/70 flex items-center gap-3">
            <span>⏱ {course.duration}</span>
            <span>📖 {course.lessons ?? 0} {t("lessons", { count: course.lessons ?? 0 })}</span>
          </div>

          {/* Price & Action */}
          <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10">
            <div>
              <span className="text-xl sm:text-2xl font-display text-[#f5d87a]">
                {course.isFree ? t("free") : `${course.price.toLocaleString('fa-IR')} تومان`}
              </span>
            </div>

            {/* SVG Icon Button */}
            <button
              onClick={handleAdd}
              className="w-11 h-11 flex items-center justify-center rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95"
              style={{
                background: "linear-gradient(90deg, #f5d87a, #e8c050)",
                color: "#1a1328",
                boxShadow: "0 4px 15px rgba(245, 216, 122, 0.45)",
              }}
              aria-label={t("addToCart")}
            >
              <svg
                height="24"
                width="24"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 512 512"
                xmlSpace="preserve"
                fill="rgba(35, 12, 72, 0.85)"
              >
                <g>
                  <path d="M482.752,435.574c-6.928-8.1-23.127-40.492-23.127-40.492s2.676-3.448,0-15.051 c-3.48-15.035-18.514-13.886-21.978-17.349c-3.479-3.472-33.549-58.424-35.863-64.792c-2.314-6.369-27.772-78.662-27.772-78.662 c-8.549-37.604-24.308-53.221-45.121-57.85c-20.64-4.581-31.817-3.471-41.075-11.571c-5.778-5.054-5.573-8.809-5.573-24.056 c0,0,6.235-5.927,10.784-14.122c5.195-9.375,7.746-22.907,7.746-22.907c5.211-2.086,5.274-4.684,7.525-12.965 c3.118-11.461,2.897-19.317-5.431-19.317C304.836,19.066,286.085,0,256,0c-30.07,0-48.821,19.066-46.853,56.441 c-8.328,0-8.564,7.856-5.432,19.317c2.251,8.281,2.314,10.879,7.51,12.965c0,0,2.55,13.532,7.762,22.907 c4.55,8.194,10.784,14.122,10.784,14.122c0,15.247,0.189,19.002-5.589,24.056c-9.242,8.1-20.435,6.99-41.059,11.571 c-20.828,4.628-36.572,20.246-45.12,57.85c0,0-25.457,72.294-27.771,78.662c-2.314,6.368-32.401,61.32-35.864,64.792 c-3.464,3.463-18.514,2.314-21.978,17.349c-2.676,11.603,0,15.051,0,15.051s-16.2,32.392-23.143,40.492 c-6.942,8.092,5.794,13.878,13.886,3.464c0.944,1.409,4.156,2.424,7.793,2.912c-28.228,31.251-12.138,71.964,31.55,69.98 C118.291,510.3,256,485.316,256,485.316S393.707,510.3,429.54,511.93c43.688,1.984,59.778-38.729,31.534-69.98 c3.652-0.488,6.864-1.503,7.808-2.912C476.974,449.452,489.695,443.666,482.752,435.574z M183.123,383.849 c0,0-59.274,17.626-96.192,34.234c7.604-14.154,16.357-33.423,16.357-33.423l37.029-53.212l29.504-64.218 c0,0,9.257,34.714,12.138,39.917C184.855,312.35,183.123,383.849,183.123,383.849z M328.891,383.849c0,0-1.732-71.498,1.149-76.702 c2.897-5.203,12.154-39.917,12.154-39.917l29.504,64.218l37.013,53.212c0,0,8.769,19.27,16.373,33.423 C388.165,401.474,328.891,383.849,328.891,383.849z" />
                </g>
              </svg>
            </button>
          </div>
        </div>

        {/* Hover Glow */}
        <div
          className="absolute inset-0 pointer-events-none rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            boxShadow:
              "inset 0 0 80px rgba(245, 216, 122, 0.25), 0 0 60px rgba(160, 80, 255, 0.3)",
          }}
        />
      </div>
    </Link>
  );
}