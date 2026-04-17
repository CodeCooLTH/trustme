import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import { topCountryData } from './data'
const TopCountries = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Top Countries</h4>
        </div>
        <div className="card-body">
          {topCountryData.map((item, idx) => (
            <div className="flex items-center gap-2.5 mb-5" key={idx}>
              <Image src={item.image} alt={item.name} className="size-4 rounded" />
              <h5 className="font-medium">
                <a href="#!" className="hover:text-primary">
                  {item.name}
                </a>
                <small className="text-default-400 text-xs">&nbsp;Pop: {item.population}</small>
              </h5>
              <div className="ms-auto">
                <div className="flex items-center gap-base text-end">
                  <p className="font-medium">{item.visitors}</p>
                  <p className={`badge badge-label ${item.change >= 0 ? (item.change === 0 ? 'bg-warning/10 text-warning' : 'bg-success/10 text-success') : 'bg-danger/10 text-danger'}`}>{item.change}%</p>
                </div>
              </div>
            </div>
          ))}
          <div className="text-center mt-5">
            <a href="#!" className="hover:text-primary underline underline-offset-4 font-semibold flex items-center gap-1.25 justify-center">
              View all Countries <Icon icon="world" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
export default TopCountries
