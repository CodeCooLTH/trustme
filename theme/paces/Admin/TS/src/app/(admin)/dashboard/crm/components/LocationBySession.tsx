'use client'
import Icon from '@/components/wrappers/Icon'
import { getColor } from '@/utils/helpers'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
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
      fill: getColor('primary'), // highlight color
    },
  },

  selectedRegions: ['AU', 'US', 'IN'],
})

const LocationBySession = () => {
  return (
    <>
      <div className="card h-full">
        <div className="card-header">
          <h4 className="card-title">Location By Session</h4>
          <div className="hs-dropdown [--placement:bottom-right] ms-auto">
            <Link href="" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300 hover:text-primary">
              <Icon icon="dots-vertical" className="text-base" />
            </Link>
            <ul className="hs-dropdown-menu">
              <li>
                <a className="dropdown-item" href="#">
                  {' '}
                  <Icon icon="world" /> Show Top Countries
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  {' '}
                  <Icon icon="map-pin" />
                  View City Breakdown
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  {' '}
                  <Icon icon="calendar" />
                  Compare Date Range{' '}
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  {' '}
                  <Icon icon="download" />
                  Download Report
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item text-danger" href="#">
                  {' '}
                  <Icon icon="trash" /> Clear Filters{' '}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="card-body">
          <BaseVectorMap options={getWorldMarkerLineOptions()} id="session-by-countries" style={{ height: 203 }} />
          <div className="mt-5">
            <div className="table-responsive overflow-x-auto">
              <table className="table whitespace-nowrap table-borderless">
                <thead className="bg-light/50 thead-sm">
                  <tr>
                    <th>Country</th>
                    <th>Sessions</th>
                    <th>Users</th>
                    <th>Perc.</th>
                  </tr>
                </thead>
                <tbody>
                  {countryData.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="flex items-center gap-1">
                          <Image src={item.country.image} alt="user-image" className="me-1 size-4.5 rounded-full" />
                          <span className="align-middle">{item.country.name}</span>
                        </div>
                      </td>
                      <td>{item.sessions}</td>
                      <td>{item.users}</td>
                      <td>{item.percentage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LocationBySession
