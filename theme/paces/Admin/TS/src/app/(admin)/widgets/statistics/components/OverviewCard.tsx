import Icon from '@/components/wrappers/Icon'
import { progressData } from './data'

const OverviewCard = () => {
  return (
    <>
      {progressData.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-body">
            <div className="flex justify-between items-start">
              <div>
                <span className={`size-11 flex justify-center items-center border-3 ${item.variant} text-white rounded-full`}>
                  <Icon icon={item.icon} className="text-2xl" />
                </span>
              </div>
              <div className="text-end">
                <h4 className="text-lg font-semibold">{item.value}</h4>
                <p className="text-default-400">{item.title}</p>
              </div>
            </div>
            <div className="mt-7.5">
              <div className="flex justify-between mb-1.25">
                <span className="text-default-400 text-xs font-semibold">{item.progress.label}</span>
                <span className="text-default-400">{item.progress.value}%</span>
              </div>
              <div className="flex w-full h-1.5 bg-default-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                <div className={`progress-bar bg-${item.variant}`} style={{ width: `${item.progress.value}%` }} />
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default OverviewCard
