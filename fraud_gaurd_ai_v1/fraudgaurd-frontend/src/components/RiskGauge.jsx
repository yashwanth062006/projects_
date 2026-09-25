// The signature element: a radar-style radial gauge that reads as a single
// sweeping instrument, reused wherever a risk score needs to be shown.
export default function RiskGauge({ score = 0, size = 96, label }) {
  const radius = (size - 12) / 2
  const circumference = 2 * Math.PI * radius
  const clamped = Math.max(0, Math.min(100, score))
  const offset = circumference - (clamped / 100) * circumference

  const color = clamped >= 70 ? '#E5484D' : clamped >= 35 ? '#F2B84B' : '#3DD68C'

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#24304A"
          strokeWidth="7"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 700ms ease, stroke 300ms ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-lg font-medium" style={{ color }}>
          {Math.round(clamped)}
        </span>
        {label && <span className="text-[9px] uppercase tracking-wider text-text-dim mt-0.5">{label}</span>}
      </div>
    </div>
  )
}
