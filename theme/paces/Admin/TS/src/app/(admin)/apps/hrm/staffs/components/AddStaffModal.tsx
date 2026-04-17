import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddStaffModal = () => {
  return (
    <>
      <div id="addStaffModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addStaffModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 flex items-center justify-between border-b p-5">
              <h3 id="addStaffModalLabel" className="flex items-center gap-2 text-sm">
                <Icon icon="user-plus" className="size-3.5" />
                Add New Staff
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addStaffModal">
                <Icon icon="x" className="size-5" />
              </button>
            </div>
            <div className="card-body overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="staffName" className="form-label">
                    Full Name
                  </label>
                  <input type="text" className="form-input" id="staffName" placeholder="Enter full name" />
                </div>
                <div>
                  <label htmlFor="staffEmail" className="form-label">
                    Email
                  </label>
                  <input type="email" className="form-input" id="staffEmail" placeholder="name@example.com" />
                </div>
                <div>
                  <label htmlFor="staffPhone" className="form-label">
                    Phone
                  </label>
                  <input type="number" className="form-input" id="staffPhone" placeholder="+1 202 555 0123" />
                </div>
                <div>
                  <label htmlFor="staffCountry" className="form-label">
                    Country
                  </label>
                  <select className="form-input" id="staffCountry">
                    <option>Select country</option>
                    <option value="USA">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="Canada">India</option>
                    <option value="Germany">Canada</option>
                    <option value="France">Germany</option>
                    <option value="Australia">France</option>
                    <option value="India">Japan</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="staffRole" className="form-label">
                    Role
                  </label>
                  <input type="text" className="form-input" id="staffRole" placeholder="e.g. Software Engineer" />
                </div>
                <div>
                  <label htmlFor="staffDepartment" className="form-label">
                    Department
                  </label>
                  <select id="staffDepartment" className="form-input">
                    <option>Select department</option>
                    <option value="Human Resources">Human Resources</option>
                    <option value="IT Department">IT Department</option>
                    <option value="Operations">Operations</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Finance">Finance</option>
                    <option value="Design">Design</option>
                    <option value="Analytics">Analytics</option>
                    <option value="Product">Product</option>
                    <option value="Quality Assurance">Quality Assurance</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="staffStatus" className="form-label">
                    Status
                  </label>
                  <select id="staffStatus" className="form-input">
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Probation">Probation</option>
                    <option value="Suspended">Suspended</option>
                    <option value="Review Pending">Review Pending</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="staffJoinDate" className="form-label">
                    Join Date
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y' }} required />
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-4">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addStaffModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="check" />
                Save Staff
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddStaffModal
