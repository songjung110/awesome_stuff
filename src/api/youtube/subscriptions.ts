import { youtubeGet } from './client'
import { YOUTUBE_MAX_RESULTS } from '../../constants/youtube'
import type { YouTubeSubscriptionListResponse } from '../../types/youtube'

interface ListSubscriptionsParams {
  pageToken?: string
  maxResults?: number
}

export function listSubscriptions({
  pageToken,
  maxResults = YOUTUBE_MAX_RESULTS,
}: ListSubscriptionsParams = {}) {
  return youtubeGet<YouTubeSubscriptionListResponse>('subscriptions', {
    part: 'snippet',
    mine: true,
    maxResults,
    pageToken,
  })
}
