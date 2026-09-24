import RiskGauge from './RiskGauge'

export default function StatCard({ label, value, delta, deltaTone = 'safe', gaugeScore }) {
  const toneClass = deltaTone === 'risk' ? 'text-risk' : deltaTone === 'signal' ? 'text-signal' : 'text-safe'

  return (
    <div className="panel p-5 flex items-center justify-between gap-4">
      <div>
        <p className="eyebrow mb-2">{label}</p>
        <p className="font-mono text-2xl text-text-primary leading-none">{value}</p>
        {delta && <p className={`text-xs mt-2 font-medium ${toneClass}`}>{delta}</p>}
      </div>
      {gaugeScore !== undefined && <RiskGauge score={gaugeScore} size={64} />}
    </div>
  )
}
