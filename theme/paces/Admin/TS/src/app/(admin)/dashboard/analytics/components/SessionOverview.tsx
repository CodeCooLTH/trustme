'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn, getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import Link from 'next/link'
import { useState } from 'react'
import { SessionType, sessionData } from './data'

function generateRandomSeries(length: number, min = 18, max = 24): number[] {
  const data: number[] = []
  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * (max - min + 1)) + min)
  }
  return data
}

const SessionOverview = () => {
  const [activeTab, setActiveTab] = useState<SessionType['tabId']>('users')

  const initialData = generateRandomSeries(30)
  const [chartData, setChartData] = useState(() => ({
    visitors: initialData.map((item) => item - 4),
    views: initialData,
  }))

  const getFinancialOverviewChart = (): ApexOptions => ({
    series: [
      {
        name: 'Visitors',
        data: chartData.visitors,
      },
      {
        name: 'Page Views',
        data: chartData.views,
      },
    ],
    chart: {
      type: 'area',
      height: 328,
      toolbar: {
        show: false,
      },
      offsetX: 0,
    },
    stroke: {
      width: [2, 2],
      dashArray: [0, 5],
    },
    colors: [getColor('chart-primary'), getColor('chart-gamma'), getColor('chart-gray')],
    grid: {
      strokeDashArray: 7,
    },
    // zoom: {
    //   enabled: false,
    // },
    xaxis: {
      // type: 'string',
      axisBorder: {
        show: false,
      },
      labels: {
        offsetY: 2,
      },
    },
    yaxis: {
      tickAmount: 3,
      min: 0,
      labels: {
        formatter: function (val: number) {
          return val + 'k'
        },
        offsetX: -10,
      },
      axisBorder: {
        show: false,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 0,
    },
    tooltip: {
      x: {
        format: 'dd MMM yyyy',
      },
    },
    fill: {
      opacity: [0.5, 0.5],
      type: ['gradient', 'gradient'],
      gradient: {
        type: 'vertical',
        //   shadeIntensity: 1,
        inverseColors: false,
        opacityFrom: 0.35,
        opacityTo: 0,
        stops: [0, 95],
      },
    },
  })

  const handleTabChange = (tab: SessionType['tabId']) => {
    if (tab === activeTab) return

    setActiveTab(tab)
    const data = generateRandomSeries(30)
    setChartData({
      visitors: data.map((item) => item - 4),
      views: data,
    })
  }
  return (
    <div className="card h-full">
      <div className="card-header justify-between">
        <h4 className="card-title">
          Sessions Overview <span className="text-default-400 text-sm font-normal">(609.5k Sessions)</span>
        </h4>
        <div>
          <Link href="" className="btn btn-sm border-default-300 hover:border-default-400 hover:bg-default-50 me-1">
            <Icon icon="cloud-upload" /> Export
          </Link>
          <Link href="" className="btn btn-sm bg-light hover:text-primary">
            <Icon icon="download" /> Import
          </Link>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="border-b border-default-300">
          <nav className="grid md:grid-cols-4 grid-cols-1" aria-label="Tabs" role="tablist" aria-orientation="horizontal">
            {sessionData.map((session, idx) => (
              <button type="button" className={cn('py-5 px-4 flex items-center justify-center gap-x-2 border-b-2 border-transparent text-start', activeTab === session.tabId && 'border-primary')} role="tab" onClick={() => handleTabChange(session.tabId)} key={idx}>
                <div>
                  <div className="size-9 flex justify-center items-center rounded-full bg-info/15 text-info">
                    <Icon icon={session.icon} className="text-xl" />
                  </div>
                </div>
                <span className="flex flex-col">
                  <span className="text-default-400 font-medium">{session.title}</span>
                  <p className="text-lg font-semibold text-default-900">
                    {typeof session.value === 'number' ? <CountUp start={0} end={session.value} duration={1} suffix="k" decimal="." decimals={2} /> : <span>{session.value}</span>}

                    <span className={cn('text-sm ms-2.5 inline-flex items-center', session.change > 0 ? 'text-success' : 'text-danger')}>
                      {session.change > 0 ? <Icon icon="arrow-up" className="align-middle" /> : <Icon icon="arrow-down" className="align-middle" />} {Math.abs(session.change)}%
                    </span>
                  </p>
                </span>
              </button>
            ))}
          </nav>
        </div>
        <div className="p-5">
          <div role="tabpanel" aria-labelledby="users-tab1">
            <div dir="ltr">
              <ApexChart getOptions={getFinancialOverviewChart} series={getFinancialOverviewChart().series} className="apex-charts" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SessionOverview
