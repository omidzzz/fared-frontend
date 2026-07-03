'use client'

import { ReactNode } from 'react'
import Link from 'next/link'

interface CTAButtonV2Props {
  children: ReactNode
  href?: string
  onClick?: () => void
  size?: 'small' | 'default' | 'large' | 'fullWidth'
}

const sizeMap: Record<string, number | string> = {
  small: 220,
  default: 320,
  large: 380,
  fullWidth: '100%',
}

export default function CTAButtonV2({ children, href, onClick, size = 'default' }: CTAButtonV2Props) {
  const content = (
    <div style={{
      position: 'relative',
      width: sizeMap[size],
      maxWidth: size === 'fullWidth' ? '460px' : undefined,
      height: '64px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    }}>
      <img
        src="/images/ui/cta-frame-v2.svg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'fill',
        }}
      />
      <span style={{
        position: 'relative',
        zIndex: 1,
        color: '#d4af64',
        fontSize: '0.85rem',
        fontWeight: 600,
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        {children}
      </span>
    </div>
  )

  if (href) {
    return <Link href={href} style={{ textDecoration: 'none', display: 'inline-block' }}>{content}</Link>
  }
  return <div onClick={onClick}>{content}</div>
}
