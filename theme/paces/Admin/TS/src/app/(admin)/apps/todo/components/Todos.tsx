'use client'
import user1 from '@/assets/images/users/user-1.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import { useState } from 'react'
import { ReactSortable, Sortable } from 'react-sortablejs'
import TaskDetailModal from './TaskDetailModal'
import TaskItem from './TaskItem'
import { TaskType, taskData } from './data'

const Todos = () => {
  const [newTask, setNewTask] = useState({ title: '', dueDate: '', priority: 'Medium', status: 'New' })
  const [tasks, setTasks] = useState<TaskType[]>(taskData)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(taskData[0])

  const filteredTasks = tasks.filter((task) => (filterStatus === 'all' || task.status === filterStatus) && (filterPriority === 'all' || task.priority === filterPriority) && task.title.toLowerCase().includes(search.toLowerCase()))

  const handleAddTask = () => {
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: newTask.title,
        status: newTask.status.toLowerCase() as TaskType['status'],
        priority: newTask.priority.toLowerCase() as TaskType['priority'],
        due: newTask.dueDate,
        tasks: { done: 3, total: 6 },
        comments: 12,
        assignee: [
          { name: 'John Doe', image: user1 },
          { name: 'Jane Doe', image: user2 },
        ],
      },
    ])
    window.HSOverlay?.close('#addTaskModal')
    setNewTask({ title: '', dueDate: '', priority: 'medium', status: 'new' })
  }

  const sortableOptions: Partial<Sortable.Options> = {
    handle: '.sort-handle',
    ghostClass: 'sortable-item-ghost',
    group: 'nested',
    animation: 150,
    fallbackOnBody: true,
    swapThreshold: 0.65,
  }

  return (
    <>
      <div className="flex gap-1.25 h-[calc(100vh-200px)] overflow-hidden">
        <div className="card h-full">
          <div
            id="emailSidebaroffcanvas"
            className="hs-overlay hs-overlay-open:translate-x-0 fixed start-0 top-0 bottom-0 z-50 h-full w-80 -translate-x-full transform bg-card rounded transition-all duration-300 [--auto-close:lg] lg:static lg:end-auto lg:bottom-0 lg:block! lg:translate-x-0"
            role="dialog"
            tabIndex={-1}
            aria-label="Sidebar"
          >
            <SimpleBar className="card-body h-auto" data-simplebar>
              <a href="#" className="btn w-full bg-success text-white hover:bg-success-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addTaskModal" data-hs-overlay="#addTaskModal">
                Create New <Icon icon="plus" className="text-base" />
              </a>
              <div className="my-5">
                <label htmlFor="taskDate" className="mb-3">
                  Select Date
                </label>
                <Flatpickr type="hidden" id="taskDate" options={{ altFormat: 'F j, Y', dateFormat: 'F j, Y', defaultDate: 'today' }} className="form-input flatpickr-input bg-transparent!" placeholder="Select Date" />
              </div>
              <div className="mb-5">
                <label htmlFor="taskPriority" className="mb-3">
                  Select Priority
                </label>
                <select className="form-input" id="taskPriority" onChange={(e) => setFilterPriority(e.target.value)}>
                  <option value="all">All</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="mb-5">
                <label htmlFor="taskStatus" className="mb-3">
                  Select Status
                </label>
                <select className="form-input" id="taskStatus" onChange={(e) => setFilterStatus(e.target.value)}>
                  <option value="all">All</option>
                  <option value="new">New</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
            </SimpleBar>
          </div>
        </div>
        <div className="w-full lg:min-w-0 lg:flex-1">
          <div className="card h-full">
            <div className="card-header">
              <div className="flex items-center">
                <div className="block text-start lg:hidden me-3">
                  <button className="btn btn-icon border-default-300">
                    <Icon icon="menu-4" className="text-default-600 text-2xl" aria-haspopup="dialog" aria-expanded="false" aria-controls="emailSidebaroffcanvas" aria-label="Toggle navigation" data-hs-overlay="#emailSidebaroffcanvas" />
                  </button>
                </div>
                <h4 className="card-title">Tasks</h4>
              </div>
              <div className="input-icon-group">
                <Icon icon="search" className="input-icon" />
                <input type="text" className="form-input" placeholder="Search here..." value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
            </div>
            <SimpleBar className="h-[calc(100%-100px)]">
              <ReactSortable {...sortableOptions} list={tasks} setList={setTasks} className="nested-sortable-handle divide-default-300 divide-y table-wrapper">
                {filteredTasks.map((task, idx) => (
                  <TaskItem key={idx} task={task} onOpenDetail={() => setSelectedTask(task)} />
                ))}
              </ReactSortable>
              <div className="border-default-300 flex items-center justify-center gap-2.5 border-t md:pt-base">
                <strong>Loading...</strong>
                <div className="text-danger inline-block size-4 animate-spin rounded-full border-2 border-current border-t-transparent" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>

      {selectedTask && <TaskDetailModal task={selectedTask} />}

      <div id="addTaskModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addTaskModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="card-header py-5">
              <h3 id="addTaskModalLabel" className="text-md font-bold">
                Add New Task
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addTaskModal">
                <Icon icon="x" className="text-xl" />
              </button>
            </div>
            <div className="card-body overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-base">
                <div className="col-span-1 md:col-span-2">
                  <label className="form-label">Task Title</label>
                  <input type="text" className="form-input" name="taskTitle" placeholder="Enter task title" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, title: e.target.value })} required />
                </div>
                <div className="col-span-1">
                  <label htmlFor="DueDate" className="form-label">
                    Due Date
                  </label>
                  <Flatpickr
                    type="text"
                    className="form-input flatpickr-input bg-transparent!"
                    id="DueDate"
                    value={newTask.dueDate}
                    placeholder="Select date"
                    onChange={(_, dateStr) => {
                      setNewTask({ ...newTask, dueDate: dateStr })
                    }}
                    options={{ dateFormat: 'Y-m-d', altFormat: 'd M, Y', defaultDate: 'today' }}
                  />
                </div>
                <div className="col-span-1">
                  <label className="form-label">Priority</label>
                  <select className="form-input" name="taskPriority" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}>
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="form-label">Status</label>
                  <select className="form-input" name="taskStatus" value={newTask.status} onChange={(e) => setNewTask({ ...newTask, status: e.target.value })}>
                    <option>New</option>
                    <option>Pending</option>
                    <option>In Progress</option>
                    <option>Scheduled</option>
                    <option>Urgent</option>
                  </select>
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label className="form-label">Assign To</label>
                  <input type="text" className="form-input" name="taskAvatars" placeholder="Comma-separated user IDs" />
                  <small className="text-default-400 text-2xs">set @username</small>
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t border-dashed p-5">
              <button type="button" className="btn bg-secondary text-white hover:bg-secondary-hover" data-hs-overlay="#addTaskModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover" onClick={handleAddTask}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todos
