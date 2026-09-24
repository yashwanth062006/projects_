import { NavLink } from 'react-router-dom'
import {
  LayoutGrid,
  ShieldAlert,
  ListTree,
  UserCircle,
  Radar,
  FlaskConical
} from 'lucide-react'

const links = [
  { to: '/', label: 'Dashboard', icon: LayoutGrid, end: true },
  { to: '/detect', label: 'Fraud Detection', icon: ShieldAlert },
  { to: '/transactions', label: 'Transactions', icon: ListTree },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-60 shrink-0 flex-col border-r border-line bg-panel/60 px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <Radar className="text-signal" size={22} strokeWidth={2} />
        <span className="font-display font-semibold text-[15px] tracking-tight">
          FraudGuard
        </span>
      </div>

      <nav className="flex flex-col gap-1">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${
                isActive
                  ? 'bg-signal/10 text-signal border border-signal/20'
                  : 'text-text-muted border border-transparent hover:text-text-primary hover:bg-white/[0.03]'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto px-3 py-3 panel !bg-panel2 text-[11px] text-text-dim leading-relaxed">
        <span className="text-safe">●</span> Model live &middot; v0.3-hackathon
      </div>
    </aside>
  )
}