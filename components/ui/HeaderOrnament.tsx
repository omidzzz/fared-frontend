export default function HeaderOrnament() {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-visible"
      style={{ height: '18px', transform: 'translateY(50%)' }}
    >
      <svg
        viewBox="0 0 1440 18"
        preserveAspectRatio="none"
        className="w-full"
        height="18"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Left arm: straight line from left edge, curves up near center */}
        <path
          d="M 0 1 L 580 1 Q 640 1 660 6 Q 695 14 720 14"
          stroke="url(#goldGrad)"
          strokeWidth="1"
          fill="none"
          opacity="0.85"
        />
        {/* Right arm: mirror */}
        <path
          d="M 1440 1 L 860 1 Q 800 1 780 6 Q 745 14 720 14"
          stroke="url(#goldGrad)"
          strokeWidth="1"
          fill="none"
          opacity="0.85"
        />
        {/* Gradient definition */}
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FECB7D" stopOpacity="0" />
            <stop offset="25%" stopColor="#FECB7D" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FECB7D" stopOpacity="1" />
            <stop offset="75%" stopColor="#FECB7D" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FECB7D" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* Central lotus — sits at exact center bottom */}
      <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer petals */}
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(0 11 11) translate(0 -3.5)" />
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(45 11 11) translate(0 -3.5)" />
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(90 11 11) translate(0 -3.5)" />
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(135 11 11) translate(0 -3.5)" />
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(180 11 11) translate(0 -3.5)" />
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(225 11 11) translate(0 -3.5)" />
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(270 11 11) translate(0 -3.5)" />
          <ellipse cx="11" cy="11" rx="1.8" ry="4.5" fill="#FECB7D" opacity="0.9" transform="rotate(315 11 11) translate(0 -3.5)" />
          {/* Center dot */}
          <circle cx="11" cy="11" r="2.5" fill="#FECB7D" />
        </svg>
      </div>
    </div>
  )
}
