'use client'

const benefits = [
  {
    title: 'Free Worldwide Shipping',
    sub: 'On orders over $120',
    svg: (
      <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.3" width={38} height={38}>
        <circle cx="19" cy="19" r="13"/>
        <path d="M6 19h26M19 6c4 4 4 22 0 26M19 6c-4 4-4 22 0 26" opacity=".7"/>
      </svg>
    ),
  },
  {
    title: '30-Day Easy Returns',
    sub: '& Exchanges',
    svg: (
      <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.3" width={38} height={38}>
        <path d="M11 14a10 10 0 1 1-2 6" strokeLinecap="round"/>
        <path d="M11 7v7h7" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    title: 'Secure Payments',
    sub: '& Checkout',
    svg: (
      <svg viewBox="0 0 38 38" fill="none" stroke="currentColor" strokeWidth="1.3" width={38} height={38}>
        <path d="M19 5l11 4v8c0 7-5 12-11 14-6-2-11-7-11-14V9l11-4Z"/>
        <path d="m14 18 3.5 3.5L25 14" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

const Divider = () => (
  <svg viewBox="0 0 30 30" fill="none" stroke="currentColor" strokeWidth="1.1" width={30} height={30} style={{ color: 'var(--avad-gold)', opacity: 0.6 }}>
    <path d="M15 4v22M4 15h22" opacity=".5"/>
    <path d="M15 9c-1.5 3-1.5 5 0 8 1.5-3 1.5-5 0-8Z" fill="currentColor" stroke="none" fillOpacity=".5"/>
  </svg>
)

export default function ShopBenefits() {
  return (
    <div style={{ width: '100%' }}>
      {/* ── Top decorative gold wave border (fill + stroke matching product cards) ── */}
      <div
        className="pointer-events-none overflow-hidden"
        style={{
          width: '100%',
          height: 'clamp(16px, 4vw, 70px)',
          lineHeight: 0,
          filter:
            "drop-shadow(0 0 8px rgba(212,175,100,0.3)) drop-shadow(0 0 24px rgba(212,175,100,0.1))",
        }}
        aria-hidden="true"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1363.3 154.3"
          preserveAspectRatio="none"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <linearGradient id="waveFill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3dca0" stopOpacity="0.25" />
              <stop offset="30%" stopColor="#d4af64" stopOpacity="0.35" />
              <stop offset="70%" stopColor="#d4af64" stopOpacity="0.30" />
              <stop offset="100%" stopColor="#b88f44" stopOpacity="0.20" />
            </linearGradient>
            <linearGradient id="waveStroke" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f3dca0" stopOpacity="0.95" />
              <stop offset="30%" stopColor="#d4af64" stopOpacity="0.8" />
              <stop offset="70%" stopColor="#d4af64" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#b88f44" stopOpacity="0.95" />
            </linearGradient>
          </defs>
          <path
            fill="url(#waveFill)"
            stroke="url(#waveStroke)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M1362.5,151.3c-81.6-39.3-166.7-73-254.5-95.7s-94.4-21.3-142.5-24.1c-23.8-1.4-47.8-2.3-71.6.5s-27.1,2.8-40.6,5-25.9,4.6-39.3,2c-13.4-2.6-26.3-8.7-39.4-12.6s-29.8-8.5-44.9-12.1-19.1-4-28.9-4.3-7.6.9-8.9.3-1.7-1.8-2.3-2.4c-2.3-2.4-4.6-4.9-6.8-7.3s-1.2-.5-1.8-.2c-4,2.2-6.4,8.9-10.4,9.8s-9.4,0-13.7.4-8.2.9-12.2,1.6c-25.2,4.6-50.7,12.2-74.9,20.6s-24.9,8.6-38.9,7.7c-12-.8-23.8-3.7-35.7-5.1-26.7-3.2-52.7-5.3-79.5-4.3-88.5,3.2-175.2,25.8-258.4,55.2C103.9,105,51.7,127,.8,151.5c-1.7.8-.2,3.4,1.5,2.6,82.6-39.8,169-73.9,258-96.5,46.9-11.9,95-21,143.4-23.2,25.6-1.2,50.5-.8,75.9,2.1s27.9,3.6,41.8,5.7c11,1.7,22.1,1.8,32.9-1.1,11.9-3.2,23.3-8.1,35.1-11.6,13-3.9,26.2-7.4,39.3-10.8s20.2-4.8,30.5-5.4,10,1.2,13.4-.2,3.2-3.1,4.4-4.4l3.5-3.8c.4-.4,2.7-2.3,1.1-2.1s0,.5.7,1.5c1.2,1.7,2.9,3.2,4.4,4.7s2.4,3.3,3.9,3.9c3.5,1.3,9.6,0,13.4.2,23.6,1.4,47.4,9.5,69.9,16.2,12.1,3.6,23.9,8.8,36.1,11.9,10.8,2.7,21.9,2.5,32.8.7,26.8-4.3,54-8.5,81.2-8.6,48.1-.2,95.7,5.9,142.7,15.8,88.2,18.6,174,50.2,256.1,87.2,12.8,5.8,25.5,11.7,38.2,17.8,1.7.8,3.3-1.8,1.5-2.6h0Z"
          />
        </svg>
      </div>

      {/* ── Benefits strip (responsive) ── */}
      <div
        className="relative z-[14]"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(12px, 3vw, 40px)',
          padding: 'clamp(20px, 4vh, 50px) clamp(16px, 5vw, 40px)',
          flexWrap: 'wrap',
        }}
      >
        {benefits.map((b, i) => (
          <span key={b.title} style={{ display: 'contents' }}>
            <div
              className="max-lg:justify-center lg:justify-start"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(10px, 2vw, 15px)',
                direction: 'ltr',
                textAlign: 'left',
              }}
            >
              <div
                style={{
                  width: 'clamp(28px, 6vw, 38px)',
                  height: 'clamp(28px, 6vw, 38px)',
                  color: 'var(--avad-gold)',
                  filter: 'drop-shadow(0 0 6px rgba(216,179,106,0.5))',
                  flexShrink: 0,
                }}
              >
                {b.svg}
              </div>
              <div className="max-lg:text-center lg:text-left">
                <div
                  style={{
                    fontFamily: 'var(--avad-sans)',
                    fontWeight: 500,
                    fontSize: 'clamp(11px, 2.5vw, 13px)',
                    letterSpacing: '.12em',
                    color: 'var(--avad-cream)',
                    textTransform: 'uppercase',
                    overflowWrap: 'break-word',
                    wordBreak: 'break-word',
                  }}
                >
                  {b.title}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--avad-sans)',
                    fontWeight: 300,
                    fontSize: 'clamp(10px, 2vw, 11px)',
                    letterSpacing: '.1em',
                    color: 'var(--avad-gold)',
                    textTransform: 'uppercase',
                    marginTop: 3,
                  }}
                >
                  {b.sub}
                </div>
              </div>
            </div>
            {i < benefits.length - 1 && (
              <div className="hidden sm:block">
                <Divider />
              </div>
            )}
          </span>
        ))}
      </div>
    </div>
  )
}
