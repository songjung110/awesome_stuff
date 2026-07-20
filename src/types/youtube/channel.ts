import type { YouTubeListResponse } from './common'

export interface YouTubeChannelContentDetails {
  relatedPlaylists: {
    likes?: string
    favorites?: string
    uploads?: string
    watchHistory?: string
    watchLater?: string
  }
}

export interface YouTubeChannel {
  kind: string
  etag: string
  id: string
  contentDetails: YouTubeChannelContentDetails
}

export type YouTubeChannelListResponse = YouTubeListResponse<YouTubeChannel>
