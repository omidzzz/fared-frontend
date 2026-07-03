"use client";

export function HeroShimmer() {
  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: -1 }}
    >
      <div
        className="shimmer absolute inset-0 w-[200%] h-full"  
        style={{
          background: `
            linear-gradient(
              105deg,
              transparent 20%,
              rgba(255,255,255,0.14) 42%,
              rgba(235,245,255,0.36) 50%,
              rgba(255,230,245,0.26) 58%,
              transparent 80%
            )
          `,
          filter: "blur(1px)",
          opacity: 0.58,
        }}
      />

      <style jsx global>{`
        @keyframes shimmerSweep {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer {
          animation: shimmerSweep 5.8s linear infinite;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .shimmer {
            animation-duration: 4.2s !important;
            filter: blur(0.7px) !important;
            opacity: 0.48 !important;
          }
        }

        @media (max-width: 480px) {
          .shimmer {
            animation-duration: 3.7s !important;
          }
        }
      `}</style>
    </div>
  );
}