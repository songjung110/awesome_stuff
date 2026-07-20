import { getLikesPlaylistId, listMyChannels } from '../../api/youtube/channels'
import { listPlaylistItems } from '../../api/youtube/playlistItems'
import { listSubscriptions } from '../../api/youtube/subscriptions'
import { listCommentThreads } from '../../api/youtube/commentThreads'
import { fetchAllPages } from './pagination'
import { listVideosInBatches } from './videoBatch'
import { videoCategoryCache } from './categoryCache'
import type {
  LikedVideoItem,
  YouTubePlaylistItem,
  YouTubeSubscription,
  YouTubeVideo,
} from '../../types/youtube'

export async function fetchAllSubscriptions(): Promise<YouTubeSubscription[]> {
  return fetchAllPages(
    (pageToken) => listSubscriptions({ pageToken }),
  )
}

export async function fetchLikesPlaylistId(): Promise<string> {
  const response = await listMyChannels()
  const playlistId = getLikesPlaylistId(response)

  if (!playlistId) {
    throw new Error('Likes playlist ID not found in channel contentDetails.')
  }

  return playlistId
}

export async function fetchAllLikedVideos(): Promise<LikedVideoItem[]> {
  const playlistId = await fetchLikesPlaylistId()
  const items = await fetchAllPages<YouTubePlaylistItem>((pageToken) =>
    listPlaylistItems({ playlistId, pageToken }),
  )

  return items.flatMap((item) => {
    const videoId = item.snippet.resourceId.videoId

    if (!videoId) {
      return []
    }

    return [
      {
        videoId,
        likedAt: item.snippet.publishedAt,
      },
    ]
  })
}

export async function fetchLikedVideosWithDetails(): Promise<{
  likedVideos: LikedVideoItem[]
  videos: YouTubeVideo[]
}> {
  const likedVideos = await fetchAllLikedVideos()
  const videoIds = likedVideos.map((item) => item.videoId)
  const videos = await listVideosInBatches(videoIds)

  return { likedVideos, videos }
}

export async function fetchVideoCategories(): Promise<Record<string, string>> {
  return videoCategoryCache.load()
}

export async function fetchCommentThreadsForVideo(
  videoId: string,
  maxResults = 100,
) {
  return fetchAllPages((pageToken) =>
    listCommentThreads({ videoId, pageToken, maxResults }),
  )
}

export { videoCategoryCache }
