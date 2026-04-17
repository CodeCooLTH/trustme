'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import { ApexOptions } from 'apexcharts'

export const getSimplePieChart = (): ApexOptions => ({
  chart: {
    height: 243,
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
          },
        },
      },
    },
  },
  series: [112, 234, 88, 144],
  labels: ['Newsletter', 'Instagram', 'WhatsApp', 'Website'],
  colors: [getColor('chart-primary'), getColor('chart-secondary'), getColor('chart-alpha'), getColor('chart-gray')],
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
})

const LeadSource = () => {
  return (
    <div className="card h-full">
      <div className="card-header justify-between">
        <h4 className="card-title">Lead Source</h4>
        <div>
          <button className="btn btn-sm border-default-300 hover:border-default-400 font-medium me-1">
            <Icon icon="cloud-upload" /> Export
          </button>
          <button className="btn btn-sm bg-default-200 hover:text-primary font-medium">
            <Icon icon="download" /> Import
          </button>
        </div>
      </div>
      <div className="card-body">
        <div>
          <div id="most-leads-chart" className="apex-charts">
            <ApexChart getOptions={getSimplePieChart} series={getSimplePieChart().series} />
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 md:gap-base mt-2.5">
          <div>
            <div className="flex justify-between items-center p-1.25">
              <div className="flex items-center gap-1">
                <Icon icon="speakerphone" className="text-base align-middle me-1.25 text-primary" />
                <span className="align-middle font-semibold">Newsletter</span>
              </div>
              <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                <Icon icon="chevron-up" className="text-success align-middle" /> 6.37%
              </span>
            </div>
            <div className="flex justify-between items-center p-1.25">
              <div className="flex items-center gap-1">
                <Icon icon="user-hexagon" className="text-base align-middle me-1.25 text-danger" />
                <span className="align-middle font-semibold">Instagram</span>
              </div>
              <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                <Icon icon="chevron-up" className="text-success align-middle" /> 34.8%
              </span>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center p-1.25">
              <div className="flex items-center gap-1">
                <Icon icon="settings-2" className="text-base align-middle me-1.25 text-success" />
                <span className="align-middle font-semibold">WhatsApp</span>
              </div>
              <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                <Icon icon="chevron-down" className="text-danger align-middle" /> 8.9%
              </span>
            </div>
            <div className="flex justify-between items-center p-1.25">
              <div className="flex items-center gap-1">
                <Icon icon="world" className="text-base align-middle me-1.25 text-warning" />
                <span className="align-middle font-semibold">Website</span>
              </div>
              <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                <Icon icon="chevron-up" className="text-success align-middle" />
                44.3%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LeadSource
