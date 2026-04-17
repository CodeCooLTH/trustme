'use client'

import ApexChart from '@/components/wrappers/ApexChart'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
export const getSalesReportChart = () => ({
  chart: {
    height: 341,
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
      <div className="card h-full">
        <div className="card-header justify-between">
          <h4 className="card-title">Project Status Breakdown</h4>
          <div className="ms-auto">
            <div className="hs-dropdown inline-flex [--placement:bottom-right]">
              <button type="button" className="hs-dropdown-toggle btn btn-icon size-8 border-default-300 hover:border-default-400/75" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <Icon icon="dots-vertical" className="text-sm" />
              </button>
              <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                <div className="space-y-0.5">
                  <a href="#" className="dropdown-item">
                    <Icon icon="eye" />
                    View All Status Details
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="filter-2" />
                    Filter by Status
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="calendar" />
                    Change Date Range
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="download" />
                    Export Breakdown
                  </a>
                  <div className="border-default-300 my-2.5 border-t" />
                  <a href="#" className="dropdown-item text-danger!">
                    <Icon icon="refresh" />
                    Reset Status View
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body pt-0">
          <ApexChart getOptions={getSalesReportChart} series={getSalesReportChart().series} type="radialBar" height={341} />
          <div className="grid grid-cols-2 gap-base mt-2.5">
            <div>
              <div className="flex justify-between items-center p-1.25">
                <div className="flex items-center">
                  <Icon icon="circle-filled" className="text-xs me-1.25 text-secondary" />
                  <span className="font-semibold">Completed</span>
                </div>
                <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                  <Icon icon="chevron-down" className="text-danger" /> 965
                </span>
              </div>
              <div className="flex justify-between items-center p-1.25">
                <div className="flex items-center">
                  <Icon icon="circle-filled" className="text-xs me-1.25 text-warning" />
                  <span className="font-semibold">In Progress</span>
                </div>
                <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                  <Icon icon="chevron-up" className="text-success" /> 75
                </span>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center p-1.25">
                <div className="flex items-center">
                  <Icon icon="circle-filled" className="text-xs me-1.25 text-secondary" />
                  <span className="font-semibold"> Yet to Start</span>
                </div>
                <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                  <Icon icon="chevron-up" className="text-success" /> 102
                </span>
              </div>
              <div className="flex justify-between items-center p-1.25">
                <div className="flex items-center">
                  <Icon icon="circle-filled" className="text-xs me-1.25 text-danger" />
                  <span className="font-semibold">Cancelled</span>
                </div>
                <span className="font-semibold text-default-400 float-end flex items-center gap-1">
                  <Icon icon="chevron-down" className="text-danger" /> 96
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ProjectStatus
