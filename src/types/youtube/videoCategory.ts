import type { YouTubeListResponse } from './common'

export interface YouTubeVideoCategorySnippet {
  channelId: string
  title: string
  assignable: boolean
}

export interface YouTubeVideoCategory {
  kind: string
  etag: string
  id: string
  snippet: YouTubeVideoCategorySnippet
}

export type YouTubeVideoCategoryListResponse =
  YouTubeListResponse<YouTubeVideoCategory>
