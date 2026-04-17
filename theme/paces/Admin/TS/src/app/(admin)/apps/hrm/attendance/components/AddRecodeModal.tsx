import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddRecodeModal = () => {
  return (
    <>
      <div
        id="addAttendanceModal"
        className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto"
        role="dialog"
        tabIndex={-1}
        aria-labelledby="addAttendanceModalLabel"
      >
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 flex items-center justify-between border-b p-5">
              <h3 id="addAttendanceModalLabel" className="text-sm">
                Add New Attendance Record
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addAttendanceModal">
                <Icon icon="x" className="text-xl" />
              </button>
            </div>
            <div className="card-body overflow-y-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="attendance-date" className="form-label">
                    Date
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y' }} required />
                </div>
                <div>
                  <label htmlFor="shift-type" className="form-label">
                    Shift Type
                  </label>
                  <select id="shift-type" className="form-input" required>
                    <option>Select Shift</option>
                    <option>Day Shift</option>
                    <option>Night Shift</option>
                    <option>Mid Shift</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="atte-status" className="form-label">
                    Status
                  </label>
                  <select id="atte-status" className="form-input" required>
                    <option>Select Status</option>
                    <option>Present</option>
                    <option>Late</option>
                    <option>Half Day</option>
                    <option>On Leave</option>
                    <option>Absent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="clock-in" className="form-label">
                    Clock In
                  </label>
                  <Flatpickr
                    className="form-input"
                    placeholder="Select Time"
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'H:i',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="clock-out" className="form-label">
                    Clock Out
                  </label>
                  <Flatpickr
                    className="form-input"
                    placeholder="Select Time"
                    options={{
                      enableTime: true,
                      noCalendar: true,
                      dateFormat: 'H:i',
                    }}
                  />
                </div>
                <div>
                  <label htmlFor="leave-type" className="form-label">
                    Leave Type
                  </label>
                  <select id="leave-type" className="form-input">
                    <option>None</option>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Paid Leave</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="approval" className="form-label">
                    Approval Status
                  </label>
                  <select id="approval" className="form-input">
                    <option>Approved</option>
                    <option>Pending</option>
                    <option>Rejected</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="approval-by" className="form-label">
                    Approved By
                  </label>
                  <input type="text" id="approval-by" className="form-input" placeholder="e.g. Maria Smith" />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea id="remarks" className="form-textarea" rows={3} placeholder="Optional remarks" />
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addAttendanceModal">
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

export default AddRecodeModal
