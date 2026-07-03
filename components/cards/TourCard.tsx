'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Tour } from '@/lib/mock-data'

type TourCardProps = {
  tour: Tour
}

export default function TourCard({ tour }: TourCardProps) {
  return (
    <Link href={`/shop/tours/${tour.slug}`} className="block">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          className="backdrop-blur-md bg-white/[0.03] border border-white/[0.08] hover:border-chakra-heart/80 rounded-xl overflow-hidden transition-all duration-300 group cursor-pointer"
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow =
            '0 0 30px rgba(var(--chakra-heart-rgb),0.2), 0 4px 24px rgba(0,0,0,0.3)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-white/[0.04]">
          <Image
            src={tour.image}
            alt={tour.titleFA}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
          {/* Bottom fade overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070714]/60 to-transparent pointer-events-none" />
          {/* Destination badge — top left */}
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5">
            <span
              className="text-[10px] text-cosmic-gold font-body font-semibold tracking-widest uppercase"
              style={{ color: 'var(--gold-accent)' }}
            >
              ✦ {tour.titleFA}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col gap-2">
          {/* Title */}
          <h3
            className="text-base italic leading-tight"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              color: 'var(--text-primary)',
            }}
          >
            {tour.titleFA}
          </h3>

          {/* Date range */}
          <div className="flex items-center gap-1.5">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              style={{ color: 'var(--text-muted)' }}
            >
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span
              className="text-xs"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}
            >
              {tour.durationFA}
            </span>
          </div>

          {/* Price + spots */}
          <div className="flex items-baseline gap-2">
            <span
              className="text-lg"
              style={{
                fontFamily: 'Playfair Display, serif',
                color: 'var(--gold-accent)',
              }}
            >
              ${tour.price.toLocaleString()}
            </span>
            <span
              className="text-xs"
              style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-muted)' }}
            >
              &middot; {tour.groupSizeFA}
            </span>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm transition-all duration-200 mt-1 min-h-[44px]"
            style={{
              border: '1px solid var(--chakra-heart)',
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(var(--chakra-heart-rgb),0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
            }}
          >
            View Journey
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </button>
        </div>
        </div>
      </motion.div>
    </Link>
  )
}
