import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { statData } from './data'
const AIMetrics = () => {
  return (
    <>
      {statData.map((item, idx) => (
        <div className="card h-full" key={idx}>
          <div className="card-body">
            <div className="grid grid-cols-2 items-center">
              <div>
                <h5 className="text-default-400 mb-2 text-sm uppercase text-nowrap font-semibold" title="AI Model Requests">
                  {item.title}
                </h5>
                <div className="flex items-center gap-2.5 my-5">
                  <div>
                    <span className="size-9 bg-light flex justify-center items-center rounded-full">
                      <Icon icon={item.icon} className="size-5.5" />
                    </span>
                  </div>
                  <h3 className="text-xl font-bold">
                    <CountUp start={0} end={item.value} duration={2} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
                  </h3>
                </div>
                <p className="text-default-400 flex">
                  <span className={`me-2.5 flex items-center ${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
                    {item.change}% {item.change >= 0 ? <Icon icon="trending-up" className="ms-1.25" /> : <Icon icon="trending-down" className="ms-1.25" />}
                  </span>{' '}
                  <span className="text-nowrap">{item.changeText}</span>
                </p>
              </div>
              <div className="text-end">
                <p className="text-default-400">{item.target.label}</p>
                <h5 className="my-2.5 font-semibold">{item.target.value}</h5>
                <span className={`badge ${item.badge.className}`}>
                  {item.badge.label} <Icon icon={item.badge.icon} className="ms-1.25" />
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default AIMetrics
