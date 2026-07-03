'use client'

import Image from 'next/image'
import Link from 'next/link'
import type { Mentor } from '@/lib/mock-data'

interface MentorCardProps {
  mentor: Mentor
}

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.floor(rating)
  const stars = []
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push('★')
    else stars.push('☆')
  }
  return (
    <div className="flex items-center gap-1">
      <span className="text-sm" style={{ color: 'var(--gold-accent)' }}>{stars.join('')}</span>
      <span className="text-[10px] text-[--text-muted]">({count})</span>
    </div>
  )
}

export default function MentorCard({ mentor }: MentorCardProps) {
  return (
    <Link href={`/product/${mentor.id}`} className="block">
      <div
        className="group relative flex flex-col items-center rounded-2xl p-5 cursor-pointer transition-all duration-300 text-center"
        style={{
          backdropFilter: 'blur(12px)',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(155,89,182,0.50)'
          e.currentTarget.style.transform = 'translateY(-4px)'
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(155,89,182,0.18)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {/* Circular Avatar */}
        <div
          className="relative w-24 h-24 rounded-full overflow-hidden mb-3 flex-shrink-0"
          style={{
            border: '2px solid var(--chakra-crown)',
            boxShadow: '0 0 12px rgba(155,89,182,0.40)',
          }}
        >
          <Image
            src={mentor.image}
            alt={mentor.name}
            fill
            sizes="96px"
            className="object-cover"
            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
          />
        </div>

        {/* Name */}
        <h3 className="font-display text-base text-[--text-primary] leading-tight mb-1">
          {mentor.name}
        </h3>

        {/* Title */}
        <p
          className="text-xs mb-2 leading-snug"
          style={{ color: 'var(--gold-accent)', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}
        >
          {mentor.title}
        </p>

        {/* Rating */}
        <div className="mb-3">
          <StarRating rating={mentor.rating} count={mentor.reviewCount} />
        </div>

        {/* Specialty pills */}
        <div className="flex flex-wrap justify-center gap-1 mb-3">
          {mentor.specialties.slice(0, 3).map((s) => (
            <span
              key={s}
              className="px-2 py-0.5 rounded-full text-[10px] font-body"
              style={{ background: 'rgba(155,89,182,0.15)', color: 'var(--chakra-crown)' }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Session info */}
        <p className="text-xs text-[--text-secondary] font-body mb-3">
          {mentor.sessionDuration} · ${mentor.sessionPrice}
        </p>

        {/* Book button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="w-full px-4 py-2.5 rounded-xl text-sm font-body transition-all duration-200 min-h-[44px]"
          style={{ border: '1px solid rgba(155,89,182,0.50)', color: 'var(--chakra-crown)' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(155,89,182,0.20)' }}
          onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
        >
          Book Session →
        </button>
      </div>
    </Link>
  )
}
