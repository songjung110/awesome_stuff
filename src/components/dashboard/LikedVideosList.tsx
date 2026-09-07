import './LikedVideosList.scss'

interface LikedVideoItem {
  id?: string
  snippet?: {
    title?: string
    videoOwnerChannelTitle?: string
    resourceId?: {
      videoId?: string
    }
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
    <div className="c-liked-videos-list">
      {items.map((item, index) => {
        // YouTube 응답에서 영상 제목과 썸네일을 카드 형태로 바로 보여주기 위해 필요한 값만 추출한다.
        const title = String(item?.snippet?.title ?? '제목 없음')
        const thumbnailUrl =
          item?.snippet?.thumbnails?.default?.url ??
          item?.snippet?.thumbnails?.medium?.url ??
          item?.snippet?.thumbnails?.high?.url
        const videoId = item?.snippet?.resourceId?.videoId

        return (
          <a
            href={videoId ? `https://www.youtube.com/watch?v=${videoId}` : '#'}
            target={videoId ? '_blank' : undefined}
            rel={videoId ? 'noopener noreferrer' : undefined}
            key={item?.id ?? index}
            className="c-video-card"
          >
            {thumbnailUrl ? (
              <img src={thumbnailUrl} alt={title} className="c-video-card__thumbnail" />
            ) : (
              <div className="c-video-card__thumbnail">
                썸네일 없음
              </div>  
            )}
            <span className="c-video-card__title">
              {title}
            </span>
            <div className="c-video-card__channel">
              {item?.snippet?.videoOwnerChannelTitle || '알 수 없음'}
            </div>
          </a>
        )
      })}
    </div>
  )
}
