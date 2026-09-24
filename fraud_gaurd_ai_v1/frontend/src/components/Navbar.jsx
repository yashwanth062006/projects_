import { Bell, LogOut } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../services/api'

export default function Navbar({ title, subtitle, user }) {
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="flex items-center justify-between border-b border-line bg-panel/40 px-6 py-4 backdrop-blur-sm">
      <div>
        <h1 className="text-lg font-display font-semibold text-text-primary">{title}</h1>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-risk" />
          <Bell size={18} className="text-text-muted" />
        </div>
        <div className="h-6 w-px bg-line" />
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-signal/15 border border-signal/30 flex items-center justify-center text-signal font-display text-xs font-semibold">
            {(user?.name || 'A')[0].toUpperCase()}
          </div>
          <span className="text-sm text-text-primary hidden sm:inline">{user?.name || 'Analyst'}</span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1.5 text-xs text-text-muted hover:text-risk transition-colors duration-150"
          title="Log out"
        >
          <LogOut size={15} />
        </button>
      </div>
    </header>
  )
}
