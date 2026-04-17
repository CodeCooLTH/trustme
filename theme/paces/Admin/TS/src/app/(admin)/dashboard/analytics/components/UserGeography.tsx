'use client'
import Icon from '@/components/wrappers/Icon'
import { cn, getColor } from '@/utils/helpers'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { countryData } from './data'
const BaseVectorMap = dynamic(() => import('@/components/wrappers/BaseVectorMap'), { ssr: false })

export const getWorldMarkerLineOptions = () => ({
  map: 'world',
  zoomOnScroll: false,
  zoomButtons: true,

  regionStyle: {
    initial: {
      stroke: '#aab9d14d',
      strokeWidth: 0.25,
      fill: '#aab9d14d',
      fillOpacity: 1,
    },
    selected: {
      fill: getColor('primary'),
    },
  },

  selectedRegions: ['CA', 'US', 'RU', 'IN'],
})

const UserGeography = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h4 className="card-title flex items-center gap-2">
          User Geography Intelligence
          <div className="hs-tooltip [--placement:top]">
            <button type="button" className="hs-tooltip-toggle">
              <Icon icon="info-circle" className="text-default-400 mt-2" />
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-800 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                Deep insight into user
                <br />
                distribution across the globe.
              </span>
            </button>
          </div>
        </h4>
        <div className="hs-dropdown [--placement:bottom-right] ms-auto">
          <button className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300 hover:text-primary">
            <Icon icon="dots-vertical" className="text-base" />
          </button>
          <ul className="hs-dropdown-menu">
            <li>
              <Link className="dropdown-item" href="">
                <Icon icon="map" className="me-1" /> Open Geo Visualization
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="">
                <Icon icon="download" className="me-1" /> Export Geo Metrics
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="">
                <Icon icon="filter-2" className="me-1" /> Country Filters
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item text-danger" href="">
                <Icon icon="trash" className="me-1" /> Remove Widget
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body pt-0">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center md:gap-base">
          <div className="md:col-span-7">
            <BaseVectorMap options={getWorldMarkerLineOptions()} id="world-map-marker-line" style={{ height: 300 }} />
          </div>
          <div className="md:col-span-5">
            <div className="md:p-5 p-2.5">
              {countryData.map((item, idx) => (
                <Fragment key={idx}>
                  <div className="flex justify-between items-center">
                    <p className="flex items-center mb-1.25">
                      <Image src={item.flag} alt="user-image" className="me-1.25 size-5 rounded-full" />
                      <span className="align-middle">{item.name}</span>
                    </p>
                    <div>
                      <h5 className="font-semibold">{item.value}k</h5>
                    </div>
                  </div>
                  <div className={`flex items-center gap-2.5 ${idx === countryData.length - 1 ? '' : 'mb-5'}`}>
                    <div className="flex-1">
                      <div className="h-1.25 w-full rounded-full bg-default-100 overflow-hidden">
                        <div className={cn('h-full rounded-e-none bg-secondary', item.className)} style={{ width: `${item.progress}%` }} role="progressbar" aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-default-400">{item.progress}%</p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserGeography
