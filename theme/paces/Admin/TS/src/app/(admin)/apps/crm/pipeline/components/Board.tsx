import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import { cn } from '@/utils/helpers'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd'
import Link from 'next/link'
import TaskItem from './TaskItem'
import { usePipelineContext } from './usePipelineContext'

const Board = () => {
  const { onDragEnd, sections, getAllTasksPerSection } = usePipelineContext()
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex items-stretch overflow-x-auto">
        {sections.map((section) => (
          <Droppable key={section.id} droppableId={section.id}>
            {(provided) => (
              <div className={cn('w-85 min-w-84 border-e border-dashed border-default-300', section.className)} ref={provided.innerRef}>
                <div className="flex items-center px-5 py-2.5">
                  <h5>
                    {' '}
                    {section.title} ({getAllTasksPerSection(section.id).length})
                  </h5>
                  <Link href="" className="btn ms-auto size-7.75 rounded-full bg-primary text-white hover:bg-primary-hover">
                    <Icon icon="plus" className="text-base text-white" />
                  </Link>
                </div>
                <SimpleBar className="h-160 px-2.5" data-simplebar data-simplebar-md>
                  <ul className="space-y-2.5">
                    {getAllTasksPerSection(section.id).map((task, idx) => (
                      <Draggable draggableId={task.id} index={idx} key={task.id}>
                        {(provided) => (
                          <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                            <TaskItem item={task} />
                          </li>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </ul>
                </SimpleBar>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  )
}

export default Board
