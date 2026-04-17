import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import { subscriberData } from './data'
const TotalSubscriber = () => {
  return (
    <div className="card h-full lg:col-span-1 md:col-span-2">
      <div className="card-body">
        <div className="flex justify-between items-start flex-wrap">
          <div>
            <h4 className="mb-2.5 text-default-400 text-[13px] uppercase font-bold">Total Subscribers</h4>
            <div className="flex items-center gap-2.5 mb-2.5 py-1.25">
              <div>
                <span className="size-9 bg-info text-white flex justify-center items-center rounded-full">
                  <Icon icon="mail" className="text-xl" />
                </span>
              </div>
              <h3 className="text-xl">
                {' '}
                <CountUp start={0} end={55.6} duration={1} suffix="k" decimals={2} />
              </h3>
              <span className="badge text-sm py-0 ms-auto bg-success/15 text-success">
                <Icon icon="arrow-up" className="align-middle" /> 4.87%
              </span>
            </div>
          </div>
          <div className="input-icon-group">
            <Icon icon="calendar" className="input-icon text-default-400" />
            <select defaultValue="last_90_days" className="form-select form-select-sm">
              <option value="All">All Time</option>
              <option value="today">Today</option>
              <option value="last_7_days">Last 7 Days</option>
              <option value="last_30_days">Last 30 Days</option>
              <option value="last_90_days">Last 90 Days</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
            </select>
          </div>
        </div>
        {subscriberData.map((item, idx) => (
          <div className={idx === 0 ? 'mt-2.5 pt-1.25' : 'mt-5'} key={idx}>
            <div className="flex items-center justify-between mb-2.5">
              <h5 className="text-sm font-semibold">{item.title}</h5>
              <div className="flex items-center text-sm">
                <span>
                  {' '}
                  <CountUp start={0} end={item.value} prefix="+" duration={10} />
                </span>
                <span className="flex items-center mx-6">
                  <Icon icon="circle-filled" className="text-default-200 size-2.5" />
                </span>
                <span>{item.progress}%</span>
              </div>
            </div>
            <div className="w-full h-1.25 bg-default-100 rounded mb-1.25">
              <div className={cn('h-full  rounded-s', item.className)} style={{ width: `${item.progress}%` }} aria-valuenow={item.progress} aria-valuemin={0} aria-valuemax={100} />
            </div>
          </div>
        ))}
        <div className="p-2.5 mt-5 border border-dashed border-default-300 rounded">
          <div className="md:flex items-center md:justify-between gap-2.5">
            <div className="flex items-center gap-2.5">
              <div>
                <div className="size-12 flex justify-center items-center rounded-full bg-warning/15 text-warning">
                  <Icon icon="medal" className="text-4xl" />
                </div>
              </div>
              <div>
                <h5 className="text-md font-semibold">Congratulations !...</h5>
                <p className="text-sm text-default-400">You&apos;ve reached a new subscriber milestone.</p>
              </div>
            </div>
            <div className="ms-auto">
              <h4 className="mt-1.25 font-semibold text-md">29.4k</h4>
              <span className="text-default-400 font-semibold text-xs">SUBSCRIBERS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TotalSubscriber
