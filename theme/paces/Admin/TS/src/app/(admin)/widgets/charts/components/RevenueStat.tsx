'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import clsx from 'clsx'
import { revenueStatisticData } from './data'

const RevenueStat = () => {
  return (
    <>
      {revenueStatisticData.map((item, index) => {
        const isReverse = item.title === 'Total Expenses' || item.title === 'Cash Flow'
        return (
          <div className="card" key={index}>
            <div className="card-header flex py-3.75 px-5 border-0 justify-between items-center">
              <h5 className="card-title mb-0">{item.title}</h5>
              <span className={clsx('badge', item.className)}>{item.change}</span>
            </div>
            <div className="card-body">
              <div className={clsx('flex justify-between items-center', isReverse && 'flex-row-reverse')}>
                <div className={clsx(isReverse && 'text-end ms-3')}>
                  <h3 className="mb-1.25 font-normal text-xl">
                    <CountUp start={0} end={item.value} duration={1} suffix={item.suffix} prefix={item.prefix} />
                  </h3>
                  <p className="text-default-400">{item.label}</p>
                </div>
                <div className="text-end w-1/2">{item.chartOptions && <ApexChart type={item.chartOptions().chart?.type} height={60} getOptions={item.chartOptions} series={item.chartOptions().series} />}</div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default RevenueStat
