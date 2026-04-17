import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import EstimationsTable from './components/EstimationsTable'
import { estimationStatData } from './components/data'
export const metadata = {
  title: 'Estimations',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Estimations" subtitle="CRM" />
      <div className="mb-2.5 grid grid-cols-1 gap-2.5 md:grid-cols-2 lg:grid-cols-5">
        {estimationStatData.map((stat, idx) => (
          <EstimationStatisticCard stat={stat} key={idx} />
        ))}
      </div>
      <EstimationsTable />
    </>
  )
}
export default Page
const EstimationStatisticCard = ({ stat }) => {
  const { value, change, description, prefix, suffix } = stat
  return (
    <div className="card">
      <div className="card-body">
        <div className="mb-5 flex justify-between">
          <h5 className="text-lg">
            {prefix}
            {value} <small className="text-2xs">{suffix}</small>
          </h5>
          <span className="flex items-center gap-1">
            {change > 0 ? '+' : ''}
            {change}%{change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
          </span>
        </div>
        <p className="text-default-400">{description}</p>
      </div>
    </div>
  )
}
