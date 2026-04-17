import Flatpickr from '@/components/wrappers/Flatpickr'
import Icon from '@/components/wrappers/Icon'
const AddCampaignModal = () => {
  return (
    <div id="createCampaignForm" className="hs-overlay hs-overlay-open:opacity-100 hs-overlay-open:duration-500 pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="createCampaignFormLabel">
      <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-2xl lg:max-w-3xl">
        <div className="border-default-300 pointer-events-auto flex w-full flex-col rounded-md border card">
          <div className="border-default-300 flex items-center justify-between border-b p-6">
            <h3 id="createCampaignFormLabel" className="text-sm">
              Create New Campaign
            </h3>
            <button type="button" aria-label="Close" data-hs-overlay="#createCampaignForm">
              <Icon icon="x" className="text-xl" />
            </button>
          </div>
          <div className="overflow-y-auto card-body">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="campaignName" className="form-label">
                  Campaign Name
                </label>
                <input type="text" className="form-input" id="campaignName" placeholder="Enter campaign Name" />
              </div>
              <div>
                <label htmlFor="CreatorName" className="form-label">
                  Creator
                </label>
                <input type="text" className="form-input" id="CreatorName" placeholder="Enter campaign creator" />
              </div>
              <div>
                <label htmlFor="budget" className="form-label">
                  Budget (USD)
                </label>
                <input type="number" className="form-input" id="budget" placeholder="e.g. 7500" />
              </div>
              <div>
                <label htmlFor="goal" className="form-label">
                  Goal (USD)
                </label>
                <input type="number" className="form-input" id="goal" placeholder="e.g. 7500" />
              </div>
              <div>
                <label htmlFor="Campstatus" className="form-label">
                  Status
                </label>
                <select className="form-input" id="Campstatus">
                  <option value="All">Select status</option>
                  <option value="Success">Success</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Failed">Failed</option>
                  <option value="Ongoing">Ongoing</option>
                </select>
              </div>
              <div>
                <label htmlFor="tags" className="form-label">
                  Tags
                </label>
                <input type="text" className="form-input" id="tags" placeholder="e.g. Email, Webinar, Retargeting" />
              </div>
              <div>
                <label htmlFor="launchDate" className="form-label">
                  Launch Date
                </label>
                <Flatpickr
                  type="date"
                  options={{
                    defaultDate: 'today',
                    dateFormat: 'd M, Y',
                  }}
                  className="form-input"
                  id="launchDate"
                />
              </div>
              <div>
                <label htmlFor="launchTime" className="form-label">
                  Launch Time
                </label>
                <Flatpickr
                  type="time"
                  options={{
                    defaultDate: 'today',
                    enableTime: true,
                    noCalendar: true,
                  }}
                  className="form-input"
                  id="launchTime"
                />
              </div>
            </div>
          </div>
          <div className="border-default-300 flex items-center justify-end gap-x-2 border-t p-5">
            <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#createCampaignForm">
              Cancel
            </button>
            <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
              Save Campaign
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default AddCampaignModal
