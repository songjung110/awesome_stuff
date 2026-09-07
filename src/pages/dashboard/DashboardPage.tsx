import { useEffect, useRef, useState } from 'react'
import {
  listSubscriptions,
  listPlaylistItems,
  listPlaylists,
  listMyChannels,
  getLikesPlaylistId,
} from '../../api/youtube'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import FavoriteLineChart from '../../components/dashboard/FavoriteLineChart'
import FavoriteWordCloud from '../../components/dashboard/FavoriteWordCloud'
import LikedVideosList from '../../components/dashboard/LikedVideosList'
import SubscriptionList from '../../components/dashboard/SubscriptionList'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { setSubscriptions, setLikes, setPlaylists } from '../../store/youtubeSlice'

export default function DashboardPage() {
  const subscriptionsJson = useAppSelector((s) => s.youtube.subscriptions)
  const likesJson = useAppSelector((s) => s.youtube.likes)
  const chartFavoriteData = useAppSelector((s) => s.youtube.chartFavoriteData)
  const favoriteKeywordText = useAppSelector((s) => s.youtube.favoriteKeywordText)
  const [error, setError] = useState<string | null>(null)
  const [loadingSubscriptions, setLoadingSubscriptions] = useState(false)
  const [loadingLikes, setLoadingLikes] = useState(false)
  const [loadingChart, setLoadingChart] = useState(false)
  const [likesPlaylistId, setLikesPlaylistId] = useState('')
  const [pageToken, setPageToken] = useState<string | undefined>(undefined)
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined)
  const likesJsonRef = useRef(likesJson)
  const dispatch = useAppDispatch()

  useEffect(() => {
    likesJsonRef.current = likesJson
  }, [likesJson])

  useEffect(() => {
    let mounted = true

    async function loadAll() {
      setError(null)
      setLoadingSubscriptions(true)

      try {
        const [subsResp, playlistsResp] = await Promise.all([
          listSubscriptions(),
          listPlaylists(),
        ])

        if (!mounted) return

        dispatch(setSubscriptions(subsResp))
        dispatch(setPlaylists(playlistsResp))

        const channelsResp = await listMyChannels()
        const nextLikesPlaylistId = getLikesPlaylistId(channelsResp)

        if (!mounted) return

        setLikesPlaylistId(nextLikesPlaylistId ?? '')
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        if (mounted) {
          setLoadingSubscriptions(false)
        }
      }
    }

    loadAll()

    return () => {
      mounted = false
    }
  }, [dispatch])

  useEffect(() => {
    const playlistId = likesPlaylistId

    if (!playlistId) {
      dispatch(setLikes({ items: [], message: 'Likes playlist not found' }))
      setPageToken(undefined)
      setNextPageToken(undefined)
      return
    }

    let mounted = true

    async function loadFavoriteData() {
      setLoadingLikes(true)
      setLoadingChart(true)
      setError(null)

      try {
        const likesResp = await listPlaylistItems({
          playlistId,
          pageToken,
          maxResults: 50,
        })

        if (!mounted) return

        const loadedItems = Array.isArray(likesResp?.items) ? likesResp.items : []
        const previousItems = pageToken
          ? (Array.isArray(likesJsonRef.current?.items) ? likesJsonRef.current.items : [])
          : []
        const mergedItems = pageToken ? [...previousItems, ...loadedItems] : loadedItems

        dispatch(setLikes({ ...likesResp, items: mergedItems }))
        setNextPageToken(likesResp.nextPageToken)
      } catch (err) {
        console.error(err)
        setError(err instanceof Error ? err.message : String(err))
      } finally {
        if (mounted) {
          setLoadingLikes(false)
          setLoadingChart(false)
        }
      }
    }

    loadFavoriteData()

    return () => {
      mounted = false
    }
  }, [dispatch, likesPlaylistId, pageToken])

  const handleLoadPreviousLikes = () => {
    if (!likesPlaylistId || !nextPageToken || loadingLikes) {
      return
    }

    setPageToken(nextPageToken)
  }

  const subscriptionItems = Array.isArray(subscriptionsJson?.items) ? subscriptionsJson.items : []
  const likesItems = Array.isArray(likesJson?.items) ? likesJson.items : []

  return (
    <main className="flex min-h-svh flex-1 px-4 pt-4">
      <section className="w-full">
        {error && (
          <p className="text-sm text-red-600" role="alert">
            {error}
          </p>
        )}

        <div className="space-y-6">
          <div className="flex gap-10">
            <section className="w-1/3">
            <h2 className="text-lg text-left font-medium">가장 최근 좋아요 영상</h2>
              {loadingLikes ? (
                <div className="mt-3 rounded border border-gray-200 bg-white p-4">
                  <LoadingSpinner label="좋아요 영상 로딩 중" size="md" />
                </div>
              ) : (
                <LikedVideosList items={likesItems} />
              )}
              {/* <h2 className="text-lg text-left font-medium">구독 채널</h2>
              {loadingSubscriptions ? (
                <div className="mt-3 rounded border border-gray-200 bg-white p-4">
                  <LoadingSpinner label="구독 채널 로딩 중" size="md" />
                </div>
              ) : (
                <SubscriptionList items={subscriptionItems} />
              )} */}
            </section>

            <section className="w-2/3">
              <section className="mb-6">
                <h3 className="text-base font-medium">좋아요 집계 데이터</h3>

                {loadingChart ? (
                  <div className="mt-3 rounded border border-gray-200 bg-white p-4">
                    <LoadingSpinner label="좋아요 집계 데이터 로딩 중" size="md" />
                  </div>
                ) : chartFavoriteData.length > 0 ? (
                  <div className="mt-3 rounded border border-gray-200 bg-white p-4">
                    <FavoriteLineChart data={chartFavoriteData} color="#ff0000" />
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">집계된 좋아요 데이터가 없습니다.</p>
                )}
              </section>

              <section className="mb-6">
                <h3 className="text-base font-medium">최근 좋아요 트렌드 키워드</h3>
                {loadingChart ? (
                  <div className="mt-3 rounded border border-gray-200 bg-white p-4">
                    <LoadingSpinner label="좋아요 트렌드 키워드 로딩 중" size="md" />
                  </div>
                ) : favoriteKeywordText ? (
                  <div className="mt-3 rounded border border-gray-200 bg-white p-4">
                    <FavoriteWordCloud text={favoriteKeywordText} />
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-gray-500">집계된 좋아요 키워드가 없습니다.</p>
                )}
              </section>

              <div className="mb-3 flex items-center justify-between gap-3">
                <h2 className="text-lg text-left font-medium">가장 최근 좋아요 영상</h2>
                {nextPageToken && (
                  <button
                    type="button"
                    onClick={handleLoadPreviousLikes}
                    disabled={loadingLikes}
                    className="rounded border border-blue-500 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loadingLikes ? '로딩 중...' : '이전 50개 데이터 호출'}
                  </button>
                )}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}
