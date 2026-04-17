import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { visitorData } from './data'

const TotalVisitors = () => {
  return (
    <>
      <div className="card h-full">
        <div className="card-body">
          <div className="flex justify-between items-start flex-wrap">
            <div>
              <h4 className="text-sm mb-2.5 uppercase text-default-400 font-bold">Total Visitors</h4>
              <div className="flex items-center gap-2.5 mb-2.5 py-1.25">
                <div>
                  <span className="size-9 bg-secondary text-white flex justify-center items-center rounded-full">
                    <Icon icon="eye" className="text-xl" />
                  </span>
                </div>
                <h3 className="text-xl">
                  <CountUp start={0} end={82.3} duration={1} suffix="M" decimals={2} />
                </h3>
                <span className="badge text-sm ms-auto bg-success/15 text-success">
                  <Icon icon="arrow-up" className="align-middle" /> 6.84%
                </span>
              </div>
            </div>
            <div className="input-icon-group">
              <Icon icon="calendar" className="input-icon text-default-400" />
              <select className="form-select form-select-sm">
                <option value="All">All Time</option>
                <option value="today">Today</option>
                <option value="last_7_days">Last 7 Days</option>
                <option value="last_30_days">Last 30 Days</option>
                <option value="last_90_days" defaultValue={''}>
                  Last 90 Days
                </option>
                <option value="this_month">This Month</option>
                <option value="last_month">Last Month</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between gap-1.25">
            <div style={{ width: '69.40%' }}>
              <p className="mb-1.25 mt-2.5 text-default-400 uppercase text-sm font-medium">Mobile Phone</p>
              <h3 className="font-normal mb-2.5 text-lg">69.40%</h3>
              <div className="w-full h-3 bg-default-200 rounded-s overflow-hidden mb-1.25">
                <div className="h-full bg-secondary w-full" />
              </div>
              <p className="text-default-400">41,927 Sessions</p>
            </div>
            <div style={{ width: '30.60%' }}>
              <p className="mb-1.25 mt-2.5 text-default-400 uppercase text-sm font-medium">Desktop</p>
              <h3 className="font-normal mb-2.5 text-lg">30.60%</h3>
              <div className="w-full h-3 bg-default-200 rounded-e overflow-hidden mb-1.25">
                <div className="h-full bg-info w-full" />
              </div>
              <p className="text-default-400">18,476 Sessions</p>
            </div>
          </div>
          <div className="overflow-x-auto mt-5 -mb-2.5">
            <table className="table table-sm whitespace-nowrap table-borderless">
              <thead className="bg-default-100 text-2xs uppercase thead-sm">
                <tr>
                  <th className="p-2 text-start">Goal</th>
                  <th className="p-2 text-start">Completed</th>
                  <th className="p-2 text-start">Target</th>
                  <th className="p-2 text-start">Progress</th>
                </tr>
              </thead>
              <tbody>
                {visitorData.map((item, idx) => (
                  <tr key={idx}>
                    <td>{item.title}</td>
                    <td>{item.completed}</td>
                    <td>{item.target}</td>
                    <td>{item.progress}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default TotalVisitors
