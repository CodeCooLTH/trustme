'use client'
import Icon from '@/components/wrappers/Icon'
import { Controller } from 'react-hook-form'
import { KanbanTaskData } from './data'
import { useKanbanContext } from './useKanbanContext'

export type CategoryOption = {
  name: string
  variant: string
}

const Modals = () => {
  const { newTaskModal, taskForm, taskFormData, sectionFormData, sectionModal, sectionForm } = useKanbanContext()
  return (
    <>
      <div id="addTaskModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addTaskModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-lg lg:max-w-lg">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 flex items-center justify-between border-b p-5">
              <h3 id="addTaskModalLabel" className="text-sm">
                Add New Task
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addTaskModal">
                <span data-icon="close" className="size-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-6">
              <form id="taskForm" onSubmit={taskFormData ? taskForm.editRecord : taskForm.newRecord}>
                <div className="mb-base">
                  <label className="form-label">Task Title</label>
                  <Controller control={taskForm.control} name="title" rules={{ required: 'Task title is required' }} render={({ field }) => <input type="text" className="form-input" placeholder="Enter task name..." required {...field} value={field.value ?? ''} />} />
                </div>
                <div className="mb-base">
                  <label className="form-label">Assign To</label>
                  <Controller
                    control={taskForm.control}
                    name="assignee"
                    rules={{ required: 'Please select an assignee' }}
                    render={({ field }) => (
                      <select
                        className="form-select"
                        value={field.value?.name || ''}
                        onChange={(e) => {
                          const selected = KanbanTaskData.find((m) => m.assignee.name === e.target.value)?.assignee
                          field.onChange(selected)
                        }}
                      >
                        <option disabled>Select user</option>
                        {KanbanTaskData.slice(0, 5).map((member, idx) => (
                          <option key={idx} value={member.assignee.name}>
                            {member.assignee.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div className="mb-base">
                  <label className="form-label">Priority</label>
                  <Controller
                    control={taskForm.control}
                    name="priority"
                    render={({ field }) => (
                      <select className="form-select" {...field}>
                        <option value="Normal">Normal</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Urgent">Urgent</option>
                      </select>
                    )}
                  />
                </div>

                <div className="mb-base">
                  <label className="form-label">Description</label>
                  <Controller control={taskForm.control} name="description" render={({ field }) => <textarea className="form-textarea" rows={3} placeholder="Brief details..." defaultValue={''} {...field} />} />
                </div>
              </form>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addTaskModal">
                Cancel
              </button>
              <button type="submit" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="check" />
                {taskFormData ? 'Update Task' : 'Save Task'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Modal show={sectionModal.open} aria-hidden={sectionModal.open} onHide={sectionModal.toggle} tabIndex={-1} role="dialog">
        <form onSubmit={sectionFormData ? sectionForm.editRecord : sectionForm.newRecord}>
          <ModalHeader closeButton>
            <ModalTitle className="m-0">{sectionFormData ? 'Edit New Section' : 'Add New Section'}</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Row>
              <Col sm={12}>
                <FormLabel>Title</FormLabel>
                <Controller
                  control={sectionForm.control}
                  name="sectionTitle"
                  rules={{ required: 'Task title is required' }}
                  render={({ field }) => (
                    <>
                      <FormControl {...field} value={field.value ?? ''} type="text" placeholder="Enter task title" />
                    </>
                  )}
                />
              </Col>
            </Row>
          </ModalBody>
          <ModalFooter>
            <Button variant="primary" type="submit">
              {sectionFormData ? 'Update' : 'Save'}
            </Button>
            <Button variant="danger" onClick={() => sectionModal.toggle()} type="button">
              Close
            </Button>
          </ModalFooter>
        </form>
      </Modal> */}
    </>
  )
}

export default Modals
