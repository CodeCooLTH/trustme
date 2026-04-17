import PageBreadcrumb from '@/components/PageBreadcrumb'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Create Task' }
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Create Task" subtitle="Tasks" />
      <div className="container">
        <div className="card">
          <div className="card-body">
            <form>
              <div className="mb-5">
                <label htmlFor="taskTitle" className="mb-2 block">
                  Task Title
                  <span className="text-danger">*</span>
                </label>
                <input type="text" className="form-input" id="taskTitle" placeholder="Enter task title" required />
              </div>
              <div className="mb-5">
                <label htmlFor="taskDescription" className="mb-2 block">
                  Description
                </label>
                <textarea className="form-textarea" id="taskDescription" rows={4} placeholder="Write a short task description..." defaultValue={''} />
              </div>
              <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-base">
                <div>
                  <label htmlFor="startDate" className="mb-2 block">
                    Start Date
                  </label>
                  <Flatpickr options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} className="form-input" id="startDate" />
                </div>
                <div>
                  <label htmlFor="dueDate" className="mb-2 block">
                    Due Date
                  </label>
                  <Flatpickr options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} className="form-input" id="dueDate" />
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="assignedTo" className="mb-2 block">
                  Assigned To
                </label>
                <select className="form-input" id="assignedTo">
                  <option>Choose member</option>
                  <option value={1}>Cruise</option>
                  <option value={2}>Maria</option>
                  <option value={3}>Chris</option>
                  <option value={4}>Alex</option>
                </select>
              </div>
              <div className="mb-5 grid grid-cols-1 md:grid-cols-2 gap-base">
                <div>
                  <label htmlFor="priority" className="mb-2 block">
                    Priority
                  </label>
                  <select className="form-input" id="priority">
                    <option>Select priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="task-status" className="mb-2 block">
                    Status
                  </label>
                  <select className="form-input" id="task-status">
                    <option value="New">New</option>
                    <option value="In Progress">In Progress</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>
              <div className="mb-5">
                <label htmlFor="fileUpload" className="mb-2 block">
                  Attachment
                </label>
                <input type="file" name="file-input" id="fileUpload" className="form-input" />
              </div>
              <div className="mt-7.5 flex justify-end">
                <button type="reset" className="btn bg-light me-2.5 hover:text-primary">
                  Cancel
                </button>
                <button type="submit" className="btn bg-primary text-white hover:bg-primary-hover">
                  <Icon icon="plus" className="me-1" />
                  Create Task
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
