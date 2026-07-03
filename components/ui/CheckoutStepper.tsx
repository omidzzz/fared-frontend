'use client'

interface CheckoutStepperProps {
  currentStep: number
}

const STEPS = ['اطلاعات', 'پرداخت', 'تأیید']

export default function CheckoutStepper({ currentStep }: CheckoutStepperProps) {
  return (
    <div className="flex items-center justify-center gap-2 py-4">
      {STEPS.map((label, i) => {
        const stepNum = i + 1
        const isDone = currentStep > stepNum
        const isActive = currentStep === stepNum

        const circleBg = isActive || isDone
          ? 'bg-[var(--gold-accent)] text-[var(--cosmic-dark)]'
          : 'bg-white/[0.06] border border-white/[0.10] text-[var(--text-muted)]'

        const labelColor = isActive || isDone
          ? 'text-[var(--gold-accent)]'
          : 'text-[var(--text-muted)]'

        return (
          <div key={stepNum} className="flex items-center gap-2">
            {/* Step circle + label */}
            <div className="flex flex-col items-center gap-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-farsi ${circleBg}`}>
                {isDone ? '✓' : stepNum}
              </div>
              <span className={`text-xs font-farsi ${labelColor}`}>
                {label}
              </span>
            </div>

            {/* Connector line (not after last step) */}
            {stepNum < 3 && (
              <div
                className="flex-1 h-px"
                style={{
                  width: '48px',
                  maxWidth: '48px',
                  background: isDone ? 'rgba(254,203,125,0.60)' : 'rgba(255,255,255,0.08)',
                }}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
