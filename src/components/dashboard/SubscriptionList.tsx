import './SubscriptionList.scss'

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
    <div className="c-channel-list">
      {items.map((item, index) => {
        // YouTube 응답의 중첩된 snippet 구조를 평탄화해 제목과 썸네일만 바로 보여주도록 처리한다.
        const title = item?.snippet?.title ?? '제목 없음'
        const channelUrl = item?.id ? `https://www.youtube.com/channel/${item?.snippet?.resourceId?.channelId}` : '#'
        const thumbnailUrl =
          item?.snippet?.thumbnails?.default?.url ??
          item?.snippet?.thumbnails?.medium?.url ??
          item?.snippet?.thumbnails?.high?.url

        return (
          <a key={item?.id ?? index} className="c-channel-card" href={channelUrl} target="_blank" rel="noopener noreferrer">
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={title} className="c-channel-card__thumbnail" />
            ) : (
              <div className="c-channel-card__thumbnail">
                {title.charAt(0)}
              </div>
            )}
            <span className="c-channel-card__title">{title}</span>
          </a>
        )
      })}
    </div>
  )
}
