const Access = () => {
  return (
    <>
      <div className="hidden" id="access" role="tabpanel" aria-labelledby="access-tab">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
          <div>
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input id="username" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input id="password" type="password" className="form-input" />
          </div>
          <div>
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <select id="role" className="form-input">
              <option>Admin</option>
              <option>Manager</option>
              <option>Staff</option>
              <option>HR</option>
            </select>
          </div>
          <div>
            <label htmlFor="ac-status" className="form-label">
              Status
            </label>
            <select id="ac-status" className="form-input">
              <option>Active</option>
              <option>Inactive</option>
              <option>Suspended</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <div className="items-cneter flex gap-2">
              <input id="sendCredentials" className="form-checkbox" type="checkbox" />
              <label htmlFor="sendCredentials" className="font-normal">
                Send login credentials to staff via email
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Access
