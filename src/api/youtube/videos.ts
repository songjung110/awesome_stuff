import { youtubeGet } from './client'
import { YOUTUBE_MAX_RESULTS } from '../../constants/youtube'
import type { YouTubeVideoListResponse } from '../../types/youtube'

interface ListVideosParams {
  ids: string[]
}

export function listVideos({ ids }: ListVideosParams) {
  if (ids.length === 0) {
    return Promise.resolve({
      kind: 'youtube#videoListResponse',
      etag: '',
      pageInfo: { totalResults: 0, resultsPerPage: 0 },
      items: [],
    } satisfies YouTubeVideoListResponse)
  }

  if (ids.length > YOUTUBE_MAX_RESULTS) {
    throw new Error(
      `videos.list supports up to ${YOUTUBE_MAX_RESULTS} IDs per request.`,
    )
  }

  return youtubeGet<YouTubeVideoListResponse>('videos', {
    part: 'snippet,statistics',
    id: ids.join(','),
  })
}
