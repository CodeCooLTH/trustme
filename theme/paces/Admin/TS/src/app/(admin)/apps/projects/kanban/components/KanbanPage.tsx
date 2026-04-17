'use client'
import Icon from '@/components/wrappers/Icon'
import Board from './Board'
import { kanbanSectionsData, KanbanTaskData } from './data'
import Modals from './Modals'
import { KanbanProvider } from './useKanbanContext'

const KanbanPage = () => {
  return (
    <KanbanProvider sectionsData={kanbanSectionsData} tasksData={KanbanTaskData}>
      <div className="card h-[calc(100vh-200px)]">
        <div className="card-header">
          <div className="flex gap-base flex-wrap items-center">
            <div className="input-icon-group">
              <Icon icon="search" className="input-icon" />
              <input type="text" className="form-input" placeholder="Search by task name, assignee..." />
            </div>
            <div className="flex items-center gap-2.5">
              <div className="input-icon-group">
                <Icon icon="users" className="input-icon" />
                <select className="form-select">
                  <option>Team</option>
                  <option value="Product">Product</option>
                  <option value="Engineering">Engineering</option>
                  <option value="UX Design">UX Design</option>
                  <option value="Customer Success">Customer Success</option>
                  <option value="Support">Support</option>
                </select>
              </div>
              <div className="input-icon-group">
                <Icon icon="flag" className="input-icon" />
                <select className="form-select">
                  <option>Priority</option>
                  <option value="Normal">Normal</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div className="input-icon-group">
                <Icon icon="circle-check" className="input-icon" />
                <select className="form-select">
                  <option>Status</option>
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Review">Review</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
          <div>
            <button className="btn bg-primary text-white hover:bg-primary-hover" aria-haspopup="dialog" aria-expanded="false" aria-controls="addTaskModal" data-hs-overlay="#addTaskModal">
              <Icon icon="plus" />
              Add New Card
            </button>
          </div>
        </div>
        <div className="card-body p-0">
          <Board />
        </div>
      </div>
      <Modals />
    </KanbanProvider>
  )
}

export default KanbanPage
