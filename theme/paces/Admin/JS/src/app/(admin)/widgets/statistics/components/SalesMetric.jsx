import Icon from '@/components/wrappers/Icon'
import { dealStatData } from './data'
const SalesMetric = () => {
  return (
    <>
      {dealStatData.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-body">
            <div className="flex gap-base">
              <div className="size-11 flex justify-center items-center bg-light text-xl rounded-full">
                <Icon icon={item.icon} className="text-xl" />
              </div>
              <div className="flex-1">
                <div className="mb-base flex justify-between items-center">
                  <h5 className="text-lg font-semibold">
                    {item.prefix}
                    {item.value}
                    &nbsp;<small className="text-2xs">{item.suffix}</small>
                  </h5>
                  <span className="flex items-center gap-1">
                    {item.change}%{item.change >= 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
                  </span>
                </div>
                <p className="text-default-400 mb-2.5 text-start">{item.title}</p>
                <div className={`flex w-full h-1.25 bg-default-200 rounded-full overflow-hidden`} role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className={`progress-bar ${item.variant}`}
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default SalesMetric
