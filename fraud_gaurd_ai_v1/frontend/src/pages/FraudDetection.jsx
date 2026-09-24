import { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import TransactionForm from '../components/TransactionForm'
import FraudResult from '../components/FraudResult'
import { scoreTransaction } from '../services/api'

export default function FraudDetection() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  async function handleScan(txn) {
    setLoading(true)
    setResult(null)
    try {
      const scored = await scoreTransaction(txn)
      setResult(scored)
    } finally {
      setLoading(false)
    }
  }

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
        <Navbar title="Fraud detection" subtitle="Run a single transaction through the live scoring model" />

        <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
          <TransactionForm onSubmit={handleScan} loading={loading} />
          <FraudResult result={result} />
        </main>
      </div>
    </div>
  )
}
