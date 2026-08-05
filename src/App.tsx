import { useEffect } from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { BrowserRouter } from 'react-router-dom'
import { env } from './config/env'
import AppRoutes from './routes/AppRoutes'
import { Provider } from 'react-redux'
import { store } from './store'

import './App.scss'

function App() {
  useEffect(() => {}, [])

  return (
    <GoogleOAuthProvider clientId={env.googleClientId}>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </GoogleOAuthProvider>
  )
}

export default App
