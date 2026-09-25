import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import { ShieldCheck, Mail, User, Lock, Activity, LogOut } from 'lucide-react'
import { logout } from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('fg_user') || '{}')

  const name = user.name || 'User'
  const email = user.email || 'No email'

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div
      className="flex min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/fraud1.jpg')",
      }}
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar
          title="Profile"
          subtitle="Your account and security information"
        />

        <main className="flex-1 p-6 max-w-2xl flex flex-col gap-6">

          {/* Profile Header */}
          <div className="panel p-6 flex items-center gap-5">
            
            <div className="w-16 h-16 rounded-full bg-signal/15 border border-signal/30 flex items-center justify-center text-signal font-display text-2xl font-semibold">
              {name.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <p className="font-display text-lg font-semibold">
                {name}
              </p>

              <p className="text-sm text-text-muted">
                {email}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <span className="w-2 h-2 rounded-full bg-safe" />
                <span className="text-xs text-safe">
                  Account Active
                </span>
              </div>
            </div>

          </div>


          {/* Account Details */}
          <div className="panel p-6 flex flex-col gap-5">

            <p className="eyebrow">
              Account details
            </p>

            {/* Name */}
            <div className="flex items-center gap-3 border-b border-line/60 pb-4">
              <User size={17} className="text-text-dim" />

              <div>
                <p className="text-text-muted text-xs">
                  Name
                </p>

                <p className="text-sm">
                  {name}
                </p>
              </div>
            </div>


            {/* Email */}
            <div className="flex items-center gap-3 border-b border-line/60 pb-4">
              <Mail size={17} className="text-text-dim" />

              <div>
                <p className="text-text-muted text-xs">
                  Email
                </p>

                <p className="font-mono text-sm">
                  {email}
                </p>
              </div>
            </div>


            {/* Account Type */}
            <div className="flex items-center gap-3 border-b border-line/60 pb-4">
              <ShieldCheck size={17} className="text-text-dim" />

              <div>
                <p className="text-text-muted text-xs">
                  Account type
                </p>

                <p className="text-sm">
                  FraudGuard User
                </p>
              </div>
            </div>


            {/* Authentication */}
            <div className="flex items-center gap-3">
              <Lock size={17} className="text-text-dim" />

              <div>
                <p className="text-text-muted text-xs">
                  Authentication
                </p>

                <p className="text-sm">
                  JWT authentication enabled
                </p>
              </div>
            </div>

          </div>


          {/* Security Status */}
          <div className="panel p-6">

            <div className="flex items-center gap-3 mb-4">
              <Activity size={18} className="text-safe" />

              <div>
                <p className="font-display text-sm font-semibold">
                  Security status
                </p>

                <p className="text-xs text-text-muted">
                  Your account is protected
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div className="bg-panel2 rounded-lg p-4">
                <p className="text-xs text-text-muted">
                  Authentication
                </p>

                <p className="text-sm text-safe mt-1">
                  Active
                </p>
              </div>

              <div className="bg-panel2 rounded-lg p-4">
                <p className="text-xs text-text-muted">
                  Session
                </p>

                <p className="text-sm text-safe mt-1">
                  Secured
                </p>
              </div>

            </div>

          </div>


          {/* Logout */}
          <button
            onClick={handleLogout}
            className="btn-ghost self-start flex items-center gap-2 text-sm"
          >
            <LogOut size={16} />
            Logout
          </button>

        </main>
      </div>
    </div>
  )
}