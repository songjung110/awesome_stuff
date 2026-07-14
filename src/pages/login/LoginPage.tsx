import { useState } from 'react'
import GoogleLoginButton from '../../components/auth/GoogleLoginButton'
import type { GoogleAuthTokenResponse } from '../../types/auth'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  const handleSuccess = (response: GoogleAuthTokenResponse) => {
    setError(null)
    localStorage.setItem('google_access_token', response.access_token)
  }

  const handleError = () => {
    setError('Google 로그인에 실패했습니다. 다시 시도해 주세요.')
  }

  return (
    <main className="flex min-h-svh flex-1 flex-col items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">로그인</h1>
          <p className="text-sm text-gray-500">
            계속하려면 Google 계정으로 로그인하세요.
          </p>
        </div>

        <div className="flex justify-center">
          <GoogleLoginButton onSuccess={handleSuccess} onError={handleError} />
        </div>

        {error && (
          <p className="text-center text-sm text-red-600" role="alert">
            {error}
          </p>
        )}
      </div>
    </main>
  )
}
