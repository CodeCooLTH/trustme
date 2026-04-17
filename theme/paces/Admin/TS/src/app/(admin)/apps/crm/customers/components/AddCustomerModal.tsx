import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddCustomerModal = () => {
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
              Add New Customer
            </h3>
            <button type="button" aria-label="Close" data-hs-overlay="#createEstimationModal">
              <Icon icon="x" className="text-xl" />
            </button>
          </div>
          <div className="overflow-y-auto card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="customerName" className="form-label">
                  Customer Name
                </label>
                <input type="text" className="form-input" id="customerName" placeholder="Enter full name" />
              </div>
              <div>
                <label htmlFor="email" className="form-label">
                  Client
                </label>
                <input type="email" className="form-input" id="email" placeholder="Enter email" />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">
                  Phone Number
                </label>
                <input type="text" className="form-input" id="phone" placeholder="e.g. +1 234 567 8900" />
              </div>
              <div>
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input type="text" className="form-input" id="company" placeholder="Company name" />
              </div>
              <div>
                <label htmlFor="country" className="form-label">
                  Country
                </label>
                <select className="form-input" id="country">
                  <option value="">Select country</option>
                  <option value="US">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="IN">India</option>
                  <option value="CA">Canada</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="JP">Japan</option>
                  <option value="BR">Brazil</option>
                  <option value="EG">Egypt</option>
                </select>
              </div>
              <div>
                <label htmlFor="customerType" className="form-label">
                  Customer Type
                </label>
                <select className="form-input" id="customerType">
                  <option value="">Select type</option>
                  <option value="Lead">Lead</option>
                  <option value="Prospect">Prospect</option>
                  <option value="Client">Client</option>
                </select>
              </div>
              <div>
                <label htmlFor="Accostatus" className="form-label">
                  Account Status
                </label>
                <select className="form-input" id="Accostatus">
                  <option value="">Select status</option>
                  <option value="Active">Active</option>
                  <option value="Verification Pending">Verification Pending</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>
              <div>
                <label htmlFor="joinedDate" className="form-label">
                  Joined Date
                </label>
                <Flatpickr options={{ dateFormat: 'd M, Y', defaultDate: 'today' }} className="form-input" id="joinedDate" />
              </div>
            </div>
          </div>
          <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
            <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#createEstimationModal">
              Cancel
            </button>
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
              Add Customer
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddCustomerModal
