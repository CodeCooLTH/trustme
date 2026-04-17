'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
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
    height: 348,
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
    horizontalAlign: 'center',
    offsetX: 0,
    offsetY: -5,
    markers: {
      // width: 9,
      // height: 9,
      // radius: 6,
    },
    itemMargin: {
      horizontal: 10,
      vertical: 0,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
      barHeight: '70%',
      borderRadius: 3,
    },
  },
  colors: [getColor('chart-secondary'), getColor('chart-alpha'), getColor('chart-delta'), getColor('chart-gamma')],
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
        <div className="card-header justify-between">
          <h4 className="card-title">Financial Overview</h4>
          <div className="ms-auto">
            <div className="ms-auto">
              <div className="hs-dropdown inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggle btn btn-icon size-8 border-default-300 hover:border-default-400/75" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-sm" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                  <div className="space-y-0.5">
                    <a href="#" className="dropdown-item">
                      <Icon icon="refresh" />
                      Refresh Data
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="chart-bar" />
                      View Analytics
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="filter-2" />
                      Change Date Range
                    </a>
                    <a href="#" className="dropdown-item">
                      <Icon icon="download" />
                      Filter Report
                    </a>
                    <div className="border-default-300 my-2.5 border-t" />
                    <a href="#" className="dropdown-item text-danger!">
                      <Icon icon="download" />
                      Export Data
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="bg-light/25 border-b border-default-300 border-dashed">
            <div className="grid md:grid-cols-4 grid-cols-2 gap-base text-center">
              {overviewData.map((item, idx) => (
                <div key={idx}>
                  <p className="text-default-400 mt-5 mb-1.5">{item.title}</p>
                  <h4 className="mb-base flex items-center justify-center text-lg">
                    <Icon icon={item.icon} className={`${item.className} me-1.25 text-lg`} />
                    <span className="font-semibold">
                      <CountUp start={0} end={item.value} duration={1} prefix={item.prefix} suffix={item.suffix} decimals={2} decimal="." />
                    </span>
                  </h4>
                </div>
              ))}
            </div>
          </div>
          <div className="p-2.5">
            <div>
              <ApexChart getOptions={getFinancialOverviewChart} series={getFinancialOverviewChart().series} type="line" height={348} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default FinancialOverview
