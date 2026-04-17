import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'

const AddHolidayModal = () => {
  return (
    <>
      <div id="addHolidayModal" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="addHolidayModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] max-w-sm scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="border-default-300 flex items-center justify-between border-b p-5">
              <h3 id="addHolidayModalLabel" className="text-sm">
                Add New Holiday
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#addHolidayModal">
                <Icon icon="x" className="size-5" />
              </button>
            </div>
            <form id="addHolidayForm">
              <div className="card-body overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-base">
                  <div>
                    <label htmlFor="holidayName" className="form-label">
                      Holiday Name
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="holidayName" className="form-input" placeholder="Enter holiday name" required />
                  </div>

                  <div>
                    <label htmlFor="holidayDate" className="form-label">
                      Date
                      <span className="text-danger">*</span>
                    </label>
                    <Flatpickr className="form-input" options={{ defaultDate: 'today', dateFormat: 'd M, Y' }} required />
                  </div>
                  <div>
                    <label htmlFor="holidayDay" className="form-label">
                      Day
                      <span className="text-danger">*</span>
                    </label>
                    <select id="holidayDay" className="form-input" required>
                      <option>Select day</option>
                      <option>Monday</option>
                      <option>Tuesday</option>
                      <option>Wednesday</option>
                      <option>Thursday</option>
                      <option>Friday</option>
                      <option>Saturday</option>
                      <option>Sunday</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="optionalHoliday" className="form-label">
                      Optional Holiday
                      <span className="text-danger">*</span>
                    </label>
                    <select id="optionalHoliday" className="form-input" required>
                      <option>Select option</option>
                      <option value="No">No (Federal)</option>
                      <option value="Yes">Yes (Optional)</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="holidayDescription" className="form-label">
                      Description
                      <span className="text-danger">*</span>
                    </label>
                    <textarea id="holidayDescription" className="form-textarea" rows={3} placeholder="Enter holiday description" required />
                  </div>

                  <div>
                    <label htmlFor="holidayAddedBy" className="form-label">
                      Added By
                      <span className="text-danger">*</span>
                    </label>
                    <input type="text" id="holidayAddedBy" className="form-input" placeholder="Enter admin name" required />
                  </div>

                  <div>
                    <label htmlFor="holidayStatus" className="form-label">
                      Status
                      <span className="text-danger">*</span>
                    </label>
                    <select id="holidayStatus" className="form-input" required>
                      <option>Select status</option>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>
            </form>
            <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#addHolidayModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" />
                Save Holiday
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddHolidayModal
