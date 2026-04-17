import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddLeaveModal = () => {
  return (
    <>
      <div id="addLeaveModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addLeaveModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 flex items-center justify-between border-b p-5">
              <h3 id="addLeaveModalLabel" className="text-sm">
                Add Leave Record
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addLeaveModal">
                <Icon icon="x" className="size-5" />
              </button>
            </div>
            <div className="card-body overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="employeeId" className="form-label">
                    Employee ID
                  </label>
                  <input type="text" id="employeeId" className="form-input" placeholder="e.g., EMP-1056" required />
                </div>

                <div>
                  <label htmlFor="employeeName" className="form-label">
                    Employee Name
                  </label>
                  <input type="text" id="employeeName" className="form-input" placeholder="Enter name" required />
                </div>

                <div>
                  <label htmlFor="department" className="form-label">
                    Department
                  </label>
                  <select id="department" className="form-input" required>
                    <option>Select Department</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>IT</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Support</option>
                    <option>Operations</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="dateFrom" className="form-label">
                    Date From
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y' }} required />
                </div>

                <div>
                  <label htmlFor="dateTo" className="form-label">
                    Date To
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y' }} required />
                </div>

                <div>
                  <label htmlFor="leaveType" className="form-label">
                    Leave Type
                  </label>
                  <select id="leaveType" className="form-input" required>
                    <option>Select Leave Type</option>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Paid Leave</option>
                    <option>Maternity Leave</option>
                    <option>Unpaid Leave</option>
                  </select>
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="reason" className="form-label">
                    Reason
                  </label>
                  <textarea id="reason" className="form-textarea" rows={3} placeholder="Enter reason" required />
                </div>

                <div>
                  <label htmlFor="leave-status" className="form-label">
                    Status
                  </label>
                  <select id="leave-status" className="form-input" required>
                    <option>Select Status</option>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="approvedBy" className="form-label">
                    Approved By
                  </label>
                  <input type="text" id="approvedBy" className="form-input" placeholder="Approver name" />
                </div>

                <div>
                  <label htmlFor="appliedOn" className="form-label">
                    Applied On
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y' }} required />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea id="remarks" className="form-textarea" rows={3} placeholder="Optional remarks..." />
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addLeaveModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" />
                Save Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddLeaveModal
