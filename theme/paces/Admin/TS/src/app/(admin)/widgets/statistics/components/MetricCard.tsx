import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { metricData } from './data'

const MetricCard = () => {
  return (
    <>
      {metricData.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-body flex justify-between items-center">
            <div>
              <h3 className="mb-2.5 text-xl font-normal">
                <CountUp start={0} end={item.value} duration={1} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
              </h3>
              <p className="text-default-400">{item.title}</p>
            </div>
            <div>
              <span className={`size-15 flex justify-center items-center ${item.className} rounded-full`}>
                <Icon icon={item.icon} className="text-2xl" />
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default MetricCard
