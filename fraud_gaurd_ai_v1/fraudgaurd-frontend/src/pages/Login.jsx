import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Radar, Lock } from 'lucide-react'
import { login } from '../services/api'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
     setError(
     err.response?.data?.detail ||
     'Could not sign in. Try again.'
     )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-end pr-40 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle, #F2B84B 1px, transparent 1px)', backgroundSize: '28px 28px' }}
      />

      <div className="relative w-full max-w-sm">
        <div className="flex items-center gap-2 justify-center mb-8">
          <Radar className="text-signal" size={26} />
          <span className="font-display font-semibold text-xl tracking-tight">FraudGuard AI BY YASHWANTH H</span>
        </div>

        <form onSubmit={handleSubmit} className="panel p-7 flex flex-col gap-4">
          <div className="mb-1 text-center">
            <p className="eyebrow mb-1">Analyst console</p>
            <h1 className="font-display text-lg font-semibold">Sign in to monitor</h1>
          </div>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-text-muted">Email</span>
            <input
              className="input-field font-body"
              type="email"
              placeholder="@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="flex flex-col gap-1.5">
            <span className="text-xs text-text-muted">Password</span>
            <input
              className="input-field font-body"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="text-xs text-risk">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary flex items-center justify-center gap-2 mt-2 disabled:opacity-60">
            <Lock size={15} />
            {loading ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="text-[11px] text-text-dim text-center mt-1">
            Enter your email and password to access the analyst console
          </p>
        </form>
      </div>
    </div>
  )
}
