import { useEffect, useRef } from 'react'
import * as am5 from '@amcharts/amcharts5'
import * as am5xy from '@amcharts/amcharts5/xy'
import type { FavoriteChartPoint } from '../../store/youtubeSlice'

interface FavoriteLineChartProps {
  data: FavoriteChartPoint[]
  color?: string
}

export default function FavoriteLineChart({ data, color = '#ff0000' }: FavoriteLineChartProps) {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    const root = am5.Root.new(chartRef.current)
    root.setThemes([am5.Theme.new(root)])

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panX: false,
        panY: false,
        wheelX: 'panX',
        wheelY: 'zoomX',
        layout: root.verticalLayout,
      })
    )

    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        categoryField: 'date',
        renderer: am5xy.AxisRendererX.new(root, {}),
        tooltip: am5.Tooltip.new(root, {}),
      })
    )

    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    )

    const series = chart.series.push(
      am5xy.LineSeries.new(root, {
        name: '좋아요 수',
        xAxis,
        yAxis,
        valueYField: 'favoriteCount',
        categoryXField: 'date',
        tooltip: am5.Tooltip.new(root, {
          labelText: '{valueY}',
        }),
        stroke: am5.color(color),
        fill: am5.color(color),
      })
    )

    series.strokes.template.setAll({
      strokeWidth: 3,
      strokeOpacity: 1,
    })

    series.bullets.push(() => {
      const bullet = am5.Bullet.new(root, {
        sprite: am5.Circle.new(root, {
          radius: 5,
          fill: am5.color(color),
          stroke: am5.color('#ffffff'),
          strokeWidth: 2,
        }),
      })

      return bullet
    })

    series.data.setAll(data)
    xAxis.data.setAll(data)

    chart.set('cursor', am5xy.XYCursor.new(root, {}))

    chart.appear(1000, 100)

    return () => {
      root.dispose()
    }
  }, [color, data])

  return <div ref={chartRef} className="h-80 w-full" />
}
