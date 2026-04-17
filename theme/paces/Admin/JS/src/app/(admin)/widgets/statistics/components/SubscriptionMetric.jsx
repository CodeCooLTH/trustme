import { CountUp } from '@/components/wrappers/CountUp'
import { Icon as IconifyIcon } from '@iconify/react'
import { businessStatData } from './data'
const SubscriptionMetric = () => {
  return (
    <>
      {businessStatData.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-header justify-between border-0">
            <h5 className="card-title">{item.title}</h5>
            <span className={`badge ${item.badge.className}`}>{item.badge.label}</span>
          </div>
          <div className="card-body">
            <div className="flex justify-between items-center">
              <div>
                <span className={`size-15 flex justify-center items-center ${item.className} rounded-full text-2xl`}>
                  <IconifyIcon icon={item.icon} />
                </span>
              </div>
              <div className="text-end">
                <h3 className="mb-2.5 text-xl font-normal">
                  <CountUp start={0} duration={1} end={item.value} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
                </h3>
                <p className="text-default-400">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default SubscriptionMetric
