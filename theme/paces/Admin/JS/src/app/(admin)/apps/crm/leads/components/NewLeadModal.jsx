import Icon from '@/components/wrappers/Icon'
const NewLeadModal = () => {
  return (
    <div id="addLeadModal" className="hs-overlay pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addLeadModalLabel">
      <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
        <div className="border-default-300 pointer-events-auto flex w-full flex-col rounded-md border card">
          <div className="border-default-300 flex items-center justify-between border-b p-6">
            <h3 id="addLeadModalLabel" className="text-sm">
              Add New Lead
            </h3>
            <button type="button" aria-label="Close" data-hs-overlay="#addLeadModal">
              <Icon icon="x" className="text-xl" />
            </button>
          </div>
          <div className="overflow-y-auto card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="leadName" className="form-label">
                  Lead Name
                </label>
                <input type="text" className="form-input" id="leadName" placeholder="Enter Lead name" />
              </div>
              <div>
                <label htmlFor="companyName" className="form-label">
                  Company
                </label>
                <input type="text" className="form-input" id="companyName" placeholder="Enter company name" />
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input type="email" className="form-input" id="email" placeholder="Enter email" />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone
                </label>
                <input type="tel" className="form-input" id="phone" placeholder="+1 234-567-8910" />
              </div>
              <div>
                <label htmlFor="amount" className="form-label">
                  Amount (USD)
                </label>
                <input type="number" className="form-input" id="amount" placeholder="e.g. 50000" />
              </div>
              <div>
                <label htmlFor="Leadstatus" className="form-label">
                  Status
                </label>
                <select className="form-input" id="Leadstatus">
                  <option value="All">Select status</option>
                  <option>In Progress</option>
                  <option>Proposal Sent</option>
                  <option>Follow Up</option>
                  <option>Pending</option>
                  <option>Negotiation</option>
                  <option>Rejected</option>
                </select>
              </div>
              <div>
                <label htmlFor="assignedTo" className="form-label">
                  Assign To
                </label>
                <select className="form-input" id="assignedTo">
                  <option value="All">Select user</option>
                  <option value={1}>Emily Carter</option>
                  <option value={2}>Rohan Iyer</option>
                  <option value={3}>Sara Kim</option>
                  <option value={4}>Kevin Nguyen</option>
                </select>
              </div>
            </div>
          </div>
          <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
            <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addLeadModal">
              Cancel
            </button>
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
              Save Lead
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NewLeadModal
