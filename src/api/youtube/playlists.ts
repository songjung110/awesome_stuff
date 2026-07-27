import { youtubeGet } from './client'
import { YOUTUBE_MAX_RESULTS } from '../../constants/youtube'
import type { YouTubePlaylistListResponse } from '../../types/youtube'

interface ListPlaylistsParams {
  pageToken?: string
  maxResults?: number
}

export function listPlaylists({ pageToken, maxResults = YOUTUBE_MAX_RESULTS }: ListPlaylistsParams = {}) {
  return youtubeGet<YouTubePlaylistListResponse>('playlists', {
    part: 'snippet,contentDetails',
    mine: true,
    maxResults,
    pageToken,
  })
}
