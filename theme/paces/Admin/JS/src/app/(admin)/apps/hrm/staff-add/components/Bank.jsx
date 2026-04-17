const Bank = () => {
  return (
    <>
      <div className="hidden" id="bank" role="tabpanel" aria-labelledby="bank-tab">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
          <div>
            <label htmlFor="bankName" className="form-label">
              Bank Name
            </label>
            <input id="bankName" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="accountNumber" className="form-label">
              Account Number
            </label>
            <input id="accountNumber" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="ifscCode" className="form-label">
              IFSC / SWIFT Code
            </label>
            <input id="ifscCode" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="branch" className="form-label">
              Branch
            </label>
            <input id="branch" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="taxId" className="form-label">
              PAN / Tax ID
            </label>
            <input id="taxId" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="salary" className="form-label">
              Salary (Monthly)
            </label>
            <input id="salary" type="number" className="form-input" placeholder="USD $" />
          </div>
          <div>
            <label htmlFor="paymentMode" className="form-label">
              Payment Mode
            </label>
            <select id="paymentMode" className="form-input">
              <option>Bank Transfer</option>
              <option>Cheque</option>
              <option>Cash</option>
            </select>
          </div>
          <div>
            <label htmlFor="pfNumber" className="form-label">
              PF Number
            </label>
            <input id="pfNumber" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="esiNumber" className="form-label">
              ESI Number
            </label>
            <input id="esiNumber" type="text" className="form-input" />
          </div>
        </div>
      </div>
    </>
  )
}
export default Bank
