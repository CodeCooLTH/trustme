import Icon from '@/components/wrappers/Icon'
const NewPayRollModal = () => {
  return (
    <>
      <div id="addPayrollModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addPayrollModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 flex items-center justify-between border-b p-5">
              <h3 id="addPayrollModalLabel" className="flex items-center gap-2 text-sm">
                <Icon icon="plus" className="text-sm" />
                Add Payroll Record
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addPayrollModal">
                <Icon icon="x" className="text-xl" />
              </button>
            </div>
            <form id="addPayrollForm">
              <div className="card-body overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-base">
                  <div>
                    <label htmlFor="employeeName" className="form-label">
                      Employee Name
                      <span className="text-danger">*</span>
                    </label>
                    <select id="employeeName" className="form-input" required>
                      <option value="">Select Employee</option>
                      <option value={1}>Samantha Green</option>
                      <option value={2}>David Lee</option>
                      <option value={3}>Maria Smith</option>
                      <option value={4}>Michael Adams</option>
                      <option value={5}>Olivia Brown</option>
                      <option value={6}>Daniel Carter</option>
                      <option value={7}>Emily Davis</option>
                      <option value={8}>James Walker</option>
                      <option value={9}>Sophia Martinez</option>
                      <option value={10}>Henry Clark</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="department" className="form-label">
                      Department
                      <span className="text-danger">*</span>
                    </label>
                    <select id="department" className="form-input" required>
                      <option value="">Select Department</option>
                      <option>Human Resources</option>
                      <option>Finance</option>
                      <option>IT</option>
                      <option>Operations</option>
                      <option>Marketing</option>
                      <option>Design</option>
                      <option>Sales</option>
                      <option>Customer Support</option>
                      <option>Research &amp; Development</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="role" className="form-label">
                      Role / Position
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="role" className="form-input" placeholder="Enter position title" required />
                  </div>

                  <div>
                    <label htmlFor="payPeriod" className="form-label">
                      Pay Period
                      <span className="text-danger">*</span>
                    </label>
                    <select id="payPeriod" className="form-input" required>
                      <option>Select Period</option>
                      <option>October 2025</option>
                      <option>September 2025</option>
                      <option>August 2025</option>
                      <option>July 2025</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="baseSalary" className="form-label">
                      Base Salary ($)
                      <span className="text-danger">*</span>
                    </label>
                    <input type="number" id="baseSalary" className="form-input" placeholder="e.g., 5000" min={0} required />
                  </div>

                  <div>
                    <label htmlFor="allowances" className="form-label">
                      Allowances ($)
                    </label>
                    <input type="number" id="allowances" className="form-input" placeholder="e.g., 300" min={0} />
                  </div>

                  <div>
                    <label htmlFor="totalEarnings" className="form-label">
                      Total Earnings ($)
                    </label>
                    <input type="number" id="totalEarnings" className="form-input" placeholder="Auto-calculated" readOnly />
                  </div>

                  <div>
                    <label htmlFor="deductions" className="form-label">
                      Deductions ($)
                    </label>
                    <input type="number" id="deductions" className="form-input" placeholder="e.g., 100" min={0} />
                  </div>

                  <div>
                    <label htmlFor="netPay" className="form-label">
                      Net Pay ($)
                    </label>
                    <input type="number" id="netPay" className="form-input" placeholder="Auto-calculated" readOnly />
                  </div>

                  <div>
                    <label htmlFor="pay-status" className="form-label">
                      Pay Status
                      <span className="text-danger">*</span>
                    </label>
                    <select id="pay-status" className="form-input" required>
                      <option>Select Status</option>
                      <option value="Paid">Paid</option>
                      <option value="Processing">Processing</option>
                      <option value="On Hold">On Hold</option>
                      <option value="Pending Review">Pending Review</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="remarks1" className="form-label">
                      Remarks
                    </label>
                    <textarea id="remarks1" className="form-textarea" rows={4} placeholder="Optional remarks or notes" />
                  </div>
                </div>
              </div>
            </form>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addPayrollModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="check" />
                Save Payroll
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default NewPayRollModal
