import type { YouTubeListResponse } from './common'

export interface YouTubeCommentSnippet {
  videoId: string
  textDisplay: string
  textOriginal: string
  authorDisplayName: string
  authorChannelId?: {
    value: string
  }
  likeCount: number
  publishedAt: string
  updatedAt: string
}

export interface YouTubeComment {
  kind: string
  etag: string
  id: string
  snippet: YouTubeCommentSnippet
}

export interface YouTubeCommentThreadSnippet {
  channelId?: string
  videoId: string
  topLevelComment: YouTubeComment
  totalReplyCount: number
}

export interface YouTubeCommentThread {
  kind: string
  etag: string
  id: string
  snippet: YouTubeCommentThreadSnippet
}

export type YouTubeCommentThreadListResponse =
  YouTubeListResponse<YouTubeCommentThread>
