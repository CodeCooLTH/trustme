'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import { Icon as IconifyIcon } from '@iconify/react'
import { financeStatData } from './data'

const Stat = () => {
  return (
    <>
      {financeStatData.map((item, idx) => {
        const options = item.chartOptions()
        return (
          <div className="card h-full" key={idx}>
            <div className="card-body">
              <IconifyIcon icon={item.icon} className={`text-4xl ${item.className}`} />
              <h3 className="text-xl font-bold mt-5 mb-1.25">
                <CountUp end={item.value} start={0} duration={1} prefix="$" suffix="k" decimals={2} decimal="." />
              </h3>
              <p className="text-default-400 text-sm mb-4">{item.title}</p>
              <span className={`badge  ${item.change > 6 ? 'bg-success/15 text-success' : ' bg-danger/15 text-danger'} text-xs `}>
                {item.change > 6 ? <IconifyIcon icon="tabler:arrow-badge-up" /> : <IconifyIcon icon="tabler:arrow-badge-down" />}
                {item.change}%
              </span>
              <ApexChart className="mt-3" getOptions={() => options} series={options.series} type="area" />
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Stat
