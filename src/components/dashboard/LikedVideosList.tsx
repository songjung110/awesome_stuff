interface LikedVideoItem {
  id?: string
  snippet?: {
    title?: string
    videoOwnerChannelTitle?: string
    thumbnails?: {
      default?: { url?: string }
      medium?: { url?: string }
      high?: { url?: string }
    }
  }
}

interface LikedVideosListProps {
  items?: LikedVideoItem[]
}

export default function LikedVideosList({ items = [] }: LikedVideosListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">빈 데이터</p>
  }

  return (
    <div className="mt-2 grid gap-3 md:grid-cols-2">
      {items.map((item, index) => {
        // YouTube 응답에서 영상 제목과 썸네일을 카드 형태로 바로 보여주기 위해 필요한 값만 추출한다.
        const title = item?.snippet?.title ?? '제목 없음'
        const thumbnailUrl =
          item?.snippet?.thumbnails?.default?.url ??
          item?.snippet?.thumbnails?.medium?.url ??
          item?.snippet?.thumbnails?.high?.url

        return (
          <div key={item?.id ?? index} className="rounded-lg border border-gray-200 bg-white p-3 shadow-sm">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={title} className="h-24 w-full rounded-md object-cover" />
            ) : (
              <div className="flex h-24 items-center justify-center rounded-md bg-gray-100 text-sm font-medium text-gray-500">
                썸네일 없음
              </div>
            )}
            <a href="#" target="_blank" rel="noopener noreferrer" className="mt-3 line-clamp-2 text-left text-sm font-medium text-gray-800">
              {title}
            </a>
            <div className="mt-1 text-left text-xs text-gray-500">{item?.snippet?.videoOwnerChannelTitle || '알 수 없음'}</div>
          </div>
        )
      })}
    </div>
  )
}
