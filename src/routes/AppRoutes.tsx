import { Navigate, Route, Routes } from 'react-router-dom'
import DashboardPage from '../pages/dashboard/DashboardPage'
import LoginPage from '../pages/login/LoginPage'
import { getAccessToken } from '../lib/auth/token'
import Layout from '../components/layout/Layout'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = getAccessToken()

  return token ? <>{children}</> : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <DashboardPage />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
