import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface YouTubeState {
  subscriptions: any | null
  likes: any | null
  playlists: any | null
}

const initialState: YouTubeState = {
  subscriptions: null,
  likes: null,
  playlists: null,
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
    },
    setPlaylists(state, action: PayloadAction<any>) {
      state.playlists = action.payload
    },
    clearYouTubeState(state) {
      state.subscriptions = null
      state.likes = null
      state.playlists = null
    },
  },
})

export const { setSubscriptions, setLikes, setPlaylists, clearYouTubeState } = youtubeSlice.actions

export default youtubeSlice.reducer
