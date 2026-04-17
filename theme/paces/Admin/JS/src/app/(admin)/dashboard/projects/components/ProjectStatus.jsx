'use client'

import ApexChart from '@/components/wrappers/ApexChart'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
export const getSalesReportChart = () => ({
  chart: {
    height: 327,
    type: 'radialBar',
  },
  plotOptions: {
    radialBar: {
      track: {
        margin: 22,
        background: 'rgba(170,184,197, 0.2)',
      },
      hollow: {
        size: '1%',
      },
      dataLabels: {
        name: {
          show: true,
        },
        value: {
          show: true,
        },
      },
    },
  },
  stroke: {
    lineCap: 'round',
  },
  colors: [getColor('chart-primary'), getColor('chart-gamma'), getColor('chart-secondary'), getColor('chart-beta')],
  series: [44, 55, 67, 22],
  labels: ['Completed', 'In Progress', 'Yet to Start', 'Cancelled'],
  responsive: [
    {
      breakpoint: 380,
      options: {
        chart: {
          height: 260,
        },
      },
    },
  ],
})
const ProjectStatus = () => {
  return (
    <>
      <div>
        <div className="card h-full">
          <div className="card-header justify-between">
            <h4 className="card-title">Project Status Breakdown</h4>
            <div className="hs-dropdown [--placement:bottom-right] ms-auto">
              <a href="#" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300">
                <Icon icon="dots-vertical" className="text-base" />
              </a>
              <ul className="hs-dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    <Icon icon="eye" className="me-1" /> View All Status Details
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <Icon icon="download" className="me-1" />
                    Filter by Status
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <Icon icon="calendar" className="me-1" />
                    Change Date Range
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    <Icon icon="download" className="me-1" />
                    Export Breakdown
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item text-danger" href="#">
                    <Icon icon="refresh" className="me-1" /> Reset Status View
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="card-body pt-0">
            <ApexChart getOptions={getSalesReportChart} series={getSalesReportChart().series} />
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-base">
              <div>
                <div className="flex justify-between p-1.5">
                  <div className="flex items-center">
                    <Icon icon="circle-filled" className="text-xs align-middle me-1 text-secondary" />
                    <span className="align-middle font-semibold">Completed</span>
                  </div>
                  <span className="font-semibold text-default-400 text-end flex gap-1 items-center">
                    <Icon icon="chevron-down" className="text-danger" /> 965
                  </span>
                </div>
                <div className="flex justify-between p-1.5">
                  <div className="flex items-center">
                    <Icon icon="circle-filled" className="text-xs align-middle me-1 text-warning" />
                    <span className="align-middle font-semibold">In Progress</span>
                  </div>
                  <span className="font-semibold text-default-400 text-end flex gap-1 items-center">
                    <Icon icon="chevron-up" className="text-success" /> 75
                  </span>
                </div>
              </div>
              <div>
                <div className="flex justify-between p-1.5">
                  <div className="flex items-center">
                    <Icon icon="circle-filled" className="text-xs align-middle me-1 text-secondary" />
                    <span className="align-middle font-semibold"> Yet to Start</span>
                  </div>
                  <span className="font-semibold text-default-400 text-end flex gap-1 items-center">
                    <Icon icon="chevron-up" className="text-success" /> 102
                  </span>
                </div>
                <div className="flex justify-between p-1.5">
                  <div className="flex items-center">
                    <Icon icon="circle-filled" className="text-xs align-middle me-1 text-danger" />
                    <span className="align-middle font-semibold">Cancelled</span>
                  </div>
                  <span className="font-semibold text-default-400 text-end flex gap-1 items-center">
                    <Icon icon="chevron-down" className="text-danger" /> 96
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProjectStatus
