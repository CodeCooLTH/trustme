import Icon from '@/components/wrappers/Icon'
import { cn, splitArray } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { trafficSourceData } from './data'
const trafficSourceChunks = splitArray(trafficSourceData, 5)
const TopTrafficSources = () => {
  return (
    <div className="card h-full">
      <div className="card-header justify-between">
        <h4 className="card-title flex items-center gap-2">
          Top Traffic Sources
          <div className="hs-tooltip [--placement:top]">
            <button type="button" className="hs-tooltip-toggle">
              <Icon icon="info-circle" className="text-default-400 mt-2" />
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1 px-2 bg-default-800 text-xs font-medium text-default-50 rounded-md" role="tooltip">
                Shows which channels drive
                <br />
                the most traffic.
              </span>
            </button>
          </div>
        </h4>
        <div className="hs-dropdown [--placement:bottom-right] ms-auto">
          <Link href="" className="hs-dropdown-toggle btn btn-sm btn-icon border-default-300">
            <Icon icon="dots-vertical" className="text-base" />
          </Link>
          <ul className="hs-dropdown-menu">
            <li>
              <Link className="dropdown-item" href="">
                {' '}
                <Icon icon="chart-bar" className="me-1" /> View Detailed Report{' '}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="">
                {' '}
                <Icon icon="download" className="me-1" /> Export Traffic Data{' '}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" href="">
                {' '}
                <Icon icon="filter-2" className="me-1" /> Filter by Source{' '}
              </Link>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <Link className="dropdown-item text-danger" href="">
                {' '}
                <Icon icon="trash" className="me-1" /> Remove Widget{' '}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-base">
          {trafficSourceChunks.map((trafficChunk, idx) => (
            <div key={idx}>
              {trafficChunk.map((traffic, idx) => (
                <div className={cn('relative h-10 w-full ', traffic.className, idx != trafficChunk.length - 1 && 'mb-5')} key={idx}>
                  <div className="absolute size-full px-3.75 z-10 flex justify-between items-center">
                    <div className="flex items-center">
                      <Image src={traffic.image} alt="user-image" className="me-1.25 h-6" width={24} height={24} />
                      <span className="font-semibold text-md">{traffic.name}</span>
                    </div>
                    <span className="font-semibold text-sm text-default-400 text-end">{traffic.value}k</span>
                  </div>
                  <div
                    className={cn('h-full absolute flex overflow-hidden', traffic.progressBgClass)}
                    style={{
                      width: traffic.progress + '%',
                    }}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default TopTrafficSources
