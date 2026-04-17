const Emergency = () => {
  return (
    <>
      <div className="hidden" id="emergency" role="tabpanel" aria-labelledby="emergency-tab">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-base gap-y-5">
          <div>
            <label htmlFor="emergencyName" className="form-label">
              Name
            </label>
            <input id="emergencyName" type="text" className="form-input" />
          </div>
          <div>
            <label htmlFor="emergencyRelation" className="form-label">
              Relation
            </label>
            <input id="emergencyRelation" type="text" className="form-input" placeholder="e.g., Mother" />
          </div>
          <div>
            <label htmlFor="emergencyPhone" className="form-label">
              Phone Number
            </label>
            <input id="emergencyPhone" type="text" className="form-input" />
          </div>
          <div className="md:col-span-3">
            <label htmlFor="emergencyAddress" className="form-label">
              Address
            </label>
            <textarea id="emergencyAddress" className="form-textarea" rows={2} defaultValue={''} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Emergency
