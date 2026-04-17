'use client'

import ApexChart from '@/components/wrappers/ApexChart'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { insightData } from './data'
export const getTotalUsersChart = () => ({
  chart: {
    height: 160,
    type: 'donut',
  },
  legend: {
    show: false,
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
            formatter: function (w) {
              return w.globals.seriesTotals.reduce((a, b) => {
                return a + b
              }, 0)
            },
          },
        },
      },
    },
  },
  series: [44, 55, 41],
  labels: ['Organic', 'Referral', 'Paid'],
  colors: [getColor('chart-primary'), getColor('chart-zeta'), getColor('chart-alpha')],
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 180,
        },
      },
    },
  ],
})
const AudienceInsight = () => {
  const [activeUsers, setActiveUsers] = useState(125)
  const [activeViews, setActiveViews] = useState(125)
  const intervalRef = useRef(null)
  function animateCounter(setter, start, end, duration = 800) {
    const range = end - start
    const startTime = performance.now()
    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1)
      setter(Math.floor(start + range * progress))
      if (progress < 1) {
        requestAnimationFrame(update)
      }
    }
    requestAnimationFrame(update)
  }
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      const ac = Math.floor(Math.random() * 150 + 150)
      const views = Math.floor(Math.random() * ac + 25)
      animateCounter(setActiveUsers, 0, ac)
      animateCounter(setActiveViews, 0, views)
    }, 2000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [activeUsers, activeViews])
  return (
    <div className="card h-full">
      <div className="card-header justify-between">
        <h4 className="card-title">Audience Insights</h4>
        <div className="hs-dropdown [--placement:bottom-right] ms-auto">
          <Link href="" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300 hover:text-primary">
            <Icon icon="dots-vertical" className="text-base" />
          </Link>
          <ul className="hs-dropdown-menu">
            <li>
              <Link className="dropdown-item" href=""></Link>
            </li>
            <li>
              <Link className="dropdown-item" href=""></Link>
            </li>
            <li>
              <Link className="dropdown-item" href=""></Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item text-danger" href=""></Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="grid grid-cols-2">
          <div className="col">
            <div className="border-b p-3 border-e border-dashed border-default-300">
              <h3 className="mb-0 flex gap-2.5 items-center justify-center text-xl">
                <Icon icon="users" />
                {activeUsers}
              </h3>
            </div>
          </div>
          <div className="col">
            <div className="border-b p-3 border-e border-dashed border-default-300">
              <h3 className="mb-0 flex gap-2.5 items-center justify-center text-xl">
                <Icon icon="device-analytics" />
                {activeViews}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <ApexChart getOptions={getTotalUsersChart} series={getTotalUsersChart().series} className="apex-charts" />
        <div className="table-responsive overflow-x-auto mt-2.5">
          <table className="table table-sm whitespace-nowrap table-borderless">
            <thead className="bg-light/50">
              <tr className="uppercase text-2xs">
                <th>Page</th>
                <th>Views</th>
                <th>B. Rate</th>
              </tr>
            </thead>
            <tbody>
              {insightData.map((item, idx) => (
                <tr key={idx}>
                  <td>
                    <a href="" className="text-default-400">
                      {item.pageLink}
                    </a>
                  </td>
                  <td>{item.views}</td>
                  <td>{item.rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="text-center mt-2">
          <Link href="" className="btn btn-sm bg-secondary hover:bg-secondary-hover text-white font-semibold">
            View All <Icon icon="arrow-right" />
          </Link>
        </div>
      </div>
    </div>
  )
}
export default AudienceInsight
