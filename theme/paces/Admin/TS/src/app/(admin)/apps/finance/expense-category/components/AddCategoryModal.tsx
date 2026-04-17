import Icon from '@/components/wrappers/Icon'

const AddCategoryModal = () => {
  return (
    <>
      <div id="categoryModal" className="hs-overlay pointer-events-none fixed start-0 top-0 z-80 hidden size-full overflow-x-hidden overflow-y-auto" role="dialog" tabIndex={-1} aria-labelledby="categoryModalLabel">
        <div className="hs-overlay-animation-target hs-overlay-open:scale-100 hs-overlay-open:opacity-100 m-3 flex min-h-[calc(100%-56px)] scale-95 items-center opacity-0 transition-all duration-200 ease-in-out md:mx-auto md:w-full md:max-w-lg">
          <div className="card pointer-events-auto flex w-full flex-col">
            <div className="card-body border-default-300 bg-default-100 flex items-center justify-between rounded-t border-b">
              <h3 id="categoryModalLabel" className="font-bold">
                Add Expense Category
              </h3>
              <button type="button" aria-label="Close" data-hs-overlay="#categoryModal">
                <span className="sr-only">Close</span>
                <Icon icon="x" className="size-5" />
              </button>
            </div>
            <div className="card-body">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label htmlFor="categoryName" className="form-label">
                    Category Name
                    <span className="text-danger">*</span>
                  </label>
                  <input type="text" id="categoryName" className="form-input" placeholder="Enter category name" required />
                </div>

                <div>
                  <label htmlFor="categoryDescription" className="form-label">
                    Description
                  </label>
                  <textarea id="categoryDescription" className="form-textarea" rows={3} placeholder="Optional notes about this category" />
                </div>

                <div>
                  <label htmlFor="categoryStatus" className="form-label">
                    Status
                  </label>
                  <select id="categoryStatus" className="form-input">
                    <option value="Active" defaultValue={''}>
                      Active
                    </option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="border-default-300 flex items-center justify-end gap-2 border-t p-5">
              <button type="button" className="btn bg-light hover:text-primary" data-hs-overlay="#categoryModal">
                Cancel
              </button>
              <button type="button" className="btn bg-primary text-white hover:bg-primary-hover">
                <Icon icon="device-floppy" className="me-1" />
                Save Category
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddCategoryModal
