import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import CampaignTable from './components/CampaignTable'
import { campaignStatData } from './components/data'
export const metadata = {
  title: 'Campaign',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Campaign" subtitle="CRM" />
      <div className="mb-2.5 grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-5">
        {campaignStatData.map((item, idx) => (
          <CampaignStatisticCard stat={item} key={idx} />
        ))}
      </div>
      <CampaignTable />
    </>
  )
}
export default Page
const CampaignStatisticCard = ({ stat }) => {
  const { change, description, value, prefix, suffix } = stat
  return (
    <div className="card">
      <div className="card-body">
        <div className="flex">
          <div className="flex-1">
            <div className="mb-5 flex items-center justify-between">
              <h5 className="text-lg">
                {prefix}
                {value}
                <small className="text-2xs">{suffix}</small>
              </h5>
              <div className="flex items-center gap-1.5">
                <span>{change}%</span>
                {change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
              </div>
            </div>
            <p className="text-default-400">{description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
