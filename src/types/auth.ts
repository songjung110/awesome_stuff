export interface GoogleAuthTokenResponse {
  access_token: string
  expires_in: number
  token_type: string
  scope: string
  authuser?: string
  prompt?: string
}
