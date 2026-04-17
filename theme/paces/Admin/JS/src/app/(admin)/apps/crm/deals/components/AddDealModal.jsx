import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
const AddDealModal = () => {
  return (
    <div id="createDealModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="createDealModalLabel">
      <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
        <div className="border-default-300 pointer-events-auto flex w-full flex-col rounded-md border card">
          <div className="border-default-300 flex items-center justify-between border-b p-6">
            <h3 id="createDealModalLabel" className="text-sm">
              Create New Deal
            </h3>
            <button type="button" aria-label="Close" data-hs-overlay="#createDealModal">
              <Icon icon="x" className="text-xl" />
            </button>
          </div>
          <div className="overflow-y-auto card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="dealName" className="form-label">
                  Deal Name
                </label>
                <input type="text" className="form-input" id="dealName" placeholder="Enter deal name" required />
              </div>
              <div>
                <label htmlFor="companyName" className="form-label">
                  Company
                </label>
                <input type="text" className="form-input" id="companyName" placeholder="Enter company name" required />
              </div>
              <div>
                <label htmlFor="amount" className="form-label">
                  Amount (USD)
                </label>
                <input type="number" className="form-input" id="amount" placeholder="e.g. 100000" required />
              </div>
              <div>
                <label htmlFor="stage" className="form-label">
                  Stage
                </label>
                <select className="form-select" id="stage" required>
                  <option value="All">Select stage</option>
                  <option value="Qualification">Qualification</option>
                  <option value="Proposal Sent">Proposal Sent</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>
              <div>
                <label htmlFor="probability" className="form-label">
                  Probability (%)
                </label>
                <input type="number" className="form-input" id="probability" min="0" max="100" placeholder="e.g. 75" required />
              </div>
              <div>
                <label htmlFor="closingDate" className="form-label">
                  Expected Closing Date
                </label>
                <Flatpickr
                  options={{
                    defaultDate: 'today',
                    dateFormat: 'd M, Y',
                  }}
                  type="date"
                  className="form-input"
                  id="closingDate"
                  required
                />
              </div>
            </div>
          </div>
          <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
            <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#createDealModal">
              Cancel
            </button>
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
              Save Deal
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddDealModal
