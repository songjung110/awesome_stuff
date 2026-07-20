import type { YouTubeListResponse, YouTubeThumbnails } from './common'

export interface YouTubeVideoSnippet {
  publishedAt: string
  channelId: string
  title: string
  description: string
  thumbnails: YouTubeThumbnails
  categoryId: string
}

export interface YouTubeVideoStatistics {
  viewCount?: string
  likeCount?: string
  commentCount?: string
}

export interface YouTubeVideo {
  kind: string
  etag: string
  id: string
  snippet: YouTubeVideoSnippet
  statistics?: YouTubeVideoStatistics
}

export type YouTubeVideoListResponse = YouTubeListResponse<YouTubeVideo>
