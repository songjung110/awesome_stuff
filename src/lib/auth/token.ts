import { GOOGLE_ACCESS_TOKEN_KEY } from '../../constants/auth'

export function getAccessToken(): string | null {
  return localStorage.getItem(GOOGLE_ACCESS_TOKEN_KEY)
}

export function setAccessToken(token: string): void {
  localStorage.setItem(GOOGLE_ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken(): void {
  localStorage.removeItem(GOOGLE_ACCESS_TOKEN_KEY)
}
