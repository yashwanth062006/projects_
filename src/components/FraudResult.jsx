import RiskGauge from './RiskGauge'
import { ShieldCheck, ShieldAlert, ShieldQuestion } from 'lucide-react'

const verdictConfig = {
  safe: { label: 'Safe', Icon: ShieldCheck, tone: 'text-safe', bg: 'bg-safe/10 border-safe/25' },
  review: { label: 'Needs review', Icon: ShieldQuestion, tone: 'text-signal', bg: 'bg-signal/10 border-signal/25' },
  fraud: { label: 'Likely fraud', Icon: ShieldAlert, tone: 'text-risk', bg: 'bg-risk/10 border-risk/25' },
}

export default function FraudResult({ result }) {
  if (!result) {
    return (
      <div className="panel p-6 flex flex-col items-center justify-center text-center h-full min-h-[280px] text-text-dim">
        <ShieldQuestion size={28} className="mb-3 text-text-dim" />
        <p className="text-sm">Run a scan to see the risk verdict here.</p>
      </div>
    )
  }

  const { label, Icon, tone, bg } = verdictConfig[result.verdict]

  return (
    <div className="panel p-6 flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="eyebrow mb-1">Scan result</p>
          <p className="font-mono text-xs text-text-dim">{result.id}</p>
        </div>
        <RiskGauge score={result.score} size={80} label="risk" />
      </div>

      <div className={`flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5 ${bg}`}>
        <Icon size={18} className={tone} />
        <span className={`font-display font-semibold text-sm ${tone}`}>{label}</span>
      </div>

      <div>
        <p className="eyebrow mb-2">Why this score</p>
        <ul className="flex flex-col gap-2">
          {result.reasons.map((reason, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-text-primary/90">
              <span className="mt-1.5 w-1 h-1 rounded-full bg-text-dim shrink-0" />
              {reason}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
