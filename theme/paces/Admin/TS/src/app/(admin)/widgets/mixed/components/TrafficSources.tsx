import { CountUp } from '@/components/wrappers/CountUp'
import Icon from '@/components/wrappers/Icon'
import { trafficData } from './data'

const TrafficSources = () => {
  return (
    <>
      <div className="card h-full">
        <div className="card-header">
          <h4 className="card-title">Traffic Sources</h4>
        </div>
        <div className="card-body">
          <div className="flex justify-between gap-base mb-2.5">
            <div>
              <h3 className="mb-2.5 text-xl font-bold">
                <CountUp start={0} end={8975} duration={10} />
              </h3>
              <p className="mb-2.5 text-default-400 font-semibold">Right Now</p>
            </div>

            <div className="self-center">
              <ul className="leading-6">
                <li className="flex items-center gap-1.25">
                  <Icon icon="caret-right-filled" className="align-middle text-primary" />
                  <span className="text-default-400">Organic</span>
                </li>
                <li className="flex items-center gap-1.25">
                  <Icon icon="caret-right-filled" className="align-middle text-success" />
                  <span className="text-default-400">Direct</span>
                </li>
                <li className="flex items-center gap-1.25">
                  <Icon icon="caret-right-filled" className="align-middle" />
                  <span className="text-default-400">Campaign</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="mb-base h-2.5 w-full overflow-hidden rounded bg-default-200 flex">
            <div className="h-full bg-primary" style={{ width: '25%' }} role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100} />
            <div className="h-full bg-success" style={{ width: '50%' }} role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
            <div className="h-full bg-info" style={{ width: '15%' }} role="progressbar" aria-valuenow={25} aria-valuemin={100} aria-valuemax={100} />
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-default-100 align-middle">
                <tr className="uppercase text-2xs">
                  <th className="ps-4.5 pe-2 py-2 text-default-400">URL</th>
                  <th className="p-2 text-default-400 text-end">Views</th>
                  <th className="pe-4.5 ps-2 py-2 text-default-400 text-end">Uniques</th>
                </tr>
              </thead>
              <tbody>
                {trafficData.map((item, idx) => (
                  <tr className="hover:bg-default-100 border-b border-default-300" key={idx}>
                    <td className="ps-4.5 pe-2 py-2 underline">{item.pageLink}</td>
                    <td className="p-2 text-end">{item.views}k</td>
                    <td className="pe-4.5 ps-2 py-2 text-end">{item.unique}k</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-5">
            <a href="#!" className="hover:text-primary underline underline-offset-4 font-semibold flex items-center gap-1.25 justify-center">
              View all Links <Icon icon="link" />
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrafficSources
