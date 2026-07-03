'use client'

import { useState } from 'react'
import { MOCK_TOURS } from '@/lib/mock-data'

/* ─── Icons ─────────────────────────────────────────────────────────────── */

function PersonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  )
}

function EnvelopeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M22 4L12 13 2 4" />
    </svg>
  )
}

function CompassIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  )
}

function CalendarIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function CrystalClusterIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" fill="none" style={{ filter: 'drop-shadow(0 0 6px rgba(126,200,227,0.5)) drop-shadow(0 0 14px rgba(126,200,227,0.25))' }}>
      <polygon points="16 2 20 10 16 18 12 10" fill="rgba(126,200,227,0.14)" stroke="#7EC8E3" strokeWidth="0.8" />
      <polygon points="16 18 24 12 18 24 16 18" fill="rgba(126,200,227,0.10)" stroke="rgba(180,220,240,0.7)" strokeWidth="0.8" />
      <polygon points="16 18 8 12 14 24 16 18" fill="rgba(180,200,255,0.10)" stroke="rgba(160,200,240,0.7)" strokeWidth="0.8" />
      <polygon points="20 10 24 12 18 24" fill="rgba(200,220,255,0.07)" stroke="rgba(180,210,245,0.6)" strokeWidth="0.6" />
      <polygon points="12 10 8 12 14 24" fill="rgba(200,210,255,0.07)" stroke="rgba(170,200,245,0.6)" strokeWidth="0.6" />
      <circle cx="16" cy="12" r="1.5" fill="rgba(255,255,255,0.7)" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

/* ─── Component ────────────────────────────────────────────────────────── */

type TourEnquiryFormProps = {
  compact?: boolean
}

const baseInputClass =
  'w-full bg-white/[0.04] border border-white/[0.10] rounded-xl text-[--text-primary] placeholder:text-[--text-muted] focus:outline-none focus:border-[#7EC8E3]/50 focus:bg-white/[0.07] transition-all duration-200'

export default function TourEnquiryForm({ compact = false }: TourEnquiryFormProps) {
  const [fullName,     setFullName]     = useState('')
  const [email,        setEmail]        = useState('')
  const [selectedTour, setSelectedTour] = useState('')
  const [arrivalDate,  setArrivalDate]  = useState('')
  const [message,      setMessage]      = useState('')

  const handleSubmit = () => {
    if (!fullName.trim() || !email.trim() || !selectedTour || !arrivalDate) {
      setMessage('Please fill in all fields.')
      return
    }
    setMessage("We'll be in touch ✦")
    setFullName('')
    setEmail('')
    setSelectedTour('')
    setArrivalDate('')
  }

  const fieldPad   = compact ? '9px 14px 9px 40px'  : '12px 16px 12px 40px'
  const fieldSize  = compact ? '0.78rem' : '0.875rem'
  const fieldH     = compact ? 36 : 44
  const fieldGap   = compact ? 'gap-2'  : 'gap-3'
  const btnPad     = compact ? 'py-2.5' : 'py-3'
  const iconSize   = compact ? 14 : 16

  const fields = (
    <>
      <div className={`flex flex-col ${fieldGap} ${compact ? 'mb-3' : 'mb-4'}`}>
        {/* Full Name */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(180,200,220,0.6)' }}>
            <PersonIcon size={iconSize} />
          </div>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={baseInputClass}
            style={{ padding: fieldPad, fontSize: fieldSize, minHeight: fieldH }}
          />
        </div>

        {/* Email Address */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(180,200,220,0.6)' }}>
            <EnvelopeIcon size={iconSize} />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={baseInputClass}
            style={{ padding: fieldPad, fontSize: fieldSize, minHeight: fieldH }}
          />
        </div>

        {/* Select Retreat */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(180,200,220,0.6)' }}>
            <CompassIcon size={iconSize} />
          </div>
          <select
            value={selectedTour}
            onChange={(e) => setSelectedTour(e.target.value)}
            className={baseInputClass}
            style={{ padding: fieldPad, fontSize: fieldSize, minHeight: fieldH, appearance: 'none', WebkitAppearance: 'none' }}
          >
            <option value="" disabled>Select Retreat</option>
            {MOCK_TOURS.map((t) => (
              <option key={t.id} value={t.id}>
                {t.titleFA} — {t.locationFA}
              </option>
            ))}
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(180,200,220,0.6)' }}>
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M2 4l4 4 4-4" />
            </svg>
          </div>
        </div>

        {/* Arrival Date — calendar icon on the RIGHT side */}
        <div className="relative">
          <input
            type="date"
            value={arrivalDate}
            onChange={(e) => setArrivalDate(e.target.value)}
            placeholder="Arrival Date"
            className={baseInputClass}
            style={{
              paddingRight: '40px',
              paddingLeft: '14px',
              paddingTop: fieldPad.split(' ')[0],
              paddingBottom: fieldPad.split(' ')[0],
              fontSize: fieldSize,
              minHeight: fieldH,
              colorScheme: 'dark',
            }}
          />
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: 'rgba(180,200,220,0.6)' }}>
            <CalendarIcon size={iconSize} />
          </div>
        </div>
      </div>

      {/* Submit — gold gradient with → arrow */}
      <button
        type="button"
        onClick={handleSubmit}
        className={`w-full font-body font-semibold tracking-widest ${btnPad} px-6 rounded-full uppercase text-sm transition-all duration-300 hover:brightness-110 flex items-center justify-center gap-2`}
        style={{
          minHeight: compact ? 40 : 48,
          background: 'linear-gradient(to right, #C9A84C, #E8C97A)',
          border: '1px solid rgba(201,168,76,0.4)',
          color: '#0A0A1A',
          boxShadow: '0 0 16px rgba(201,168,76,0.25)',
        }}
      >
        REGISTER NOW
        <ArrowRightIcon />
      </button>

      {message && (
        <p
          className="text-xs text-center mt-2"
          style={{
            fontFamily: 'Inter, sans-serif',
            color: message.includes("We'll") ? 'var(--crystal-blue)' : 'var(--text-muted)',
          }}
        >
          {message}
        </p>
      )}

      {/* Disclaimer */}
      <p className="text-center text-[10px] mt-2" style={{ color: 'rgba(180,200,220,0.40)' }}>
        Spaces are limited. Early registration is highly recommended.
      </p>
    </>
  )

  if (compact) {
    return <>{fields}</>
  }

  return (
    <div className="w-full relative backdrop-blur-2xl rounded-2xl p-5"
      style={{
        background: 'rgba(8, 18, 32, 0.88)',
        border: '1px solid rgba(255,255,255,0.10)',
        boxShadow: '0 8px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Crystal Cluster Icon */}
      <div className="flex flex-col items-center text-center mb-3">
        <div className="mb-2">
          <CrystalClusterIcon />
        </div>
        <h3 className="text-xl mb-1" style={{ fontFamily: 'Playfair Display, serif', color: 'var(--text-primary)' }}>
          Join Our Next Journey
        </h3>
        <p className="text-xs leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-secondary)' }}>
          Reserve your spot and begin your transformation.
        </p>
      </div>

      {/* Diamond Divider */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.50))' }} />
        <span className="text-[10px]" style={{ color: 'var(--gold-deep)' }}>◆</span>
        <div className="flex-1 h-px" style={{ background: 'linear-gradient(to left, transparent, rgba(201,168,76,0.50))' }} />
      </div>

      {fields}
    </div>
  )
}
