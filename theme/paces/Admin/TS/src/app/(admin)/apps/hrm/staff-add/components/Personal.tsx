import Flatpickr from '@/components/wrappers/Flatpickr'

const Personal = () => {
  return (
    <>
      <div className="active" id="personal" role="tabpanel" aria-labelledby="personal-tab">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
          <div>
            <label htmlFor="firstName" className="form-label">
              First Name
            </label>
            <input id="firstName" type="text" className="form-input" required />
          </div>
          <div>
            <label htmlFor="lastName" className="form-label">
              Last Name
            </label>
            <input id="lastName" type="text" className="form-input" required />
          </div>
          <div>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input id="email" type="email" className="form-input" required />
          </div>
          <div>
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input id="phone" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="gender" className="form-label">
              Gender
            </label>
            <select id="gender" className="form-input">
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <Flatpickr id="dob" type="text" className="form-input" options={{ dateFormat: 'd M, Y', defaultDate: new Date() }} readOnly />
          </div>
          <div>
            <label htmlFor="maritalStatus" className="form-label">
              Marital Status
            </label>
            <select id="maritalStatus" className="form-input">
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
            </select>
          </div>
          <div>
            <label htmlFor="nationality" className="form-label">
              Nationality
            </label>
            <input id="nationality" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="bloodGroup" className="form-label">
              Blood Group
            </label>
            <select id="bloodGroup" className="form-input">
              <option>O+</option>
              <option>O-</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
            </select>
          </div>
          <div className="md:col-span-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea id="address" className="form-textarea" rows={2} defaultValue={''} />
          </div>
          <div>
            <label htmlFor="city" className="form-label">
              City
            </label>
            <input id="city" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="state" className="form-label">
              State
            </label>
            <input id="state" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="country" className="form-label">
              Country
            </label>
            <input id="country" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="postalCode" className="form-label">
              Postal Code
            </label>
            <input id="postalCode" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="idType" className="form-label">
              ID Type
            </label>
            <select id="idType" className="form-input">
              <option>Passport</option>
              <option>National ID</option>
              <option>Driving License</option>
            </select>
          </div>
          <div>
            <label htmlFor="idNumber" className="form-label">
              ID Number
            </label>
            <input id="idNumber" type="text" className="form-input" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Personal
