import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import { env } from './config/env'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <GoogleOAuthProvider clientId={env.googleClientId}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
