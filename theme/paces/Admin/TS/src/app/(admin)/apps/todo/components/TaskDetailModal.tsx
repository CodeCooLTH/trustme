import Icon from '@/components/wrappers/Icon'
import { toPascalCase } from '@/utils/helpers'
import Image from 'next/image'
import { TaskType } from './data'

const TaskDetailModal = ({ task }: { task: TaskType }) => {
  const { title, assignee, due, tasks, priority, status } = task
  return (
    <div id="taskDetailsModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="taskDetailsModalLabel">
      <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
        <div className="card pointer-events-auto flex w-full flex-col">
          <div className="card-header py-5">
            <h3 id="taskDetailsModalLabel" className="text-md">
              {title}
            </h3>
            <button type="button" aria-label="Close" data-hs-overlay="#taskDetailsModal">
              <Icon icon="x" className="text-xl" />
            </button>
          </div>
          <div className="card-body pb-0 overflow-y-auto">
            <div className="flex items-center mb-base">
              <div className="hs-tooltip [--placement:top] inline-block me-3">
                <Image src={assignee[0].image} alt="" className="rounded-full size-10" />
                <div className=" hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-1.5 px-2 bg-default-800 text-xs font-medium text-white rounded-md shadow-2xs" role="tooltip">
                  <span>Assigned by:</span>
                  {assignee[0].name}
                </div>
              </div>
              <div>
                <span className="font-semibold">Assigned by:</span>
                {assignee[0].name}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 mb-base">
              <div>
                <label className="uppercase block font-semibold text-xs text-default-400 mb-1.5">Status</label>
                <span className="badge border border-success text-success">{toPascalCase(status)}</span>
              </div>
              <div>
                <label className="uppercase block font-semibold text-xs text-default-400 mb-1.5">Priority</label>
                <span className="badge bg-primary/10 text-primary">Medium</span>
              </div>
              <div>
                <label className="uppercase block font-semibold text-xs text-default-400 mb-1.5">Due Date</label>
                <span className="font-semibold">Tomorrow</span>
              </div>
              <div>
                <label className="uppercase block font-semibold text-xs text-default-400 mb-1.5">Progress</label>
                <span className="font-medium">5/10</span>
              </div>
              <div>
                <label className="uppercase block font-semibold text-xs text-default-400 mb-1.5">Assigned To</label>
                <div className="flex items-center -space-x-2">
                  {assignee.map((assignee, idx) => (
                    <div className="hs-tooltip flex [--placement:top]" key={idx}>
                      <button className="hs-tooltip-toggle">
                        <Image src={assignee.image} className="block size-6 rounded-full transition hover:-translate-y-1" alt="image" />
                        <span className="hs-tooltip-content hs-tooltip-shown:visible hs-tooltip-shown:opacity-100 bg-secondary invisible absolute z-10 rounded-sm px-3 py-1.5 text-xs text-white opacity-0">{assignee.name}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-span-3">
                <label className="uppercase block font-semibold text-xs text-default-400 mb-1.5">Description</label>
                <p>Preparing and finalizing the product roadmap for the upcoming launch with clear milestones and dependencies.</p>
              </div>
            </div>
            <div className="bg-light/20 -mx-6 p-6 border-y border-dashed border-default-300">
              <div className="flex items-start">
                <Image className="me-3 size-8 rounded-full" src={assignee[0].image} alt="Generic placeholder image" />
                <div className="w-full">
                  <h5 className="mb-1.5">
                    <a href="#!" className="hover:text-primary font-semibold text-2xs">
                      {assignee[0].name}
                    </a>
                    <small className="text-default-400 font-normal float-end text-2xs">20 minutes ago</small>
                  </h5>
                  Loved your recent project! Really curious to see how you implemented the animations.
                  <br />
                  <a href="javascript:void(0);" className="text-default-400 inline-block mt-2">
                    <Icon icon="corner-up-left" />
                    Reply
                  </a>
                  <div className="flex items-start mt-6">
                    <Image src={assignee[1].image} className="size-8 rounded-full me-3" alt="Generic placeholder image" />
                    <div className="w-full">
                      <h5 className="mb-1.5">
                        <a href="#!" className="hover:text-primary font-semibold text-2xs">
                          {' '}
                          {assignee[1].name}
                        </a>
                        <small className="text-default-400 font-normal float-end text-2xs">12 minutes ago</small>
                      </h5>
                      I created something similar in Angular last month — would love to swap tips!
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start mt-6">
                <Image src={assignee[0].image} className="rounded-full size-8 me-3" alt="Generic placeholder image" height={31} />
                <div className="w-full">
                  <input type="text" id="simpleinput" className="form-input form-input-sm" placeholder="Add a comment..." />
                </div>
              </div>
            </div>
          </div>
          <div className=" border-default-300 flex items-center justify-end gap-x-2 border-t border-dashed p-5">
            <button type="button" className="btn bg-secondary text-white hover:bg-secondary-hover" data-hs-overlay="#taskDetailsModal">
              Close
            </button>
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
              Mark as Complete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailModal
