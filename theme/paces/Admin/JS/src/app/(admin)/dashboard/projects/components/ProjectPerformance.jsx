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
    height: 307,
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
        <div className="card-header">
          <h4 className="card-title">Projects Performance Overview</h4>
          <div className="hs-dropdown [--placement:bottom-right] ms-auto">
            <a href="#" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300">
              <Icon icon="dots-vertical" className="text-base" />
            </a>
            <ul className="hs-dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="chart-histogram" className="me-1" /> View Detailed Report
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="filter-2" className="me-1" />
                  Filter by Project
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="calendar" className="me-1" />
                  Select Date Range
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  <Icon icon="download" className="me-1" />
                  Export as CSV
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#">
                  <Icon icon="refresh" className="me-1" /> Reset Analytics
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          <div className="grid md:grid-cols-4 grid-cols-2 text-center gap-2.5">
            {performanceData.map((item, idx) => (
              <div key={idx}>
                <div className="border border-dashed border-light rounded p-2.5 bg-light/20">
                  <h4 className="mb-2 text-lg">
                    <CountUp end={item.value} start={0} duration={5} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
                  </h4>
                  <p className="text-default-400 text-sm">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
          <div>
            <ApexChart getOptions={getSalesReportChart} series={getSalesReportChart().series} type="line" height={307} />
          </div>
        </div>
      </div>
    </>
  )
}
export default ProjectPerformance
