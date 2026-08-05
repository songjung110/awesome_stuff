interface PlaylistItem {
  id?: string
  snippet?: {
    title?: string
    thumbnails?: {
      default?: { url?: string }
      medium?: { url?: string }
      high?: { url?: string }
    }
  }
}

interface PlaylistsListProps {
  items?: PlaylistItem[]
}

export default function PlaylistsList({ items = [] }: PlaylistsListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">빈 데이터</p>
  }

  return (
    <div className="mt-2 grid gap-3 md:grid-cols-2">
      {items.map((item, index) => {
        // 재생목록 정보를 카드 형태로 정리해 한눈에 파악할 수 있도록 제목과 썸네일만 노출한다.
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
            <p className="mt-3 text-sm font-medium text-gray-800">{title}</p>
          </div>
        )
      })}
    </div>
  )
}
