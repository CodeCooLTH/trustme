'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import { getColor } from '@/utils/helpers'
import { Icon as IconifyIcon } from '@iconify/react'
import { ApexOptions } from 'apexcharts'
import { overviewData } from './data'

export const getFinancialOverviewChart = (): ApexOptions => ({
  series: [
    {
      name: 'Total Income',
      type: 'bar',
      data: [89.25, 98.58, 68.74, 108.87, 77.54, 84.03, 51.24, 28.57, 92.57, 42.36, 88.51, 36.57],
    },
    {
      name: 'Total Expenses',
      type: 'bar',
      data: [22.25, 24.58, 36.74, 22.87, 19.54, 25.03, 29.24, 10.57, 24.57, 35.36, 20.51, 17.57],
    },
    {
      name: 'Investments',
      type: 'area',
      data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
    },
    {
      name: 'Savings',
      type: 'line',
      data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
    },
  ],
  chart: {
    height: 376,
    type: 'line',
    toolbar: {
      show: false,
    },
  },
  stroke: {
    dashArray: [0, 0, 0, 8],
    width: [0, 0, 2, 2],
    curve: 'smooth',
  },
  fill: {
    opacity: [1, 1, 0.1, 1],
    type: ['gradient', 'solid', 'solid', 'solid'],
    gradient: {
      type: 'vertical',
      //   shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 70],
    },
  },
  markers: {
    size: [0, 0, 0, 0],
    strokeWidth: 2,
    hover: {
      size: 4,
    },
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    axisTicks: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
  },
  yaxis: {
    min: 0,
    labels: {
      formatter: function (val) {
        return val + 'k'
      },
    },
    axisBorder: {
      show: false,
    },
  },
  grid: {
    show: true,
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
    padding: {
      top: 0,
      right: -2,
      bottom: 15,
      left: 10,
    },
  },
  legend: {
    show: true,
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      barHeight: '70%',
      borderRadius: 3,
    },
  },
  colors: [getColor('chart-primary'), getColor('chart-gamma'), getColor('chart-gray'), getColor('chart-secondary')],
  tooltip: {
    shared: true,
    y: [
      {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return '$' + y.toFixed(2) + 'k'
          }
          return y
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return '$' + y.toFixed(2) + 'k'
          }
          return y
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return '$' + y.toFixed(2) + 'k'
          }
          return y
        },
      },
      {
        formatter: function (y) {
          if (typeof y !== 'undefined') {
            return '$' + y.toFixed(2) + 'k'
          }
          return y
        },
      },
    ],
  },
})

const FinancialOverview = () => {
  return (
    <>
      <div className="card h-full">
        <div className="card-header border-0 justify-content-between">
          <h4 className="card-title">Financial Overview</h4>
          <div className="hs-dropdown [--placement:bottom-right] ms-auto">
            <a href="#!" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300 hover:text-primary">
              <IconifyIcon icon="tabler:dots-vertical" className="text-base" />
            </a>
            <ul className="hs-dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <IconifyIcon icon="tabler:refresh" /> Refresh Data
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <IconifyIcon icon="tabler:bar-chart" />
                  View Analytics
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <IconifyIcon icon="tabler:list-filter" />
                  Filter Report
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#">
                  <IconifyIcon icon="tabler:download" /> Export Data
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body p-0">
          <div className="bg-light/25 border-b border-default-300 border-dashed">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-base text-center">
              {overviewData.map((item, idx) => (
                <div key={idx}>
                  <p className="text-default-400 mt-5 mb-1.5">{item.title}</p>
                  <h4 className="mb-base flex items-center justify-center text-lg">
                    <IconifyIcon icon={item.icon} className={`${item.className} me-1.25 text-lg`} />
                    <span>
                      <CountUp start={0} end={item.value} duration={1} prefix={item.prefix} suffix={item.suffix} decimals={2} decimal="." />
                    </span>
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2.5">
            <ApexChart getOptions={getFinancialOverviewChart} series={getFinancialOverviewChart().series} />
          </div>
        </div>
      </div>
    </>
  )
}

export default FinancialOverview
