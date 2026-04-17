'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn, getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import { useState } from 'react'
import { overviewData as initialOverviewData } from './data'

const getDashRevenueChart = (series: { name: string; type: string; data: number[] }[]): ApexOptions => ({
  series,
  chart: {
    type: 'line',
    height: 324,
    toolbar: { show: false },
    offsetX: 0,
  },

  stroke: {
    width: [2, 2, 0, 0],
    curve: 'smooth',
    dashArray: [0, 4, 0, 0],
  },

  colors: [
    getColor('chart-delta'), // Revenue
    getColor('chart-secondary'), // Deals Closed
    getColor('chart-alpha'), // New Leads
    getColor('chart-gamma'), // Clients
  ],

  grid: { strokeDashArray: 1 },

  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisBorder: { show: false },
    labels: { offsetY: 1 },
  },

  yaxis: {
    labels: {
      formatter: (val) => val + 'k',
      offsetX: -10,
    },
    axisBorder: { show: false },
  },

  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '45%',
      borderRadius: 4,
    },
  },

  legend: { show: false },
  dataLabels: { enabled: false },
  markers: { size: 0 },

  fill: {
    opacity: [1, 1, 1, 1],
    type: ['gradient', 'solid'],
    gradient: {
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 70],
    },
  },
})

const Overview = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [chartKey, setChartKey] = useState(0)

  const [overviewData, setOverviewData] = useState(initialOverviewData)

  const [chartSeries, setChartSeries] = useState([
    { name: 'Revenue', type: 'area', data: [28, 30, 42, 43, 45, 58, 62, 64, 63, 68, 72, 56] },
    { name: 'Deals Closed', type: 'line', data: [20, 22, 25, 28, 26, 24, 21, 26, 30, 32, 31, 34] },
    { name: 'New Leads', type: 'bar', data: [38, 45, 52, 48, 56, 62, 58, 66, 60, 72, 70, 76] },
    { name: 'Active Clients', type: 'bar', data: [18, 20, 19, 23, 22, 25, 27, 29, 28, 31, 32, 34] },
  ])

  const refreshData = () => {
    setIsLoading(true)

    setTimeout(() => {
      setChartSeries((prev) =>
        prev.map((s) => ({
          ...s,
          data: s.data.map(() => Math.floor(Math.random() * 60) + 20),
        }))
      )

      setOverviewData((prev) =>
        prev.map((item) => ({
          ...item,
          value: Math.floor(Math.random() * 900) + 100,
          change: Math.floor(Math.random() * 10) - 5,
        }))
      )

      setChartKey((k) => k + 1)
      setIsLoading(false)
    }, 1500)
  }

  return (
    <div className="card h-full">
      <div className="card-header">
        <h4 className="card-title">
          Overview <span className="text-default-400 font-normal text-sm">(Current Year)</span>
        </h4>
        <div>
          <button type="button" className="btn bg-light btn-sm hover:text-primary me-1">
            All
          </button>
          <button type="button" className="btn bg-light btn-sm hover:text-primary me-1">
            1M
          </button>
          <button type="button" className="btn bg-light btn-sm hover:text-primary me-1">
            6M
          </button>
          <button type="button" className="btn bg-light/60 active btn-sm">
            1Y
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="grid xl:grid-cols-3 grid-cols-1 gap-base">
          <div className="xl:col-span-1">
            <div className="py-3 px-4 bg-warning/15 text-warning rounded flex items-center gap-2.5 mb-base" role="alert">
              <div>
                <Icon icon="database" className="size-7" />
              </div>
              <div>
                We regret to inform you that our server is down.
                <strong>
                  <a href="#!" className="font-bold">
                    Refresh
                  </a>
                </strong>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              {overviewData.map((overview, idx) => (
                <div key={idx}>
                  <p className="text-default-400 mb-1.25">{overview.title}</p>
                  <h4 className="mb-2.5 flex  gap-1">
                    <Icon icon={overview.icon} className={cn('me-1.25 text-lg', overview.className)} />
                    <span className="text-lg">
                      <CountUp start={0} duration={1} end={overview.value} prefix={overview.prefix} suffix={overview.suffix} decimals={Number.isInteger(overview.value) ? 0 : 2} />
                    </span>
                  </h4>
                  <span className={cn('badge text-xs py-0', overview.change === 0 ? 'bg-default-200 text-default-800' : overview.change > 0 ? 'bg-success/15 text-success' : 'bg-danger/15 text-danger')}>
                    {overview.change > 0 ? <Icon icon="chevron-up" /> : overview.change < 0 ? <Icon icon="chevron-down" /> : ''} {Math.abs(overview.change)}%
                  </span>
                </div>
              ))}
              <div>
                <button onClick={refreshData} type="button" data-action="card-refresh" className="btn btn-sm bg-primary hover:bg-primary-hover text-white">
                  <Icon icon="refresh" /> Refresh Data
                </button>
              </div>
            </div>
          </div>
          <div className="xl:col-span-2">
            <div dir="ltr">
              <ApexChart className="apex-charts" key={chartKey} type="line" height={324} series={chartSeries} getOptions={() => getDashRevenueChart(chartSeries)} />
            </div>
          </div>
        </div>
        {isLoading && (
          <div className="card-overlay flex!">
            <div className="size-8 animate-spin rounded-full border-3 border-primary border-t-transparent rounded-[999px] text-primary"></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Overview
