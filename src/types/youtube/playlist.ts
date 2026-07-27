import type { YouTubeListResponse } from './common'

export interface YouTubePlaylist {
  kind: string
  etag: string
  id: string
  snippet: {
    title: string
    description: string
    channelId: string
    publishedAt: string
  }
  contentDetails?: {
    itemCount?: number
  }
}

export type YouTubePlaylistListResponse = YouTubeListResponse<YouTubePlaylist>
