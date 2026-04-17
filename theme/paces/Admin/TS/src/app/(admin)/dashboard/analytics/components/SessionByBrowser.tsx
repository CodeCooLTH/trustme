import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import Image from 'next/image'
import { browserData } from './data'

const SessionByBrowser = () => {
  return (
    <div className="card h-full">
      <div className="card-header">
        <h4 className="card-title">Sessions by Browser</h4>
        <div className="hs-dropdown [--placement:bottom-right] ms-auto">
          <button className="hs-dropdown-toggle btn btn-sm btn-default btn-icon">
            <Icon icon="dots-vertical" className="text-base" />
          </button>
          <ul className="hs-dropdown-menu">
            <li>
              <a className="dropdown-item" href="#">
                <Icon icon="report" className="me-1" /> View Browser Report
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Icon icon="download" className="me-1" /> Export Session Data
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <Icon icon="filter-2" className="me-1" /> Filter Browsers
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item text-danger" href="#">
                <Icon icon="trash" className="me-1" /> Remove Widget
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="card-body py-2 px-0">
        <SimpleBar className="px-2" style={{ height: 364 }}>
          {browserData.map((browser, idx) => (
            <div className="flex justify-between items-center p-2.5" key={idx}>
              <div className="flex items-center gap-1.25">
                <Image src={browser.image} alt="user-image" className="me-1.25 h-6.5" width={26} />
                <span className="font-semibold text-md">{browser.name}</span>
              </div>
              <span className="font-semibold text-default-400 text-end">{browser.usage}%</span>
              <span className="font-semibold text-default-400 text-end flex items-center">
                {browser.change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
                {Math.abs(browser.change)}%
              </span>
            </div>
          ))}
        </SimpleBar>
      </div>
    </div>
  )
}

export default SessionByBrowser
