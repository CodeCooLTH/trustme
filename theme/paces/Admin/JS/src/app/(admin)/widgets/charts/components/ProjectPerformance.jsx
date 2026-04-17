'use client'

import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { performanceData } from './data'
export const getSalesReportChart = () => ({
  series: [
    {
      name: 'Project Revenue',
      type: 'area',
      data: [30, 35, 40, 45, 50, 58, 62, 68, 72, 78, 80, 70], // Jan–Dec
    },
    {
      name: 'Project Orders',
      type: 'line',
      data: [20, 24, 28, 30, 33, 35, 38, 40, 42, 45, 48, 50], // Jan–Dec
    },
    {
      name: 'Project Users',
      type: 'bar',
      data: [15, 18, 22, 25, 28, 30, 35, 38, 40, 45, 48, 50], // Jan–Dec
    },
    {
      name: 'Active Projects Count',
      type: 'bar',
      data: [10, 12, 15, 18, 20, 24, 26, 28, 30, 35, 38, 40], // Jan–Dec
    },
  ],
  chart: {
    type: 'line',
    height: 321,
    toolbar: {
      show: false,
    },
    offsetX: 0,
  },
  stroke: {
    width: [2, 2, 0, 0],
    curve: 'smooth',
    dashArray: [0, 3, 0, 0],
  },
  colors: [getColor('chart-gray'), getColor('chart-gamma'), getColor('chart-primary'), getColor('chart-zeta')],
  grid: {
    strokeDashArray: 1,
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    type: 'category',
    axisBorder: {
      show: false,
    },
    labels: {
      offsetY: 1,
    },
  },
  yaxis: {
    min: 0,
    labels: {
      formatter: function (val) {
        return val + 'k'
      },
      offsetX: -10,
    },
    axisBorder: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '50%',
      borderRadius: 3,
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
  fill: {
    opacity: [0.2, 1, 1, 1],
  },
  tooltip: {
    y: {
      formatter: function (value, { seriesIndex }) {
        return '$' + value + 'k'
      },
    },
  },
})
const ProjectPerformance = () => {
  return (
    <>
      <div className="card h-full">
        <div className="card-header justify-between">
          <h4 className="card-title">Projects Performance Overview</h4>
          <div className="ms-auto">
            <div className="hs-dropdown inline-flex [--placement:bottom-right]">
              <button type="button" className="hs-dropdown-toggle btn btn-icon size-8 border-default-300 hover:border-default-400/75" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <Icon icon="dots-vertical" className="text-sm" />
              </button>
              <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                <div className="space-y-0.5">
                  <a href="#" className="dropdown-item">
                    <Icon icon="chart-histogram" />
                    View Detailed Report
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="filter-2" />
                    Filter by Status
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="calendar" />
                    Select Date Range
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="download" />
                    Export as CSV
                  </a>
                  <div className="border-default-300 my-2.5 border-t" />
                  <a href="#" className="dropdown-item text-danger!">
                    <Icon icon="refresh" />
                    Reset Analytics
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-4 grid-cols-2 text-center gap-2.5">
            {performanceData.map((item, idx) => (
              <div className="border bg-light/15 border-dashed border-light p-2.5 rounded" key={idx}>
                <h4 className="text-lg mb-2">
                  <CountUp end={item.value} start={0} duration={5} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
                </h4>
                <p className="text-default-400">{item.title}</p>
              </div>
            ))}
          </div>
          <div>
            <ApexChart getOptions={getSalesReportChart} series={getSalesReportChart().series} type="line" height={321} />
          </div>
        </div>
      </div>
    </>
  )
}
export default ProjectPerformance
