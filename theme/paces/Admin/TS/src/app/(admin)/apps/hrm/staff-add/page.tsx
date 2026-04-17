import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Metadata } from 'next'
import Access from './components/Access'
import Bank from './components/Bank'
import Emergency from './components/Emergency'
import JobDetail from './components/JobDetail'
import Personal from './components/Personal'

export const metadata: Metadata = { title: 'Add Staff' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Add Staff" subtitle="HRM" />

      <div className="card">
        <div className="card-header border-solid">
          <h4 className="card-title">Fill Details</h4>

          <nav className="nav-tabs gap-0" aria-label="Tabs" id="staffTabs" role="tablist" aria-orientation="horizontal">
            <button type="button" className="nav-link hs-tab-active:border-primary border-b border-transparent active" id="personal-tab" aria-selected="true" data-hs-tab="#personal" aria-controls="personal" role="tab">
              Personal Info
            </button>
            <button type="button" className="nav-link hs-tab-active:border-primary border-b border-transparent" id="job-tab" aria-selected="false" data-hs-tab="#job" aria-controls="job" role="tab">
              Job Details
            </button>
            <button type="button" className="nav-link hs-tab-active:border-primary border-b border-transparent" id="bank-tab" aria-selected="false" data-hs-tab="#bank" aria-controls="bank" role="tab">
              Bank &amp; Salary
            </button>
            <button type="button" className="nav-link hs-tab-active:border-primary border-b border-transparent" id="emergency-tab" aria-selected="false" data-hs-tab="#emergency" aria-controls="emergency" role="tab">
              Emergency Contact
            </button>
            <button type="button" className="nav-link hs-tab-active:border-primary border-b border-transparent" id="access-tab" aria-selected="false" data-hs-tab="#access" aria-controls="access" role="tab">
              System Access
            </button>
          </nav>
        </div>
        <div className="card-body">
          <form id="addStaffForm">
            <div id="staffTabsContent">
              <Personal />

              <JobDetail />

              <Bank />

              <Emergency />

              <Access />
            </div>

            <div className="mt-7.5 flex justify-end gap-3">
              <button type="reset" className="btn bg-light hover:text-primary">
                Reset
              </button>
              <button type="submit" className="btn bg-success text-white">
                Save Staff
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Page
