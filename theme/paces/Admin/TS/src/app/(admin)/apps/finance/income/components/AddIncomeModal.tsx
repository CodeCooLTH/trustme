import user5 from '@/assets/images/users/user-5.jpg'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'

const AddIncomeModal = () => {
  return (
    <>
      <div id="incomeModal" className="hs-overlay pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="incomeModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="card-body border-default-300 flex items-center justify-between border-b">
              <h3 id="incomeModalLabel" className="font-bold">
                Add New Income
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#incomeModal">
                <span className="sr-only">Close</span>
                <Icon icon="x" className="size-5" />
              </button>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="incomeTitle" className="form-label">
                    Income Title
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="incomeTitle" className="form-input" placeholder="Enter income title" required />
                </div>

                <div className="col-span-1">
                  <label htmlFor="incomeAmount" className="form-label">
                    Amount ($)
                    <span className="text-danger">*</span>
                  </label>
                  <input type="number" step="0.01" id="incomeAmount" className="form-input" placeholder="Enter amount" required />
                </div>

                <div className="col-span-1">
                  <label htmlFor="incomeSource" className="form-label">
                    Income Source
                    <span className="text-danger">*</span>
                  </label>
                  <select id="incomeSource" className="form-input" required>
                    <option>Select source</option>
                    <option value="Sales">Sales</option>
                    <option value="Services">Services</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Investments">Investments</option>
                    <option value="Affiliate">Affiliate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="incomePayment" className="form-label">
                    Payment Type
                  </label>
                  <select id="incomePayment" className="form-input">
                    <option>Select payment type</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                    <option value="PayPal">PayPal</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="incomeClient" className="form-label">
                    Client Name
                  </label>
                  <input type="text" id="incomeClient" className="form-input" placeholder="Enter client or company name" />
                </div>

                <div className="col-span-1">
                  <label htmlFor="incomeStatus" className="form-label">
                    Status
                  </label>
                  <select id="incomeStatus" className="form-input">
                    <option value="Received">Received</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                <div className="col-span-1">
                  <label htmlFor="incomeDate" className="form-label">
                    Date &amp; Time
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y h:i K' }} required />
                </div>

                <div className="col-span-1">
                  <label htmlFor="incomeReceivedBy" className="form-label">
                    Received By
                  </label>
                  <div className="flex items-center gap-3">
                    <Image src={user5} alt="user" className="size-6 rounded-full" />
                    <input type="text" id="incomeReceivedBy" className="form-input" placeholder="Enter receiver name" />
                  </div>
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <label htmlFor="incomeNotes" className="form-label">
                    Notes
                  </label>
                  <textarea id="incomeNotes" className="form-textarea" rows={3} placeholder="Optional remarks or description" />
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#incomeModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" className="me-1" />
                Save Income
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddIncomeModal
