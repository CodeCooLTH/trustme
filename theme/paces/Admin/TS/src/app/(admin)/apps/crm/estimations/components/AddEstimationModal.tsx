import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddEstimationModal = () => {
  return (
    <div
      id="createEstimationModal"
      className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto"
      role="dialog"
      tabIndex={-1}
      aria-labelledby="createEstimationModalLabel"
    >
      <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
        <div className="card pointer-events-auto flex w-full flex-col">
          <div className="border-default-300 flex items-center justify-between border-b p-6">
            <h3 id="createEstimationModalLabel" className="text-sm">
              Create New Estimation
            </h3>
            <button type="button" aria-label="Close" data-hs-overlay="#createEstimationModal">
              <Icon icon="x" className="text-xl" />
            </button>
          </div>
          <div className="overflow-y-auto card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="estimationTitle" className="form-label">
                  Project Name
                </label>
                <input type="text" className="form-input" id="estimationTitle" placeholder="Enter project name" />
              </div>
              <div>
                <label htmlFor="clientName" className="form-label">
                  Client
                </label>
                <input type="text" className="form-input" id="clientName" placeholder="Enter client name" />
              </div>
              <div>
                <label htmlFor="estimatedValue" className="form-label">
                  Estimated Value (USD)
                </label>
                <input type="number" className="form-input" id="estimatedValue" placeholder="e.g. 25000" />
              </div>
              <div>
                <label htmlFor="estimator" className="form-label">
                  Estimated By
                </label>
                <input type="number" className="form-input" id="estimator" placeholder="Enter team member name" />
              </div>
              <div>
                <label htmlFor="proposalStatus" className="form-label">
                  Status
                </label>
                <select className="form-input" id="proposalStatus">
                  <option value="All">Select status</option>
                  <option value="Approved">Approved</option>
                  <option value="Pending">Pending</option>
                  <option value="Declined">Declined</option>
                  <option value="Sent">Sent</option>
                  <option value="In Review">In Review</option>
                </select>
              </div>
              <div>
                <label htmlFor="estimationTags" className="form-label">
                  Tags
                </label>
                <input type="text" className="form-input" id="estimationTags" placeholder="e.g. CRM, Mobile, API" />
              </div>
              <div>
                <label htmlFor="createdDate" className="form-label">
                  Created Date
                </label>
                <Flatpickr options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} className="form-input" id="createdDate" />
              </div>
              <div>
                <label htmlFor="expectedCloseDate" className="form-label">
                  Expected Close
                </label>
                <Flatpickr options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} className="form-input" id="expectedCloseDate" />
              </div>
            </div>
          </div>
          <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
            <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#createEstimationModal">
              Cancel
            </button>
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
              Save Estimation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEstimationModal
