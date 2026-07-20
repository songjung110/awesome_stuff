import { fetchYouTubeVideoCategories } from './serverProxy'
import { YOUTUBE_DEFAULT_REGION } from '../../constants/youtube'
import type { YouTubeVideoCategoryListResponse } from '../../types/youtube'

interface ListVideoCategoriesParams {
  regionCode?: string
}

export function listVideoCategories({
  regionCode = YOUTUBE_DEFAULT_REGION,
}: ListVideoCategoriesParams = {}) {
  return fetchYouTubeVideoCategories(regionCode) as Promise<YouTubeVideoCategoryListResponse>
}

export function mapCategoriesToRecord(
  response: YouTubeVideoCategoryListResponse,
): Record<string, string> {
  return Object.fromEntries(
    response.items.map((category) => [category.id, category.snippet.title]),
  )
}
