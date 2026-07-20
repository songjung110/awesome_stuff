export class ApiError extends Error {
  readonly status: number
  readonly body: unknown

  constructor(status: number, body: unknown) {
    const message =
      typeof body === 'object' &&
      body !== null &&
      'error' in body &&
      typeof (body as { error?: { message?: string } }).error?.message ===
        'string'
        ? (body as { error: { message: string } }).error.message
        : `API request failed with status ${status}`

    super(message)
    this.name = 'ApiError'
    this.status = status
    this.body = body
  }
}

type QueryParams = Record<
  string,
  string | number | boolean | undefined | null
>

export async function httpGet<T>(
  url: string,
  params?: QueryParams,
  accessToken?: string,
): Promise<T> {
  const searchParams = new URLSearchParams()

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== null) {
        searchParams.set(key, String(value))
      }
    }
  }

  const query = searchParams.toString()
  const requestUrl = query ? `${url}?${query}` : url

  const headers: HeadersInit = {
    Accept: 'application/json',
  }

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`
  }

  const response = await fetch(requestUrl, { headers })

  if (!response.ok) {
    const body = await response.json().catch(() => null)
    throw new ApiError(response.status, body)
  }

  return response.json() as Promise<T>
}
