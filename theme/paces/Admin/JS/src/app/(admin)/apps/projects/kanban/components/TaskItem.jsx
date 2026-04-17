import Icon from '@/components/wrappers/Icon'
import { cn, toPascalCase } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { useKanbanContext } from './useKanbanContext'
const TaskItem = ({ item }) => {
  const { newTaskModal, taskForm } = useKanbanContext()
  return (
    <>
      <div className="card border border-light hover:shadow-lg">
        <div className="card-body">
          <div className="mb-3 flex items-center justify-between">
            <div>
              <span className={cn('badge badge-label font-semibold', item.priority === 'high' ? 'bg-danger/15 text-danger' : item.priority === 'medium' ? 'bg-warning/15 text-warning' : item.priority === 'urgent' ? 'bg-danger text-white' : 'bg-success/15 text-success')}>
                {toPascalCase(item.priority)}
              </span>
            </div>
            <div className="relative ms-auto -mt-3">
              <div className="hs-dropdown relative inline-flex [--placement:bottom-right]">
                <button type="button" className="hs-dropdown-toggle btn btn-icon size-7.75 text-default-400 hover:bg-default-100" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                  <Icon icon="dots-vertical" className="text-base" />
                </button>
                <div className="hs-dropdown-menu" role="menu" aria-orientation="vertical">
                  <div className="space-y-0.5">
                    <Link className="dropdown-item" href="">
                      <Icon icon="share" />
                      Share
                    </Link>
                    <Link className="dropdown-item" href="" onClick={() => newTaskModal.toggle(item.sectionId, item.id)}>
                      <Icon icon="edit" />
                      Edit
                    </Link>
                    <Link className="dropdown-item text-danger" href="" onClick={() => taskForm.deleteRecord(item.id)}>
                      <Icon icon="trash" />
                      Delete
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h5 className="mb-2">
            <Link href="" className="hover:text-primary" draggable="false">
              {item.title}
            </Link>
          </h5>
          <div className="flex items-center mb-3">
            <Image src={item.assignee.avatar} className="rounded-full me-3" width={28} height={28} alt="" draggable="false" />
            <span className="text-default-400 font-medium">{item.assignee.name}</span>
          </div>
          <div className="flex justify-between -mb-1.5 items-center text-default-400">
            <span>4 Days</span>
            <span className="flex items-center gap-1">
              <Icon icon="list-check" /> 3
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="link" /> 2
            </span>
            <span className="flex items-center gap-1">
              <Icon icon="messages" /> 9
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
export default TaskItem
