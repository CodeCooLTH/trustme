import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { summaryData } from './data'

const ProjectStat = () => {
  return (
    <>
      {summaryData.map((item, idx) => (
        <div className="border-e border-dashed border-default-300" key={idx}>
          <div className="p-5">
            <h5 className="text-default-400 mb-2 text-xs uppercase" title="Number of Orders">
              {item.title}
            </h5>
            <div className="flex items-center justify-center gap-2.5 my-5">
              <div>
                <span className={`size-8 flex justify-center items-center ${item.className} rounded-full`}>
                  <Icon icon={item.icon} className="size-5.5" />
                </span>
              </div>
              <h3 className="text-xl font-bold">
                <CountUp start={0} end={item.value} duration={1} suffix={item.suffix} prefix={item.prefix} decimals={Number.isInteger(item.value) ? 0 : 2} />
              </h3>
            </div>
            <p className="text-default-400 flex justify-center">
              <span className={`${item.change >= 0 ? 'text-success' : 'text-danger'} me-2.5 flex items-center`}>
                {item.change >= 0 ? <Icon icon="chevron-up" /> : <Icon icon="chevron-down" />}
                {Math.abs(item.change)}%
              </span>
              <span className="text-nowrap">Since last month</span>
            </p>
          </div>
        </div>
      ))}
    </>
  )
}

export default ProjectStat
