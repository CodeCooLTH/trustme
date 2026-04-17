import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddCardModal = () => {
  return (
    <>
      <div id="addCardModal" className="hs-overlay pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addCardModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-lg">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="card-body border-default-300 flex items-center justify-between border-b">
              <h3 id="addCardModalLabel" className="font-bold">
                Add New Card
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addCardModal">
                <span className="sr-only">Close</span>
                <Icon icon="x" className="text-2xl align-middle text-default-600" />
              </button>
            </div>
            <div className="card-body">
              <form id="cardForm">
                <div className="mb-5">
                  <label className="form-label">Card Holder Name</label>
                  <input type="text" className="form-input" placeholder="Enter card holder name" required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Card Number</label>
                  <input type="text" className="form-input" placeholder="XXXX XXXX XXXX XXXX" required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Card Type</label>
                  <select className="form-input" required>
                    <option>Select type</option>
                    <option>Credit Card</option>
                    <option>Debit Card</option>
                    <option>Prepaid Card</option>
                  </select>
                </div>
                <div className="mb-5">
                  <label className="form-label">Expiry Date</label>
                  <Flatpickr options={{ dateFormat: 'M, Y', defaultDate: 'today' }} className="form-input" />
                </div>
                <div className="mb-5">
                  <label className="form-label">CVV</label>
                  <input type="password" className="form-input" placeholder="***" maxLength={3} required />
                </div>
                <div className="mb-5">
                  <label className="form-label">Bank Name</label>
                  <input type="text" className="form-input" placeholder="Enter bank name" required />
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
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addCardModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                Save Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCardModal
