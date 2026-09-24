const verdictStyle = {
  safe: 'text-safe bg-safe/10 border-safe/25',
  review: 'text-signal bg-signal/10 border-signal/25',
  fraud: 'text-risk bg-risk/10 border-risk/25',
}

export default function TransactionTable({ transactions = [] }) {
  return (
    <div className="panel overflow-hidden">
      <div className="px-5 py-4 border-b border-line">
        <p className="eyebrow mb-1">Recent activity</p>
        <h3 className="font-display text-base font-semibold">Transaction ledger</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-text-dim text-xs uppercase tracking-wide border-b border-line">
              <th className="px-5 py-3 font-medium">ID</th>
              <th className="px-5 py-3 font-medium">Merchant</th>
              <th className="px-5 py-3 font-medium">Location</th>
              <th className="px-5 py-3 font-medium">Amount</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Verdict</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t.id} className="border-b border-line/60 last:border-0 hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3 font-mono text-xs text-text-muted">{t.id}</td>
                <td className="px-5 py-3">{t.merchant}</td>
                <td className="px-5 py-3 text-text-muted">{t.location}</td>
                <td className="px-5 py-3 font-mono">₹{t.amount.toLocaleString('en-IN')}</td>
                <td className="px-5 py-3 font-mono">{t.score}</td>
                <td className="px-5 py-3">
                  <span className={`inline-block rounded-full border px-2.5 py-0.5 text-xs font-medium capitalize ${verdictStyle[t.verdict]}`}>
                    {t.verdict}
                  </span>
                </td>
              </tr>
            ))}
            {transactions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-text-dim text-sm">
                  No transactions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
