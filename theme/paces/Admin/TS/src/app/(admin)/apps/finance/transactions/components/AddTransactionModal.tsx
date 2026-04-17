import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddTransactionModal = () => {
  return (
    <>
      <div id="transactionModal" className="hs-overlay pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="transactionModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="card-header p-5">
              <h3 id="transactionModalLabel" className="flex items-center gap-1 font-semibold">
                <Icon icon="plus" className="text-secondary text-xs" />
                Add New Transaction
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#transactionModal">
                <Icon icon="x" className="text-2xl align-middle text-default-600" />
              </button>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Transaction Type */}
                <div className="col-span-1">
                  <label className="form-label font-medium">Transaction Type</label>
                  <select className="form-input" name="transactionType" required>
                    <option value="">Select Type</option>
                    <option value="Credit">Credit</option>
                    <option value="Debit">Debit</option>
                    <option value="Refund">Refund</option>
                    <option value="Adjustment">Adjustment</option>
                  </select>
                </div>
                {/* Payment Method */}
                <div className="col-span-1">
                  <label className="form-label font-medium">Payment Method</label>
                  <select className="form-input" name="paymentMethod" required>
                    <option value="">Select Method</option>
                    <option value="Visa">Visa</option>
                    <option value="MasterCard">MasterCard</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Amex">American Express</option>
                    <option value="Bank Transfer">Bank Transfer</option>
                  </select>
                </div>
                {/* Description */}
                <div className="col-span-1 lg:col-span-2">
                  <label className="form-label font-medium">Description</label>
                  <input type="text" className="form-input" name="description" placeholder="Enter transaction description" required />
                </div>
                {/* Amount */}
                <div className="col-span-1">
                  <label className="form-label font-medium">Amount ($)</label>
                  <input type="number" className="form-input" name="amount" placeholder="0.00" min={0} step="0.01" required />
                </div>
                {/* Status */}
                <div className="col-span-1">
                  <label className="form-label font-medium">Status</label>
                  <select className="form-input" name="status" required>
                    <option value="">Select Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>
                {/* Date */}
                <div className="col-span-1">
                  <label className="form-label font-medium">Date</label>
                  <Flatpickr type="text" options={{ defaultDate: new Date(), dateFormat: 'd M, Y h:i' }} className="form-input" name="date" required />
                </div>
                {/* Processed By */}
                <div className="col-span-1">
                  <label className="form-label font-medium">Processed By</label>
                  <input type="text" className="form-input" name="processedBy" placeholder="Enter staff name" required />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2 p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#transactionModal">
                <Icon icon="x" />
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" />
                Save Transaction
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTransactionModal
