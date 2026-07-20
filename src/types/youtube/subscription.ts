import type { YouTubeListResponse } from './common'

export interface YouTubeSubscriptionSnippet {
  publishedAt: string
  title: string
  description: string
  resourceId: {
    kind: string
    channelId: string
  }
  channelId: string
}

export interface YouTubeSubscription {
  kind: string
  etag: string
  id: string
  snippet: YouTubeSubscriptionSnippet
}

export type YouTubeSubscriptionListResponse =
  YouTubeListResponse<YouTubeSubscription>
