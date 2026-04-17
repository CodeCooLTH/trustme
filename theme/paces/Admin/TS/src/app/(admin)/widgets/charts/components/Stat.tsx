'use client'
import ApexChart from '@/components/wrappers/ApexChart'
import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { statData } from './data'

const Stat = () => {
  return (
    <>
      {statData.map((item, idx) => {
        const options = item.chartOptions()
        return (
          <div className="card h-full" key={idx}>
            <div className="card-body">
              <div className="grid grid-cols-2 gap-base items-center">
                <div>
                  <h5 className="text-default-400 text-sm uppercase text-truncate font-semibold" title={item.title}>
                    {item.title}
                  </h5>
                  <div className="flex items-center gap-2.5 my-5">
                    <div>
                      <span className="size-9 bg-light flex justify-center items-center rounded-full">
                        <Icon icon={item.icon} className="size-5.5" />
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">
                      <CountUp end={item.value} start={0} duration={1} prefix="$" suffix="k" decimals={2} decimal="." />
                    </h3>
                  </div>
                  <p className="text-default-400 flex items-center">
                    <span className={`me-2.5 flex items-center gap-1.25 text-sm ${item.change >= 0 ? 'text-success' : 'text-danger'}`}>
                      {item.change >= 0 ? '' : ''}
                      {Math.abs(item.change)}%{item.change >= 0 ? <Icon icon="trending-up" className="ms-1" /> : <Icon icon="trending-down" className="ms-1" />}
                    </span>
                    <span className="text-nowrap text-default-400">{item.label}</span>
                  </p>
                </div>
                <div className="text-end">
                  <ApexChart getOptions={() => options} series={options.series} />
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default Stat
