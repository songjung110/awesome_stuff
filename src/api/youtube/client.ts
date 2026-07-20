import { httpGet } from '../httpClient'
import { YOUTUBE_API_BASE_URL } from '../../constants/youtube'
import { getAccessToken } from '../../lib/auth/token'

type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>

export function youtubeGet<T>(endpoint: string, params: QueryParams): Promise<T> {
  const accessToken = getAccessToken()

  if (!accessToken) {
    throw new Error('Access token not found. Please log in first.')
  }

  return httpGet<T>(`${YOUTUBE_API_BASE_URL}/${endpoint}`, params, accessToken)
}
