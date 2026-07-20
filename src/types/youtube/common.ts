export interface YouTubePageInfo {
  totalResults: number
  resultsPerPage: number
}

export interface YouTubeListResponse<T> {
  kind: string
  etag: string
  nextPageToken?: string
  prevPageToken?: string
  pageInfo: YouTubePageInfo
  items: T[]
}

export interface YouTubeThumbnail {
  url: string
  width: number
  height: number
}

export interface YouTubeThumbnails {
  default?: YouTubeThumbnail
  medium?: YouTubeThumbnail
  high?: YouTubeThumbnail
}

export interface YouTubeResourceId {
  kind: string
  videoId?: string
  channelId?: string
  playlistId?: string
}
