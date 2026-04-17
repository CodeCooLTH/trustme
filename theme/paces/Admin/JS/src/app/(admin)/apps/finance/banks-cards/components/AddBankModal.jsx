import Icon from '@/components/wrappers/Icon'
const AddBankModal = () => {
  return (
    <>
      <div id="addBankModal" className="hs-overlay pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addBankModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-lg">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="card-body border-default-300 flex items-center justify-between border-b">
              <h3 id="addBankModalLabel" className="font-semibold">
                Add New Bank Account
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addBankModal">
                <span className="sr-only">Close</span>
                <Icon icon="x" className="text-2xl align-middle text-default-600" />
              </button>
            </div>
            <div className="card-body">
              <form id="bankForm">
                <div className="mb-5">
                  <label className="form-label">Bank Name</label>
                  <input type="text" className="form-input" placeholder="Enter bank name" required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Account Holder</label>
                  <input type="text" className="form-input" placeholder="Enter account holder name" required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Account Number</label>
                  <input type="text" className="form-input" placeholder="Enter account number" required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Account Type</label>
                  <select className="form-input" required>
                    <option>Select type</option>
                    <option>Checking</option>
                    <option>Savings</option>
                    <option>Business</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label className="form-label">Branch</label>
                  <input type="text" className="form-input" placeholder="Enter branch name" required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Balance</label>
                  <input type="number" className="form-input" placeholder="Enter balance amount" required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Status</label>
                  <select className="form-select">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
              </form>
            </div>
            <div className="flex items-center justify-end gap-2 p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addBankModal">
                <Icon icon="x" className="ms-1" />
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" className="me-1" />
                Save Bank
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default AddBankModal
