import { chunk } from '../../lib/array/chunk'
import { YOUTUBE_MAX_RESULTS } from '../../constants/youtube'
import { listVideos } from '../../api/youtube/videos'
import type { YouTubeVideo } from '../../types/youtube'

export async function listVideosInBatches(videoIds: string[]): Promise<YouTubeVideo[]> {
  const batches = chunk(videoIds, YOUTUBE_MAX_RESULTS)
  const videos: YouTubeVideo[] = []

  for (const ids of batches) {
    const response = await listVideos({ ids })
    videos.push(...response.items)
  }

  return videos
}
