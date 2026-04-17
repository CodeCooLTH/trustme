import PageBreadcrumb from '@/components/PageBreadcrumb'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Add Leave' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Add Leave" subtitle="HRM" />
      <div className="container">
        <div className="card">
          <div className="card-header justify-start">
            <Icon icon="calendar-plus" />
            <h4 className="card-title">Apply for Leave</h4>
          </div>
          <div className="card-body">
            <form id="applyLeaveForm">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-x-base gap-y-5">
                <div className="md:col-span-2">
                  <label htmlFor="employeeId" className="form-label">
                    Employee ID
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="employeeId" className="form-input" placeholder="e.g., EMP-1035" required />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="employeeName" className="form-label">
                    Full Name
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="employeeName" className="form-input" placeholder="Enter full name" required />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="department" className="form-label">
                    Department
                    <span className="text-danger">*</span>
                  </label>
                  <select id="department" className="form-input" required>
                    <option>Select Department</option>
                    <option>HR</option>
                    <option>Finance</option>
                    <option>IT</option>
                    <option>Design</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="leaveFrom" className="form-label">
                    From Date
                    <span className="text-danger">*</span>
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd F, Y' }} required />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="leaveTo" className="form-label">
                    To Date
                    <span className="text-danger">*</span>
                  </label>
                  <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd F, Y' }} required />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="leaveType" className="form-label">
                    Leave Type
                    <span className="text-danger">*</span>
                  </label>
                  <select id="leaveType" className="form-input" required>
                    <option>Select Leave Type</option>
                    <option>Sick Leave</option>
                    <option>Casual Leave</option>
                    <option>Paid Leave</option>
                    <option>Unpaid Leave</option>
                    <option>Maternity Leave</option>
                    <option>Half Day Leave</option>
                  </select>
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="reason" className="form-label">
                    Reason<span className="text-danger">*</span>
                  </label>
                  <textarea id="reason" className="form-textarea" rows={3} placeholder="Explain your reason for leave" required />
                </div>

                <div className="md:col-span-3">
                  <label htmlFor="contactNumber" className="form-label">
                    Contact Number<span className="text-danger">*</span>
                  </label>
                  <input type="text" id="contactNumber" className="form-input" placeholder="+1 234 567 890" required />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="emergencyContact" className="form-label">
                    Emergency Contact Person<span className="text-danger">*</span>
                  </label>
                  <input type="text" id="emergencyContact" className="form-input" placeholder="Name of emergency contact" required />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="supportDoc" className="form-label">
                    Supporting Document (optional)
                  </label>
                  <input type="file" name="file-input" id="supportDoc" className="form-input" />
                  <small className="text-default-400">Attach medical certificate or proof if required (PDF/JPG/PNG).</small>
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="remarks" className="form-label">
                    Additional Remarks
                  </label>
                  <textarea id="remarks" className="form-textarea" rows={3} placeholder="Optional comments..." />
                </div>
              </div>
            </form>
          </div>

          <div className="card-footer flex justify-end gap-3">
            <button type="reset" className="btn bg-light hover:text-primary">
              <Icon icon="refresh" />
              Reset
            </button>
            <button type="submit" form="applyLeaveForm" className="btn bg-primary text-white hover:bg-primary-hover">
              <Icon icon="send-2" />
              Submit Application
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
