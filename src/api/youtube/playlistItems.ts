import { youtubeGet } from './client'
import { YOUTUBE_MAX_RESULTS } from '../../constants/youtube'
import type {
  LikedVideoItem,
  YouTubePlaylistItemListResponse,
} from '../../types/youtube'

interface ListPlaylistItemsParams {
  playlistId: string
  pageToken?: string
  maxResults?: number
}

export function listPlaylistItems({
  playlistId,
  pageToken,
  maxResults = YOUTUBE_MAX_RESULTS,
}: ListPlaylistItemsParams) {
  return youtubeGet<YouTubePlaylistItemListResponse>('playlistItems', {
    part: 'snippet',
    playlistId,
    maxResults,
    pageToken,
  })
}

export function mapPlaylistItemsToLikedVideos(
  response: YouTubePlaylistItemListResponse,
): LikedVideoItem[] {
  return response.items.flatMap((item) => {
    const videoId = item.snippet.resourceId.videoId

    if (!videoId) {
      return []
    }

    return [
      {
        videoId,
        likedAt: item.snippet.publishedAt,
      },
    ]
  })
}
