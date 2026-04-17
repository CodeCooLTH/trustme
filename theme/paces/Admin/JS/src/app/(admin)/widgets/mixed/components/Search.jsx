import { Icon as IconifyIcon } from '@iconify/react'
const Search = () => {
  return (
    <>
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Search</h4>
        </div>
        <div className="card-body">
          <h5 className="mb-2">Sizes</h5>
          <div className="input-icon-group">
            <IconifyIcon icon="tabler:search" className="input-icon" />
            <input type="search" placeholder="Search here..." className="form-input form-input-sm" />
          </div>
          <div className="input-icon-group mt-5">
            <IconifyIcon icon="tabler:search" className="input-icon" />
            <input type="search" placeholder="Search something here..." className="form-input" />
          </div>
          <div className="input-icon-group mt-5">
            <IconifyIcon icon="tabler:search" className="input-icon" />
            <input type="search" placeholder="Search here..." className="form-input form-input-lg" />
          </div>
          <h5 className="mb-2 mt-5">Styles</h5>
          <div className="input-icon-group">
            <IconifyIcon icon="solar:magic-stick-3-bold-duotone" className="input-icon text-secondary" />
            <input type="search" placeholder="Search something here..." className="form-input" />
          </div>
          <div className="input-icon-group mt-5">
            <IconifyIcon icon="tabler:search" className="input-icon" />
            <input type="search" placeholder="Search here..." className="form-input rounded-e-none!" />
            <button className="btn bg-secondary text-white rounded-s-none input-group-text" type="button">
              Search
            </button>
          </div>
          <div className="input-icon-group mt-5">
            <IconifyIcon icon="tabler:search" className="input-icon" />
            <input type="search" placeholder="Search something here..." className="form-input bg-light!" />
          </div>
        </div>
      </div>
    </>
  )
}
export default Search
