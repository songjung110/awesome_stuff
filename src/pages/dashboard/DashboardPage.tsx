import { useEffect, useState } from 'react'
import {
  listSubscriptions,
  listPlaylistItems,
  listPlaylists,
  listMyChannels,
  getLikesPlaylistId,
} from '../../api/youtube'
import FavoriteLineChart from '../../components/dashboard/FavoriteLineChart'
import LikedVideosList from '../../components/dashboard/LikedVideosList'
import SubscriptionList from '../../components/dashboard/SubscriptionList'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSubscriptions, setLikes, setPlaylists } from '../../store/youtubeSlice'

export default function DashboardPage() {
  const subscriptionsJson = useAppSelector((s) => s.youtube.subscriptions)
  const likesJson = useAppSelector((s) => s.youtube.likes)
  const chartFavoriteData = useAppSelector((s) => s.youtube.chartFavoriteData)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const dispatch = useAppDispatch()

  useEffect(() => {
    let mounted = true

    async function loadAll() {
      setLoading(true)
      setError(null)

      try {
        // 구독 목록과 재생목록을 동시에 요청해 초기 데이터를 빠르게 불러온다.
        const [subsResp, playlistsResp] = await Promise.all([
          listSubscriptions(),
          listPlaylists(),
        ])

        if (!mounted) return

        dispatch(setSubscriptions(subsResp))
        dispatch(setPlaylists(playlistsResp))

        // 내 채널 정보를 기준으로 좋아요 재생목록 ID를 찾고, 해당 재생목록의 영상들을 가져온다.
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

  const subscriptionItems = Array.isArray(subscriptionsJson?.items) ? subscriptionsJson.items : []

  return (
    <main className="flex min-h-svh flex-1 px-4 pt-4">
      <section className="w-full">

        {loading && <p className="text-sm text-gray-500">로딩 중...</p>}
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="space-y-6">
          <div className="flex gap-10">
          <section className="w-1/3">
            <h2 className="text-lg text-left font-medium">구독 채널</h2>
            <SubscriptionList items={subscriptionItems} />
          </section>

          <section className="w-2/3">
          
            <section className="mb-6">
              <h3 className="text-base font-medium">좋아요 집계 데이터</h3>

              {chartFavoriteData.length > 0 ? (
                <div className="mt-3 rounded border border-gray-200 bg-white p-4">
                  {/* 날짜별 좋아요 수를 라인 차트로 보여주어 추세를 한눈에 파악할 수 있게 만든다. */}
                  <FavoriteLineChart data={chartFavoriteData} color="#ff0000" />
                </div>
              ) : (
                <p className="mt-3 text-sm text-gray-500">집계된 좋아요 데이터가 없습니다.</p>
              )}

              <pre className="mt-3 max-h-64 overflow-auto rounded border border-gray-200 bg-white p-3 text-sm text-gray-700">
                {JSON.stringify(chartFavoriteData, null, 2)}
              </pre>
            </section>

            <h2 className="text-lg text-left font-medium">가장 최근 좋아요 영상</h2>
            <LikedVideosList items={Array.isArray(likesJson?.items) ? likesJson.items : []} />

          </section>

          </div>
        </div>
      </section>
    </main>
  )
}
