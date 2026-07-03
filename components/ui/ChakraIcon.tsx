import React from 'react'
import type { ChakraKey } from '@/types/product'

interface ChakraIconProps {
  chakra: ChakraKey
  size?: 'sm' | 'md' | 'lg'
  animated?: boolean
}

const sizeMap = { sm: 32, md: 48, lg: 64 }

const chakraColors: Record<ChakraKey, string> = {
  root:   '#C0392B',
  sacral: '#E67E22',
  solar:  '#F1C40F',
  heart:  '#27AE60',
  throat: '#2980B9',
  third:  '#8E44AD',
  crown:  '#9B59B6',
}

/* Compute points on a circle */
function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = (angleDeg - 90) * (Math.PI / 180)
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

function pts(...coords: { x: number; y: number }[]) {
  return coords.map((c) => `${c.x.toFixed(2)},${c.y.toFixed(2)}`).join(' ')
}

const cx = 12
const cy = 12

function RootIcon() {
  return (
    <>
      <rect x={4} y={4} width={16} height={16} strokeLinejoin="round" fill="none" stroke="currentColor" strokeWidth={1.4} />
      <polygon points={pts({ x: cx, y: 17 }, { x: 7, y: 10 }, { x: 17, y: 10 })} fill="currentColor" opacity={0.7} />
    </>
  )
}

function SacralIcon() {
  return (
    <>
      <circle cx={cx} cy={cy} r={8} fill="none" stroke="currentColor" strokeWidth={1.4} />
      <path
        d="M12,4 A8,8 0 0,0 12,20 A5,5 0 0,1 12,4 Z"
        fill="currentColor"
        opacity={0.65}
      />
    </>
  )
}

function SolarIcon() {
  const inner = 4.5
  const outer = 8.5
  const rays = Array.from({ length: 10 }, (_, i) => {
    const a = i * 36
    const p1 = polar(cx, cy, inner, a)
    const p2 = polar(cx, cy, outer, a)
    return `M${p1.x.toFixed(2)},${p1.y.toFixed(2)} L${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
  }).join(' ')
  return (
    <>
      <circle cx={cx} cy={cy} r={4} fill="currentColor" />
      <path d={rays} stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />
    </>
  )
}

function HeartIcon() {
  const tri = (up: boolean) => {
    const top = polar(cx, cy, 8.5, up ? 0 : 180)
    const bl = polar(cx, cy, 8.5, up ? 120 : 300)
    const br = polar(cx, cy, 8.5, up ? 240 : 60)
    return pts(top, bl, br)
  }
  return (
    <>
      <polygon points={tri(true)} fill="none" stroke="currentColor" strokeWidth={1.4} />
      <polygon points={tri(false)} fill="none" stroke="currentColor" strokeWidth={1.4} />
    </>
  )
}

function ThroatIcon() {
  const tri = [polar(cx, cy, 7.5, 0), polar(cx, cy, 7.5, 120), polar(cx, cy, 7.5, 240)]
  return (
    <>
      <circle cx={cx} cy={cy} r={9} fill="none" stroke="currentColor" strokeWidth={1.4} />
      <polygon points={pts(...tri)} fill="none" stroke="currentColor" strokeWidth={1.4} />
    </>
  )
}

function ThirdIcon() {
  const tip = polar(cx, cy, 9.5, 0)
  const bl = polar(cx, cy, 9.5, 120)
  const br = polar(cx, cy, 9.5, 240)
  return (
    <>
      <polygon points={pts(tip, bl, br)} fill="none" stroke="currentColor" strokeWidth={1.4} />
      {/* Eye */}
      <ellipse cx={cx} cy={cy + 2} rx={3} ry={1.8} fill="none" stroke="currentColor" strokeWidth={1} />
      <circle cx={cx} cy={cy + 2} r={1} fill="currentColor" />
    </>
  )
}

function CrownIcon() {
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = i * 30
    const inner = polar(cx, cy, 4, a)
    const outer = polar(cx, cy, 9.5, a)
    const ctrl = polar(cx, cy, 8, a - 15)
    return `M${inner.x.toFixed(2)},${inner.y.toFixed(2)} Q${ctrl.x.toFixed(2)},${ctrl.y.toFixed(2)} ${outer.x.toFixed(2)},${outer.y.toFixed(2)}`
  }).join(' ')
  return (
    <>
      <path d={petals} stroke="currentColor" strokeWidth={1} fill="none" strokeLinecap="round" />
      <circle cx={cx} cy={cy} r={3.5} fill="currentColor" opacity={0.6} />
    </>
  )
}

const ICONS: Record<ChakraKey, () => React.ReactElement> = {
  root:      RootIcon,
  sacral:    SacralIcon,
  solar:     SolarIcon,
  heart:     HeartIcon,
  throat:    ThroatIcon,
  third:     ThirdIcon,
  crown:     CrownIcon,
}

export default function ChakraIcon({ chakra, size = 'md', animated }: ChakraIconProps) {
  const px = sizeMap[size]
  const Icon = ICONS[chakra]

  return (
    <svg
      viewBox="0 0 24 24"
      width={px}
      height={px}
      className={animated ? 'animate-glow-pulse' : ''}
      style={{ color: chakraColors[chakra] }}
      aria-label={`${chakra} chakra`}
    >
      <Icon />
    </svg>
  )
}
