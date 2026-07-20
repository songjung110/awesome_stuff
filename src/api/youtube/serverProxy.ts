const createProxyError = async (response: Response) => {
  const body = await response.json().catch(() => null)
  throw new Error(
    typeof body === 'object' && body !== null && 'error' in body
      ? (body as { error: string }).error
      : `YouTube proxy request failed with status ${response.status}`,
  )
}

export async function fetchYouTubeVideoCategories(regionCode = 'KR') {
  const url = `/api/youtube/videoCategories?regionCode=${encodeURIComponent(regionCode)}`
  const response = await fetch(url)

  if (!response.ok) {
    await createProxyError(response)
  }

  return response.json()
}

export async function validateYouTubeApiKey(regionCode = 'KR') {
  const url = `/api/youtube/validateKey?regionCode=${encodeURIComponent(regionCode)}`
  const response = await fetch(url)

  if (!response.ok) {
    await createProxyError(response)
  }

  return response.json()
}
