import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const NewDepartmentModal = () => {
  return (
    <>
      <div
        id="addDepartmentModal"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="addDepartmentModalLabel"
      >
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 flex items-center justify-between border-b p-5">
              <h3 id="addDepartmentModalLabel" className="text-sm">
                Add New Department
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addDepartmentModal">
                <Icon icon="x" className="size-5" />
              </button>
            </div>
            <div className="card-body overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="departmentName" className="form-label">
                    Department Name
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="departmentName" name="department_name" className="form-input" placeholder="Enter department name" required />
                </div>

                <div>
                  <label htmlFor="departmentCode" className="form-label">
                    Department Code
                  </label>
                  <input type="text" id="departmentCode" name="department_code" className="form-input" placeholder="e.g. HR-001" />
                </div>

                <div>
                  <label htmlFor="hodSelect" className="form-label">
                    Head of Department (HOD)
                  </label>
                  <select id="hodSelect" name="hod" className="form-input">
                    <option>Select HOD</option>
                    <option value="Samantha Green">Samantha Green</option>
                    <option value="Ethan Johnson">Ethan Johnson</option>
                    <option value="David Miller">David Miller</option>
                    <option value="Olivia Brown">Olivia Brown</option>
                    <option value="Isabella Lee">Isabella Lee</option>
                    <option value="Michael Scott">Michael Scott</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="departmentType" className="form-label">
                    Department Type
                  </label>
                  <select id="departmentType" name="department_type" className="form-input">
                    <option>Select Type</option>
                    <option value="Core">Core</option>
                    <option value="Support">Support</option>
                    <option value="Technical">Technical</option>
                    <option value="Creative">Creative</option>
                    <option value="Administrative">Administrative</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="totalStaff" className="form-label">
                    Total Staff
                  </label>
                  <input type="number" id="totalStaff" name="total_staff" className="form-input" placeholder="e.g. 15" min={1} />
                </div>

                <div>
                  <label htmlFor="establishedDate" className="form-label">
                    Established Date
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y' }} required />
                </div>

                <div>
                  <label htmlFor="statusSelect" className="form-label">
                    Status
                  </label>
                  <select id="statusSelect" name="status" className="form-input">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="On Hold">On Hold</option>
                    <option value="Restructuring">Restructuring</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea id="description" name="description" className="form-textarea" rows={3} placeholder="Brief overview of the department..." />
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addDepartmentModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" />
                Save Department
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default NewDepartmentModal
