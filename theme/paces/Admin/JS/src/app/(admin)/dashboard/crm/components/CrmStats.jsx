'use client'

import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { crmStatData } from './data'
const CrmStats = () => {
  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-base mb-base">
      {crmStatData.map((stat, idx) => (
        <StatisticCard stat={stat} key={idx} />
      ))}
    </div>
  )
}
export default CrmStats
const StatisticCard = ({ stat }) => {
  const { change, label, title, value, suffix, prefix, icon, chartOptions } = stat
  return (
    <div className="card">
      <div className="card-body">
        <div className="grid grid-cols-2 items-center">
          <div>
            <h5 className="text-default-400 text-xs uppercase mb-2" title="Leads Generated">
              {title}
            </h5>
            <div className="my-5">
              <div className="flex items-center gap-2.5">
                <div className="size-9 rounded-full bg-light/80 flex justify-center items-center">
                  <Icon icon={icon} className="size-5.5" />
                </div>
                <h3 className="text-xl font-bold">
                  <CountUp end={value} start={0} duration={1} prefix={prefix} suffix={suffix} decimals={2} decimal="." />
                </h3>
              </div>
            </div>
            <p className="flex items-center gap-1">
              <span className={cn('me-2.5 flex items-center', change > 0 ? 'text-success' : 'text-danger')}>
                {Math.abs(change)}% {change > 0 ? <Icon icon="trending-up" className="ms-1.25" /> : <Icon icon="trending-down" className="ms-1.25" />}
              </span>
              <span className="text-default-400">{label}</span>
            </p>
          </div>
          <div>
            <div id="leads-generated-chart" className={chartOptions().chart?.type === 'radialBar' ? 'flex justify-end' : 'text-end'}>
              <ApexChart getOptions={chartOptions} series={chartOptions().series} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
