import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { PipelineTaskType } from './data'

const TaskItem = ({ item }: { item: PipelineTaskType }) => {
  return (
    <div className="card shadow hover:shadow-lg">
      <div className="card-body">
        <div className="mb-2.5 flex items-start">
          <div>
            <h5>
              <Link href="" className="hover:text-primary">
                {item.title}
              </Link>
            </h5>
            <small className="text-default-400">{item.company}</small>
          </div>
          <div className="relative ms-auto">
            <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
              <button type="button" className="hs-dropdown-toggle btn size-7.75 text-default-400 hover:bg-light" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                <Icon icon="dots-vertical" className="text-base" />
              </button>
              <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                <a className="dropdown-item" href="">
                  <Icon icon="share" />
                  Share
                </a>
                <a className="dropdown-item" href="">
                  <Icon icon="edit" />
                  Edit
                </a>
                <a className="dropdown-item" href="">
                  <Icon icon="user-check" />
                  Assign
                </a>
                <a className="dropdown-item text-danger" href="#">
                  <Icon icon="trash" />
                  Delete
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Image src={item.user} className="size-6 rounded-full" alt="Mark Allen" />
            <span className="text-default-400 font-medium">{item.userName}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Icon icon="calendar-clock" className={cn(item.status === 'lost' ? 'text-danger' : item.status === 'won' ? 'text-success' : '')} />
            <h5 className="font-medium">{item.date}</h5>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-sm">
            {(item.status === 'lead' || item.status === 'negotiation') && (
              <>
                <span className="flex items-center gap-1.5">
                  <Icon icon="message" className="text-default-400 text-base" />
                  {item.messages}
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon icon="list-check" className="text-default-400 text-base" />
                  {item.tasks}
                </span>
              </>
            )}

            {item.status === 'lost' && (
              <span className="flex items-center gap-2.5">
                <Icon icon="x" className="text-danger text-base" />
                Lost
              </span>
            )}

            {item.status === 'won' && (
              <span className="flex items-center gap-2.5">
                <Icon icon="medal" className="text-success text-base" />
                Won
              </span>
            )}
          </div>

          <span className="text-default-700 font-semibold">${item.amount}</span>
        </div>
      </div>
    </div>
  )
}

export default TaskItem
