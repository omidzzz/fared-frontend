export default function LogoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true">
      <circle cx="24" cy="24" r="22" stroke="#C9A84C" strokeWidth="1" opacity="0.6" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse
          key={i}
          cx="24"
          cy="24"
          rx="7"
          ry="12"
          fill="none"
          stroke="#FECB7D"
          strokeWidth="0.8"
          opacity="0.8"
          transform={`rotate(${angle} 24 24)`}
        />
      ))}
      <circle cx="24" cy="24" r="2.5" fill="#FECB7D" opacity="0.9" />
    </svg>
  )
}
