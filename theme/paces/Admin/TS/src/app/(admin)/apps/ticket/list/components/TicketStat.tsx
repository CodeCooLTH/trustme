import Icon from '@/components/wrappers/Icon'
import { TicketStatType } from './data'

const TicketStat = ({ list }: { list: TicketStatType }) => {
  const { icon, value, unit, change, title } = list
  return (
    <>
      <div className="card">
        <div className="card-body">
          <div className="flex items-start gap-base">
            <div className="size-11 bg-primary/15 rounded-full flex justify-center items-center">
              <Icon icon={icon} className="text-xl text-primary" />
            </div>
            <div className="grow">
              <div className="mb-2.5 flex justify-between items-center">
                <h3 className="text-lg">
                  {value}
                  {unit && <small className="text-2xs">{unit}</small>}
                </h3>
                <div className="flex items-center gap-1">
                  {change > 0 ? '+' : ''}
                  {change}%{change > 0 ? <Icon icon="arrow-up" className="text-success" /> : <Icon icon="arrow-down" className="text-danger" />}
                </div>
              </div>
              <p className="text-default-400 text-sm">
                <span>{title}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TicketStat
