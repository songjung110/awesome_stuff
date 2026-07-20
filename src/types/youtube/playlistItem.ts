import type { YouTubeListResponse, YouTubeResourceId } from './common'

export interface YouTubePlaylistItemSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  resourceId: YouTubeResourceId
}

export interface YouTubePlaylistItem {
  kind: string
  etag: string
  id: string
  snippet: YouTubePlaylistItemSnippet
}

export type YouTubePlaylistItemListResponse =
  YouTubeListResponse<YouTubePlaylistItem>

export interface LikedVideoItem {
  videoId: string
  likedAt: string
}
