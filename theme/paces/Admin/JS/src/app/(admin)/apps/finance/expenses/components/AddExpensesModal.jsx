import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
const AddExpensesModal = () => {
  return (
    <>
      <div id="addExpenseModal" className="hs-overlay pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addExpenseModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="card-body border-default-300 bg-default-100 flex items-center justify-between rounded-t border-b">
              <h3 id="addExpenseModalLabel" className="font-bold">
                Add New Warehouse
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addExpenseModal">
                <span className="sr-only">Close</span>
                <Icon icon="x" className="size-5" />
              </button>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expenseTitle" className="form-label">
                    Expense Title
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="expenseTitle" className="form-input" placeholder="Enter expense title" required />
                </div>

                <div>
                  <label htmlFor="expenseAmount" className="form-label">
                    Amount ($)
                    <span className="text-danger">*</span>
                  </label>
                  <input type="number" step="0.01" id="expenseAmount" className="form-input" placeholder="Enter amount" required />
                </div>

                <div>
                  <label htmlFor="expenseCategory" className="form-label">
                    Category
                    <span className="text-danger">*</span>
                  </label>
                  <select id="expenseCategory" className="form-input" required>
                    <option>Select category</option>
                    <option value="Office Supplies">Office Supplies</option>
                    <option value="Travel">Travel</option>
                    <option value="Meals">Meals</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Equipment">Equipment</option>
                    <option value="Utilities">Utilities</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Training & Events">Training &amp; Events</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="expensePayment" className="form-label">
                    Payment Method
                  </label>
                  <select id="expensePayment" className="form-input">
                    <option>Select payment method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Debit Card">Debit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="expenseStatus" className="form-label">
                    Status
                  </label>
                  <select id="expenseStatus" className="form-input">
                    <option>Select status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Reimbursed">Reimbursed</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="expenseDate" className="form-label">
                    Date &amp; Time
                  </label>
                  <Flatpickr
                    options={{
                      defaultDate: 'today',
                      dateFormat: 'd M, Y',
                    }}
                    className="form-input"
                    id="expenseDate"
                  />
                </div>

                <div className="col-span-1 lg:col-span-2">
                  <label htmlFor="expenseDesc" className="form-label">
                    Description
                  </label>
                  <textarea id="expenseDesc" className="form-textarea" rows={3} placeholder="Optional notes or description" />
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addExpenseModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" className="me-1" />
                Save Expense
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddExpensesModal
