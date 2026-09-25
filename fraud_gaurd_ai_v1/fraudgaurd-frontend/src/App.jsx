import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import FraudDetection from './pages/FraudDetection'
import Transactions from './pages/Transactions'
import Profile from './pages/Profile'

function RequireAuth({ children }) {
  const token = localStorage.getItem('fg_token')
  return token ? children : <Navigate to="/login" replace />
}

export default function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dashboard />
          </RequireAuth>
        }
      />

      {/* Fraud Detection */}
      <Route
        path="/detect"
        element={
          <RequireAuth>
            <FraudDetection />
          </RequireAuth>
        }
      />

      {/* Transactions */}
      <Route
        path="/transactions"
        element={
          <RequireAuth>
            <Transactions />
          </RequireAuth>
        }
      />

      {/* Profile */}
      <Route
        path="/profile"
        element={
          <RequireAuth>
            <Profile />
          </RequireAuth>
        }
      />

      {/* Unknown URL → Dashboard */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
  )
}