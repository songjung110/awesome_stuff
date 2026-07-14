const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID

if (!googleClientId) {
  console.warn(
    'VITE_GOOGLE_CLIENT_ID is not set. Add it to your .env file to enable Google OAuth.',
  )
}

export const env = {
  googleClientId: googleClientId ?? '',
} as const

console.log('clientId:', JSON.stringify(env.googleClientId));