import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import type { ChartOptions, TooltipItem, Plugin } from 'chart.js'
import { Doughnut } from 'react-chartjs-2';
import { http } from '../utils/request';

const BG_PALETTE = [
  'rgba(255, 99, 132, 0.2)',
  'rgba(54, 162, 235, 0.2)',
  'rgba(255, 206, 86, 0.2)',
  'rgba(75, 192, 192, 0.2)',
  'rgba(153, 102, 255, 0.2)',
  'rgba(255, 159, 64, 0.2)'
]
const BORDER_PALETTE = [
  'rgba(255, 99, 132, 1)',
  'rgba(54, 162, 235, 1)',
  'rgba(255, 206, 86, 1)',
  'rgba(75, 192, 192, 1)',
  'rgba(153, 102, 255, 1)',
  'rgba(255, 159, 64, 1)'
]

ChartJS.register(ArcElement, Tooltip, Legend);

type BestsellerByCategory = { category: string; count: number; ratio?: number }

export const CategoryChart:React.FC = () => {
  const [items, setItems] = useState<BestsellerByCategory[]>([])
  const [apiTotal, setApiTotal] = useState<number>(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await http.get<{ message: string; total: number; data: BestsellerByCategory[] }>(`/api/admin/bestsellers/category`)
        console.log('API Response:', res.data)
        setItems(res.data.data || [])
        setApiTotal(res.data.total || 0)
      } catch {
        setItems([])
        setApiTotal(0)
      }
    }
    fetchData()
  }, [])

  const labels = useMemo(() => items.map(i => i.category), [items])
  const counts = useMemo(() => items.map(i => i.count), [items])
  const ratios = useMemo(() => items.map(i => i.ratio ?? 0), [items])

  const chartData = useMemo(() => ({
    labels,
    datasets: [
      {
        label: '畅销书种类占比',
        data: counts,
        backgroundColor: labels.map((_, idx) => BG_PALETTE[idx % BG_PALETTE.length]),
        borderColor: labels.map((_, idx) => BORDER_PALETTE[idx % BORDER_PALETTE.length]),
        borderWidth: 2,
        hoverOffset: 8,
      }
    ]
  }), [labels, counts])

  const total = useMemo(() => {
    return apiTotal > 0 ? apiTotal : counts.reduce((a, b) => a + b, 0)
  }, [apiTotal, counts])

  const options: ChartOptions<'doughnut'> = useMemo(() => ({
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<'doughnut'>) => {
            const idx = context.dataIndex
            const label = labels[idx] ?? ''
            const count = counts[idx] ?? 0
            const ratioPct = Math.round((ratios[idx] ?? 0) * 1000) / 10 // 0.1 精度
            return `${label}: ${count}（${ratioPct}%）`
          }
        },
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 10,
        borderWidth: 0,
      },
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
          boxWidth: 40,
          color: '#64748b'
        }
      }
    },
    cutout: '60%',
    animation: { animateRotate: true, animateScale: true },
    radius: '90%',
  }), [labels, counts, ratios])

  const centerTextPlugin: Plugin<'doughnut'> = useMemo(() => ({
    id: 'center-text-plugin',
    afterDraw(chart) {
      const { ctx, chartArea } = chart
      if (!ctx) return
      // 直接从图表数据计算总数
      const ds = (chart.data.datasets?.[0]?.data ?? []) as number[]
      const currentTotal = ds.reduce((acc, val) => acc + (val || 0), 0)
      const centerX = (chartArea.left + chartArea.right) / 2
      const centerY = (chartArea.top + chartArea.bottom) / 2
      ctx.save()
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#111827'
      ctx.font = '600 16px sans-serif'
      ctx.fillText('总数', centerX, centerY - 10)
      ctx.font = '700 20px sans-serif'
      ctx.fillText(String(currentTotal), centerX, centerY + 14)
      ctx.restore()
    }
  }), [])

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Doughnut data={chartData} options={options} plugins={[centerTextPlugin]} />
      {items.length > 0 && (
        <div className="w-full mt-4 space-y-2 thin-scrollbar max-h-48 overflow-y-auto">
          {items.map((it, idx) => {
            const pct = Math.round((it.ratio ?? (total ? it.count / total : 0)) * 1000) / 10
            const color = BORDER_PALETTE[idx % BORDER_PALETTE.length]
            return (
              <div key={it.category} className="w-full">
                <div className="flex items-center justify-between text-sm mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="inline-block w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-gray-700">{it.category}</span>
                  </div>
                  <div className="text-gray-500">{it.count}（{pct}%）</div>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded">
                  <div className="h-2 rounded" style={{ width: `${pct}%`, backgroundColor: color, transition: 'width .6s ease' }} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  );
}
