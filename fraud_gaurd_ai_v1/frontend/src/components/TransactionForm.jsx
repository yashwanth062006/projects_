import { useState } from 'react'
import { ScanLine } from 'lucide-react'

const initial = {
  amount: '',
  merchant: '',
  location: '',
  hour: new Date().getHours(),
  newDevice: false,
  velocity: 1,
  merchantRisk: 'standard',
}

export default function TransactionForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initial)

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!form.amount || !form.merchant) return
    onSubmit(form)
  }

  return (
    <form onSubmit={handleSubmit} className="panel p-6 flex flex-col gap-4">
      <div>
        <p className="eyebrow mb-1">New scan</p>
        <h3 className="font-display text-base font-semibold">Score a transaction</h3>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1.5 col-span-1">
          <span className="text-xs text-text-muted">Amount (₹)</span>
          <input
            className="input-field"
            type="number"
            min="0"
            placeholder="4500"
            value={form.amount}
            onChange={(e) => update('amount', e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1.5 col-span-1">
          <span className="text-xs text-text-muted">Merchant</span>
          <input
            className="input-field"
            type="text"
            placeholder="Kestrel Electronics"
            value={form.merchant}
            onChange={(e) => update('merchant', e.target.value)}
            required
          />
        </label>

        <label className="flex flex-col gap-1.5 col-span-2">
          <span className="text-xs text-text-muted">Location signal</span>
          <input
            className="input-field"
            type="text"
            placeholder="Bengaluru, IN or Unknown / VPN"
            value={form.location}
            onChange={(e) => update('location', e.target.value)}
          />
        </label>

        <label className="flex flex-col gap-1.5 col-span-1">
          <span className="text-xs text-text-muted">Hour of day (0–23)</span>
          <input
            className="input-field"
            type="number"
            min="0"
            max="23"
            value={form.hour}
            onChange={(e) => update('hour', Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1.5 col-span-1">
          <span className="text-xs text-text-muted">Txns in last hour</span>
          <input
            className="input-field"
            type="number"
            min="1"
            value={form.velocity}
            onChange={(e) => update('velocity', Number(e.target.value))}
          />
        </label>

        <label className="flex flex-col gap-1.5 col-span-1">
          <span className="text-xs text-text-muted">Merchant risk tier</span>
          <select
            className="input-field font-body"
            value={form.merchantRisk}
            onChange={(e) => update('merchantRisk', e.target.value)}
          >
            <option value="standard">Standard</option>
            <option value="high">High-risk category</option>
          </select>
        </label>

        <label className="flex items-center gap-2 col-span-1 mt-5">
          <input
            type="checkbox"
            checked={form.newDevice}
            onChange={(e) => update('newDevice', e.target.checked)}
            className="accent-signal w-4 h-4"
          />
          <span className="text-xs text-text-muted">New / unrecognized device</span>
        </label>
      </div>

      <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
        <ScanLine size={16} />
        {loading ? 'Scanning…' : 'Run fraud scan'}
      </button>
    </form>
  )
}
