'use client'

import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
const categories = []
for (let i = 1; i <= 15; i++) {
  categories.push(i + 'D')
}
function getRandomOrders(length) {
  const d = []
  for (let idx = 0; idx < length; idx++) {
    d.push(Math.floor(Math.random() * 90) + 30)
  }
  return d
}
function getRefundsFromOrders(orders) {
  return orders.map((v) => {
    const percent = (Math.random() * (15 - 5) + 5) / 100
    return Math.round(v * percent)
  })
}
const ordersData = getRandomOrders(15)
const refundsData = getRefundsFromOrders(ordersData)
const getTotalOrderChart = () => ({
  chart: {
    height: 263,
    type: 'bar',
    stacked: true,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '35%',
    },
  },
  series: [
    {
      name: 'Orders',
      data: ordersData,
    },
    {
      name: 'Refunds',
      data: refundsData,
    },
  ],
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
    // style: 'hollow',
  },
  colors: [getColor('chart-primary'), getColor('chart-alpha')],
  tooltip: {
    shared: true,
    intersect: false,
    y: {
      formatter: function (val) {
        return val.toString()
      },
    },
  },
  xaxis: {
    categories: categories,
    tickAmount: 6,
    labels: {
      rotate: 0,
      formatter: function (val) {
        return val + ''
      },
      style: {
        fontSize: '11px',
      },
    },
    tickPlacement: 'on',
  },
  legend: {
    offsetY: 15,
  },
  grid: {
    borderColor: getColor('chart-order-color'),
    padding: {
      top: -10,
      right: 0,
      bottom: -10,
      left: 10,
    },
  },
})
const TotalOrder = () => {
  return (
    <div className="card h-full">
      <div className="card-body">
        <div className="flex flex-wrap justify-between items-start">
          <div>
            <h4 className="mb-2.5 text-default-400 text-[13px] uppercase font-bold">Total Orders</h4>
            <div className="flex items-center gap-2.5 mb-2.5 py-1.25">
              <div className="size-9 bg-success flex justify-center items-center text-white rounded-full">
                <Icon icon="basket" className="text-xl text-white" />
              </div>
              <h3 className="text-xl">
                <CountUp end={659.8} prefix="$" start={0} suffix="k" decimals={2} />
              </h3>
              <span className="badge text-sm bg-danger/15 text-danger py-0">
                <Icon icon="arrow-down" className="align-middle" /> 3.21%
              </span>
            </div>
          </div>
          <div className="input-icon-group">
            <Icon icon="calendar" className="input-icon text-default-400" />
            <select defaultValue="last_90_days" className="form-select form-select-sm">
              <option value="All">All Time</option>
              <option value="today">Today</option>
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
        </div>
        <div>
          <ApexChart getOptions={getTotalOrderChart} series={getTotalOrderChart().series} className="apex-charts" />
        </div>
      </div>
    </div>
  )
}
export default TotalOrder
