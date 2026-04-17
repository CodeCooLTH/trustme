'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'
import { WeeklyType } from './data'

type SalesReportProps = {
  weekly: WeeklyType
}

const getSalesReportChart = (weekly: WeeklyType): ApexOptions => ({
  series: [
    {
      name: 'รายได้',
      type: 'area',
      data: weekly.revenue,
    },
    {
      name: 'ออเดอร์',
      type: 'line',
      data: weekly.orders,
    },
  ],
  chart: {
    type: 'line',
    height: 300,
    toolbar: {
      show: false,
    },
    offsetX: 0,
  },
  stroke: {
    width: [3, 2],
    curve: 'smooth',
    dashArray: [0, 8],
  },
  colors: [getColor('chart-secondary'), getColor('chart-alpha')],
  grid: {
    strokeDashArray: 7,
  },
  xaxis: {
    categories: weekly.labels,
    axisBorder: {
      show: false,
    },
    labels: {
      offsetY: 2,
    },
  },
  yaxis: {
    tickAmount: 4,
    min: 0,
    labels: {
      show: true,
      formatter: function (value) {
        return value >= 1000 ? (value / 1000).toFixed(0) + 'k' : String(value)
      },
      offsetX: -10,
    },
    axisBorder: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  tooltip: {
    y: {
      formatter: function (val, opts?) {
        if (opts?.seriesIndex === 0) return '฿' + val.toLocaleString('th-TH')
        return val + ' ออเดอร์'
      },
    },
  },
  fill: {
    opacity: [1, 0.5],
    type: ['gradient', 'solid'],
    gradient: {
      type: 'vertical',
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 70],
    },
  },
  legend: {
    offsetY: 15,
  },
})

const SalesReport = ({ weekly }: SalesReportProps) => {
  const totalRevenue = weekly.revenue.reduce((a, b) => a + b, 0)
  const totalOrders = weekly.orders.reduce((a, b) => a + b, 0)
  const chartOptions = getSalesReportChart(weekly)

  return (
    <div className="card h-full">
      <div className="card-header md:py-0 pt-6 pb-0">
        <h4 className="card-title">
          รายงานยอดขาย
          <span className="text-default-400 text-sm font-normal ms-1">(7 วันล่าสุด)</span>
        </h4>
      </div>
      <div>
        <div className="bg-light/25 border-b border-default-300 border-dashed">
          <div className="grid grid-cols-2 md:gap-base text-center">
            <div>
              <p className="text-default-400 mt-5 mb-1.25">รายได้</p>
              <h4 className="flex justify-center items-center mb-4 text-lg font-semibold">
                <Icon icon="wallet" className="text-success me-2" />
                <span>
                  <CountUp start={0} end={totalRevenue} prefix="฿" duration={1} decimals={0} />
                </span>
              </h4>
            </div>
            <div>
              <p className="text-default-400 mt-5 mb-1.25">ออเดอร์</p>
              <h4 className="flex justify-center items-center mb-4 text-lg font-semibold">
                <Icon icon="basket" className="text-success me-2" />
                <span>
                  <CountUp start={0} end={totalOrders} duration={1} />
                </span>
              </h4>
            </div>
          </div>
        </div>
        <div className="p-5 pt-1.25 relative">
          <div className="apex-charts">
            <ApexChart getOptions={() => chartOptions} series={chartOptions.series} type="line" height={300} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesReport
