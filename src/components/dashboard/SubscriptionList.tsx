interface SubscriptionItem {
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

interface SubscriptionListProps {
  items?: SubscriptionItem[]
}

export default function SubscriptionList({ items = [] }: SubscriptionListProps) {
  if (items.length === 0) {
    return <p className="text-sm text-gray-500">빈 데이터</p>
  }

  return (
    <div className="mt-2 space-y-2">
      {items.map((item, index) => {
        // YouTube 응답의 중첩된 snippet 구조를 평탄화해 제목과 썸네일만 바로 보여주도록 처리한다.
        const title = item?.snippet?.title ?? '제목 없음'
        const thumbnailUrl =
          item?.snippet?.thumbnails?.default?.url ??
          item?.snippet?.thumbnails?.medium?.url ??
          item?.snippet?.thumbnails?.high?.url

        return (
          <div key={item?.id ?? index} className="flex items-center gap-3 rounded border bg-white p-3">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={title} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-medium text-gray-600">
                {title.charAt(0)}
              </div>
            )}
            <span className="text-sm text-gray-800">{title}</span>
          </div>
        )
      })}
    </div>
  )
}
