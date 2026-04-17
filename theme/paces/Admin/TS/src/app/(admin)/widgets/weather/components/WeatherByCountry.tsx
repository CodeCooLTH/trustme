import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import Image from 'next/image'
import { countryWeatherData } from './data'

const WeatherByCountry = () => {
  return (
    <>
      <div className="card">
        <div className="card-header justify-between">
          <h4 className="card-title">Weather by Country</h4>
          <div className="ms-auto">
            <div className="hs-dropdown inline-flex [--placement:bottom-right]">
              <button type="button" className="hs-dropdown-toggle btn btn-icon size-8 border-default-300 hover:border-default-400/75" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <Icon icon="dots-vertical" className="text-sm" />
              </button>
              <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                <div className="space-y-0.5">
                  <a href="#" className="dropdown-item">
                    <Icon icon="report" />
                    View Full Weather Report
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="download" />
                    Export Data
                  </a>
                  <a href="#" className="dropdown-item">
                    <Icon icon="filter" />
                    Filter Countries
                  </a>
                  <div className="border-default-300 my-2.5 border-t" />
                  <a href="#" className="dropdown-item text-danger!">
                    <Icon icon="trash" />
                    Remove Widget
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body p-2.5">
          <SimpleBar className="px-3 h-106">
            {countryWeatherData.map((item, idx) => (
              <div className="grid grid-cols-3 items-center py-2.5" key={idx}>
                <div className="flex items-center">
                  <Image src={item.country.image} alt="USA flag" className="me-2.5 rounded-full size-6.5" />
                  <span className="font-semibold text-base">{item.country.name}</span>
                </div>
                <div className="text-end text-default-400">
                  <div className="font-semibold flex gap-1 justify-end">
                    {item.temperature} <span className="text-xs">(Feels {item.feelsLike})</span>
                  </div>
                  <div className="font-semibold text-xs flex gap-1 justify-end">
                    <Icon icon="droplet" /> {item.humidity} | <Icon icon="wind" /> {item.wind}
                  </div>
                </div>
                <div className={`${item.className} font-semibold text-end flex items-center justify-end gap-0.5`}>
                  <Icon icon={item.icon} /> {item.status}
                </div>
              </div>
            ))}
          </SimpleBar>
        </div>
      </div>
    </>
  )
}

export default WeatherByCountry
