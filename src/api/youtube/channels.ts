import { youtubeGet } from './client'
import type { YouTubeChannelListResponse } from '../../types/youtube'

export function listMyChannels() {
  return youtubeGet<YouTubeChannelListResponse>('channels', {
    part: 'contentDetails',
    mine: true,
  })
}

export function getLikesPlaylistId(
  response: YouTubeChannelListResponse,
): string | null {
  return response.items[0]?.contentDetails.relatedPlaylists.likes ?? null
}
