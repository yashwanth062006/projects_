import { useEffect, useMemo, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TransactionTable from '../components/TransactionTable'
import { getTransactions } from '../services/api'
import { Search } from 'lucide-react'

const filters = ['all', 'safe', 'review', 'fraud']

export default function Transactions() {
  const [transactions, setTransactions] = useState([])
  const [filter, setFilter] = useState('all')
  const [query, setQuery] = useState('')

  useEffect(() => {
    getTransactions().then(setTransactions)
  }, [])

  const filtered = useMemo(() => {
    return transactions
      .filter((t) => filter === 'all' || t.verdict === filter)
      .filter((t) => t.merchant.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()))
  }, [transactions, filter, query])

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
        <Navbar title="Transactions" subtitle="Full ledger of scored activity" />

        <main className="flex-1 p-6 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize border transition-colors duration-150 ${
                    filter === f
                      ? 'bg-signal/10 border-signal/30 text-signal'
                      : 'border-line text-text-muted hover:text-text-primary'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
              <input
                className="input-field font-body pl-9"
                placeholder="Search by merchant or ID"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <TransactionTable transactions={filtered} />
        </main>
      </div>
    </div>
  )
}
