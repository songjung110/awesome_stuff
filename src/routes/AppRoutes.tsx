import { Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/login/LoginPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
