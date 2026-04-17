import { CountUp } from '@/components/wrappers/CountUp'
import { Icon as IconifyIcon } from '@iconify/react'
import { miniStatData } from './data'
const AIStatsCard = () => {
  return (
    <>
      {miniStatData.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-body text-center">
            <IconifyIcon icon={item.icon} className={`text-4xl inline ${item.className}`}></IconifyIcon>
            <h3 className="text-xl mt-5 mb-1.25 font-bold">
              <CountUp start={0} end={item.value} duration={1} prefix={item.prefix} suffix={item.suffix} decimals={Number.isInteger(item.value) ? 0 : 2} />
            </h3>
            <p className="text-default-400 mb-4">{item.title}</p>
            <span className={`badge text-xs ${item.change >= 0 ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger'}`}>
              {item.change >= 0 ? <IconifyIcon icon="tabler:arrow-badge-up" /> : <IconifyIcon icon="tabler:arrow-badge-down" />}
              {item.change}%
            </span>
          </div>
        </div>
      ))}
    </>
  )
}
export default AIStatsCard
