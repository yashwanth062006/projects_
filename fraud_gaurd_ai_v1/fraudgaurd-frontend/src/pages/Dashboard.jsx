import { useEffect, useState } from 'react'
import { AreaChart, Area, XAxis, ResponsiveContainer, Tooltip } from 'recharts'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import StatCard from '../components/StatCard'
import TransactionTable from '../components/TransactionTable'
import { getStats, getTransactions, getTrend } from '../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState(null)
  const [transactions, setTransactions] = useState([])
  const [trend, setTrend] = useState([])

  useEffect(() => {
    getStats().then(setStats)
    getTransactions().then(setTransactions)
    getTrend().then(setTrend)
  }, [])

  return (
    <div
        className="flex min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
       backgroundImage:
         "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/fraud1.jpg')"
       }}
>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar title="Risk overview" subtitle="Live monitoring across all payment channels" />

        <main className="flex-1 p-6 flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <StatCard
               label="Total Scanned"
                value={stats?.totalScanned?.toLocaleString('en-IN') ?? '—'}
               delta="Live transaction data"
               deltaTone="safe"
            />
            <StatCard
               label="Flagged as fraud"
               value={stats?.flagged ?? '—'}
              delta="Requires action"
              deltaTone="risk"
              gaugeScore={
              stats && (stats.flagged + stats.review) > 0
             ? (stats.flagged / (stats.flagged + stats.review)) * 100
             : 0
             }
            />
            <StatCard label="Pending review" value={stats?.review ?? '—'} delta="Queued for analyst" deltaTone="signal" />
             <StatCard
               label="Blocked amount"
               value={stats ? `₹${stats.blockedAmount.toLocaleString('en-IN')}` : '—'}
               delta="Fraud transactions"
               deltaTone="risk"
             />
            <StatCard label="Avg. response" value={stats ? `${stats.avgResponseMs} ms` : '—'} delta="Model latency" deltaTone="safe" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="panel p-5 lg:col-span-2">
              <p className="eyebrow mb-1">Last 24 hours</p>
              <h3 className="font-display text-base font-semibold mb-4">Scan volume</h3>
              <ResponsiveContainer width="100%" height={180}>
                <AreaChart data={trend}>
                  <defs>
                    <linearGradient id="volFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F2B84B" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#F2B84B" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="h" tick={{ fill: '#5C6684', fontSize: 11 }} axisLine={{ stroke: '#24304A' }} tickLine={false} />
                  <Tooltip
                    contentStyle={{ background: '#121A2B', border: '1px solid #24304A', borderRadius: 8, fontSize: 12 }}
                    labelStyle={{ color: '#8792A8' }}
                  />
                  <Area type="monotone" dataKey="v" stroke="#F2B84B" strokeWidth={2} fill="url(#volFill)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="panel p-5 flex flex-col gap-4">
              <div>
                <p className="eyebrow mb-1">System status</p>
                <h3 className="font-display text-base font-semibold">Detection pipeline</h3>
              </div>
              {[
                ['Transaction stream', 'Connected'],
                ['Scoring model', 'v0.3 · online'],
                ['Rule engine', 'Active'],
                ['Analyst queue', `${stats?.review ?? 0} waiting`],
              ].map(([k, v]) => (
                <div key={k} className="flex items-center justify-between text-sm border-b border-line/60 pb-3 last:border-0 last:pb-0">
                  <span className="text-text-muted">{k}</span>
                  <span className="flex items-center gap-1.5 text-text-primary font-mono text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-safe" /> {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <TransactionTable transactions={transactions} />
        </main>
      </div>
    </div>
  )
}
