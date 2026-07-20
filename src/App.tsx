import { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import { env } from './config/env'
import { getAccessToken } from './lib/auth/token'
import AppRoutes from './routes/AppRoutes'
import { videoCategoryCache } from './services/youtube/categoryCache'

import './App.scss'

function App() {
  useEffect(() => {

    // if (getAccessToken()) {
      // console.log(videoCategoryCache)
      // videoCategoryCache.load().catch(console.error)
    // }
  }, [])

  return (
    <GoogleOAuthProvider clientId={env.googleClientId}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
