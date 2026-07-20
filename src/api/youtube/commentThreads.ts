import { youtubeGet } from './client'
import type { YouTubeCommentThreadListResponse } from '../../types/youtube'

interface ListCommentThreadsParams {
  videoId: string
  pageToken?: string
  maxResults?: number
  order?: 'relevance' | 'time'
}

export function listCommentThreads({
  videoId,
  pageToken,
  maxResults = 100,
  order = 'relevance',
}: ListCommentThreadsParams) {
  return youtubeGet<YouTubeCommentThreadListResponse>('commentThreads', {
    part: 'snippet',
    videoId,
    order,
    maxResults,
    pageToken,
  })
}

export function extractCommentTexts(
  response: YouTubeCommentThreadListResponse,
): string[] {
  return response.items.map(
    (thread) => thread.snippet.topLevelComment.snippet.textDisplay,
  )
}
