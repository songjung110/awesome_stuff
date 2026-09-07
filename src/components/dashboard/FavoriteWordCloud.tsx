import { useEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5wc from '@amcharts/amcharts5/wc'

interface FavoriteWordCloudProps {
  text: string
}

export default function FavoriteWordCloud({ text }: FavoriteWordCloudProps) {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const root = am5.Root.new(chartRef.current)
    root.setThemes([am5.Theme.new(root)])

    const series = root.container.children.push(
      am5wc.WordCloud.new(root, {
        maxCount: 100,
        minWordLength: 5,
        maxFontSize: am5.percent(35),
        minFontSize: am5.percent(5),
        text,
      })
    )

    series.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [text])

  return <div ref={chartRef} className="h-80 w-full" />
}