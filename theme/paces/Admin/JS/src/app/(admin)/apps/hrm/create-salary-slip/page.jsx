import PageBreadcrumb from '@/components/PageBreadcrumb'
import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
export const metadata = {
  title: 'Salary Slip',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Salary Slip" subtitle="HRM" />
      <div className="container">
        <div className="card">
          <div className="card-header">
            <div className="flex items-center gap-2">
              <Icon icon="file-text" />
              <h5 className="card-title">Create Salary Slip</h5>
            </div>
            <div>
              <button className="btn btn-sm bg-light hover:text-primary font-semibold">
                <Icon icon="printer" /> Print Preview
              </button>
            </div>
          </div>
          <div className="card-body">
            <form id="salarySlipForm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-base gap-y-5">
                <div>
                  <label htmlFor="employeeName" className="form-label">
                    Employee Name
                    <span className="text-danger">*</span>
                  </label>
                  <select id="employeeName" className="form-input" required>
                    <option>Select Employee</option>
                    <option>Samantha Green</option>
                    <option>David Lee</option>
                    <option>Maria Smith</option>
                    <option>Olivia Brown</option>
                    <option>James Walker</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="employeeId" className="form-label">
                    Employee ID
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="employeeId" className="form-input" placeholder="e.g., EMP-1015" required />
                </div>

                <div>
                  <label htmlFor="department" className="form-label">
                    Department
                    <span className="text-danger">*</span>
                  </label>
                  <select id="department" className="form-input" required>
                    <option>Select Department</option>
                    <option>Human Resources</option>
                    <option>Finance</option>
                    <option>IT</option>
                    <option>Marketing</option>
                    <option>Operations</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="designation" className="form-label">
                    Designation
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="designation" className="form-input" placeholder="e.g., Senior Developer" required />
                </div>

                <div>
                  <label htmlFor="payPeriod" className="form-label">
                    Pay Period
                    <span className="text-danger">*</span>
                  </label>
                  <select id="payPeriod" className="form-input" required>
                    <option>Select Month</option>
                    <option>October 2025</option>
                    <option>September 2025</option>
                    <option>August 2025</option>
                    <option>July 2025</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="payDate" className="form-label">
                    Pay Date
                    <span className="text-danger">*</span>
                  </label>
                  <Flatpickr
                    className="form-input"
                    options={{
                      defaultDate: 'today',
                      dateFormat: 'd M, Y',
                    }}
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <h5 className="text-default-400 font-semibold uppercase mb-2">Earnings</h5>
                </div>

                <div>
                  <label htmlFor="basicSalary" className="form-label">
                    Basic Salary ($)
                    <span className="text-danger">*</span>
                  </label>
                  <input type="number" id="basicSalary" className="form-input" placeholder="e.g., 5000" min={0} required />
                </div>

                <div>
                  <label htmlFor="houseAllowance" className="form-label">
                    House Allowance ($)
                  </label>
                  <input type="number" id="houseAllowance" className="form-input" placeholder="e.g., 800" min={0} />
                </div>

                <div>
                  <label htmlFor="medicalAllowance" className="form-label">
                    Medical Allowance ($)
                  </label>
                  <input type="number" id="medicalAllowance" className="form-input" placeholder="e.g., 400" min={0} />
                </div>

                <div>
                  <label htmlFor="transportAllowance" className="form-label">
                    Transport Allowance ($)
                  </label>
                  <input type="number" id="transportAllowance" className="form-input" placeholder="e.g., 300" min={0} />
                </div>

                <div className="md:col-span-2">
                  <h5 className="text-default-400 font-semibold uppercase mb-2">Deductions</h5>
                </div>

                <div>
                  <label htmlFor="tax" className="form-label">
                    Tax ($)
                  </label>
                  <input type="number" id="tax" className="form-input" placeholder="e.g., 200" min={0} />
                </div>

                <div>
                  <label htmlFor="providentFund" className="form-label">
                    Provident Fund ($)
                  </label>
                  <input type="number" id="providentFund" className="form-input" placeholder="e.g., 150" min={0} />
                </div>

                <div>
                  <label htmlFor="loanDeduction" className="form-label">
                    Loan Deduction ($)
                  </label>
                  <input type="number" id="loanDeduction" className="form-input" placeholder="e.g., 100" min={0} />
                </div>
                <hr className="border-light mt-4 md:col-span-2" />

                <div>
                  <label htmlFor="totalEarnings" className="form-label">
                    Total Earnings ($)
                  </label>
                  <input type="number" id="totalEarnings" className="form-input" placeholder="Auto-calculated" readOnly />
                </div>
                <div>
                  <label htmlFor="netPay" className="form-label">
                    Net Pay ($)
                  </label>
                  <input type="number" id="netPay" className="form-input" placeholder="Auto-calculated" readOnly />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="remarks" className="form-label">
                    Remarks
                  </label>
                  <textarea id="remarks" className="form-textarea" rows={2} placeholder="Optional notes or remarks" defaultValue={''} />
                </div>
              </div>
            </form>
          </div>
          <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
            <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addPayrollModal">
              Reset
            </button>
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
              <Icon icon="device-floppy" />
              Generate Slip
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
