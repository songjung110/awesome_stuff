import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface FavoriteChartPoint {
  date: string
  favoriteCount: number
}

interface LikedItemSnippet {
  publishedAt?: string
  title?: unknown
}

interface LikedItem {
  snippet?: LikedItemSnippet
}

interface LikedResponse {
  items?: LikedItem[]
}

interface YouTubeState {
  subscriptions: any | null
  likes: any | null
  playlists: any | null
  chartFavoriteData: FavoriteChartPoint[]
  favoriteKeywordText: string
}

// 좋아요 응답에서 날짜별로 영상 수를 집계해 차트에 바로 쓸 수 있는 형태로 변환한다.
function buildFavoriteChartData(payload: LikedResponse | null | undefined): FavoriteChartPoint[] {
  const items = Array.isArray(payload?.items) ? payload.items : []
  const groupedByDate = new Map<string, number>()

  items.forEach((item) => {
    const publishedAt = item?.snippet?.publishedAt
    if (!publishedAt) return

    const date = publishedAt.split('T')[0]
    groupedByDate.set(date, (groupedByDate.get(date) ?? 0) + 1)
  })

  return Array.from(groupedByDate.entries())
    .sort(([leftDate], [rightDate]) => leftDate.localeCompare(rightDate))
    .map(([date, favoriteCount]) => ({ date, favoriteCount }))
}

function buildFavoriteKeywordText(payload: LikedResponse | null | undefined): string {
  const items = Array.isArray(payload?.items) ? payload.items : []

  return items
    .map((item) => String(item?.snippet?.title ?? '제목 없음'))
    .join(' ')
}

const initialState: YouTubeState = {
  subscriptions: null,
  likes: null,
  playlists: null,
  chartFavoriteData: [],
  favoriteKeywordText: '',
}

const youtubeSlice = createSlice({
  name: 'youtube',
  initialState,
  reducers: {
    setSubscriptions(state, action: PayloadAction<any>) {
      state.subscriptions = action.payload
    },
    setLikes(state, action: PayloadAction<any>) {
      state.likes = action.payload
      state.chartFavoriteData = buildFavoriteChartData(action.payload)
      state.favoriteKeywordText = buildFavoriteKeywordText(action.payload)
    },
    setPlaylists(state, action: PayloadAction<any>) {
      state.playlists = action.payload
    },
    clearYouTubeState(state) {
      state.subscriptions = null
      state.likes = null
      state.playlists = null
      state.chartFavoriteData = []
      state.favoriteKeywordText = ''
    },
  },
})

export const { setSubscriptions, setLikes, setPlaylists, clearYouTubeState } = youtubeSlice.actions

export default youtubeSlice.reducer
