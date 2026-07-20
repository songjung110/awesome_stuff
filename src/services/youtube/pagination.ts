import type { YouTubeListResponse } from '../../types/youtube'

export async function fetchAllPages<TItem>(
  fetchPage: (pageToken?: string) => Promise<YouTubeListResponse<TItem>>,
): Promise<TItem[]> {
  const items: TItem[] = []
  let pageToken: string | undefined

  do {
    const response = await fetchPage(pageToken)
    items.push(...response.items)
    pageToken = response.nextPageToken
  } while (pageToken)

  return items
}
