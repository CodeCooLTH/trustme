import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import Image from 'next/image'
import { TaskType } from './data'

const TaskItem = ({ task, onOpenDetail }: { task: TaskType; onOpenDetail: () => void }) => {
  const { title, assignee, status, priority, due, tasks, comments, id } = task
  return (
    <div className="flex items-center gap-2.5 px-5 py-2.5">
      <Icon icon="grip-horizontal" className="sort-handle" />
      <input type="checkbox" className="form-checkbox rounded-full" id={`task${id}`} defaultChecked={status === 'completed'} />
      <span className="hover:text-primary font-medium" onClick={onOpenDetail} data-hs-overlay="#taskDetailsModal">
        {title}
      </span>
      <div className="ms-auto flex flex-wrap items-center gap-base justify-end">
        <div className="flex items-center -space-x-2">
          {assignee.map((assignee, idx) => (
            <div className="hs-tooltip flex [--placement:top]" key={idx}>
              <button className="hs-tooltip-toggle">
                <Image src={assignee.image} className="block size-6 rounded-full transition hover:-translate-y-1" alt="avatar" />
                <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 bg-secondary invisible absolute z-10 rounded-sm px-3 py-1.5 text-xs text-white opacity-0">{assignee.name}</span>
              </button>
            </div>
          ))}
        </div>
        <div>
          <span className={cn('badge font-semibold border', status === 'completed' ? 'border-success text-success' : status === 'urgent' ? 'border-danger text-danger' : status === 'pending' ? 'border-warning text-warning' : 'border-success text-success')}>
            {toPascalCase(status)}
          </span>
        </div>
        <ul className="flex items-center gap-3.25 text-end">
          <li className="flex items-center gap-1.75">
            <Icon icon="calendar" className="text-default-400 text-base" />
            <span className="font-semibold">{due}</span>
          </li>
          <li className="flex items-center gap-1.75">
            <Icon icon="list-details" className="text-default-400 text-base" />
            <span className="font-medium">
              {tasks.done}/{tasks.total}
            </span>
          </li>
          <li className="flex items-center gap-1.75">
            <Icon icon="messages" className="text-default-400 text-base" />
            <span className="font-medium">{comments}</span>
          </li>
        </ul>
        <span className={cn('badge ', priority === 'high' ? 'bg-danger/15 text-danger' : priority === 'medium' ? 'bg-warning/15 text-warning' : 'bg-success/15 text-success')}>{toPascalCase(priority)}</span>
      </div>
    </div>
  )
}

export default TaskItem
