'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'

export const getTotalUsersChart = (): ApexOptions => ({
  chart: {
    height: 204,
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
              return w.globals.seriesTotals.reduce((a: number, b: number) => {
                return a + b
              }, 0)
            },
          },
        },
      },
    },
  },
  series: [44, 55, 41],
  labels: ['Direct', 'Affiliate', 'Sponsored'],
  colors: [getColor('chart-primary'), getColor('chart-alpha'), getColor('chart-gray')],
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 160,
        },
      },
    },
  ],
})

const StorePerformance = () => {
  return (
    <>
      <div className="card h-full">
        <div className="card-header justify-between">
          <h4 className="card-title">Store Performance Analytics</h4>
          <div>
            <a href="#" className="btn btn-sm btn-default border border-default-300 hover:border-default-500">
              <Icon icon="refresh" className="me-1" /> Refresh
            </a>
          </div>
        </div>
        <div className="card-body">
          <div>
            <ApexChart getOptions={getTotalUsersChart} series={getTotalUsersChart().series} type="donut" height={204} />
          </div>
          <div className="text-center">
            <span className="badge border border-light text-dark rounded-full p-1.25 px-2.5 rounded-pill text-xs">
              <Icon icon="star-filled" className="text-success me-1.25" /> GOOD SALES
            </span>
          </div>
          <div className="overflow-x-auto mt-3">
            <table className="w-full text-2xs whitespace-nowrap">
              <thead className="bg-default-100 text-2xs uppercase">
                <tr>
                  <th className="text-start p-2">Page</th>
                  <th className="text-start p-2">Views</th>
                  <th className="text-start p-2">B. Rate</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr>
                  <td className="p-2">
                    <a href="" className="text-default-500">
                      /paces/dashboard-analytics
                    </a>
                  </td>
                  <td className="p-2">25</td>
                  <td className="p-2">87.5%</td>
                </tr>

                <tr>
                  <td className="p-2">
                    <a href="" className="text-default-500">
                      /paces/dashboard-crm
                    </a>
                  </td>
                  <td className="p-2">15</td>
                  <td className="p-2">21.48%</td>
                </tr>

                <tr>
                  <td className="p-2">
                    <a href="" className="text-default-500">
                      /admin/dashboard
                    </a>
                  </td>
                  <td className="p-2">10</td>
                  <td className="p-2">63.59%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default StorePerformance
