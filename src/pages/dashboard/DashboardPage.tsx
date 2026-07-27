import { useEffect, useState } from 'react'
import {
  listSubscriptions,
  listPlaylistItems,
  listPlaylists,
  listMyChannels,
  getLikesPlaylistId,
} from '../../api/youtube'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSubscriptions, setLikes, setPlaylists } from '../../store/youtubeSlice'

export default function DashboardPage() {
  const subscriptionsJson = useAppSelector((s) => s.youtube.subscriptions)
  const likesJson = useAppSelector((s) => s.youtube.likes)
  const playlistsJson = useAppSelector((s) => s.youtube.playlists)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true

    async function loadAll() {
      setLoading(true)
      setError(null)

      try {
        // Fetch subscriptions and playlists in parallel
        const [subsResp, playlistsResp] = await Promise.all([
          listSubscriptions(),
          listPlaylists(),
        ])

        if (!mounted) return

        dispatch(setSubscriptions(subsResp))
        dispatch(setPlaylists(playlistsResp))

        // Determine likes playlist id from channels and fetch playlist items
        const channelsResp = await listMyChannels()
        const likesPlaylistId = getLikesPlaylistId(channelsResp)

        if (likesPlaylistId) {
          const likesResp = await listPlaylistItems({ playlistId: likesPlaylistId })
          if (!mounted) return
          dispatch(setLikes(likesResp))
        } else {
          dispatch(setLikes({ items: [], message: 'Likes playlist not found' }))
        }
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }

    loadAll()

    return () => {
      mounted = false
    }
  }, [])

  return (
    <main className="flex min-h-svh flex-1 px-4 pt-4">
      <section className="w-full">
        <h1 className="text-2xl font-semibold text-gray-900 mb-4">대시보드 — 원시 JSON 출력</h1>

        {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="space-y-6">
          <section>
            <h2 className="text-lg font-medium">구독 채널 목록 (subscriptions.list)</h2>
            <pre className="mt-2 max-h-64 overflow-auto bg-white p-3 border rounded text-sm">
              {subscriptionsJson?.items ? JSON.stringify(subscriptionsJson?.items, null, 2) : '빈 데이터'}
            </pre>
          </section>

          <section>
            <h2 className="text-lg font-medium">좋아요한 영상 목록 (playlistItems.list — 좋아요 재생목록)</h2>
            <pre className="mt-2 max-h-64 overflow-auto bg-white p-3 border rounded text-sm">
              {likesJson?.items.length ? JSON.stringify(likesJson?.items.length, null, 2) : '빈 데이터'}
            </pre>
          </section>

          <section>
            <h2 className="text-lg font-medium">내가 만든 재생목록 (playlists.list)</h2>
            <pre className="mt-2 max-h-64 overflow-auto bg-white p-3 border rounded text-sm">
              {playlistsJson?.items ? JSON.stringify(playlistsJson?.items, null, 2) : '빈 데이터'}
            </pre>
          </section>
        </div>
      </section>
    </main>
  )
}
