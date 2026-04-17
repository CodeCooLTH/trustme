import Flatpickr from '@/components/wrappers/Flatpickr'

const JobDetail = () => {
  return (
    <>
      <div className="hidden" id="job" role="tabpanel" aria-labelledby="job-tab">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
          <div>
            <label htmlFor="employeeId" className="form-label">
              Employee ID
            </label>
            <input id="employeeId" type="text" className="form-input" defaultValue="EMP-8941" placeholder="EMP-XXXX" />
          </div>
          <div>
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <select id="department" className="form-input">
              <option>IT</option>
              <option>HR</option>
              <option>Finance</option>
              <option>Design</option>
              <option>Sales</option>
              <option>Operations</option>
            </select>
          </div>
          <div>
            <label htmlFor="designation" className="form-label">
              Designation
            </label>
            <input id="designation" type="text" className="form-input" placeholder="e.g., Software Engineer" />
          </div>
          <div>
            <label htmlFor="team" className="form-label">
              Team
            </label>
            <input id="team" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="joiningDate" className="form-label">
              Joining Date
            </label>
            <Flatpickr id="joiningDate" type="text" className="form-input" options={{ defaultDate: new Date(), dateFormat: 'd M, Y' }} readOnly />
          </div>
          <div>
            <label htmlFor="shift" className="form-label">
              Shift
            </label>
            <select id="shift" className="form-input">
              <option>Morning</option>
              <option>Mid Shift</option>
              <option>Night Shift</option>
            </select>
          </div>
          <div>
            <label htmlFor="employmentType" className="form-label">
              Employment Type
            </label>
            <select id="employmentType" className="form-input">
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Intern</option>
            </select>
          </div>
          <div>
            <label htmlFor="workMode" className="form-label">
              Work Mode
            </label>
            <select id="workMode" className="form-input">
              <option>Onsite</option>
              <option>Hybrid</option>
              <option>Remote</option>
            </select>
          </div>
          <div>
            <label htmlFor="manager" className="form-label">
              Manager / Reporting To
            </label>
            <input id="manager" type="text" className="form-input" />
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetail
