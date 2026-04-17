import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Create New Ticket' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Create New Ticket" subtitle="Support" />
      <div className="2xl:w-10/12 w-full mx-auto">
        <div className="card">
          <div className="card-body">
            <form action="#" method="post">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-base gap-y-5">
                <div className="md:col-span-2">
                  <label htmlFor="requester" className="form-label">
                    Requester Name
                  </label>
                  <input type="text" className="form-input" id="requester" placeholder="Enter your full name" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input type="email" className="form-input" id="email" placeholder="you@example.com" />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="subject" className="form-label">
                    Ticket Subject
                  </label>
                  <input type="text" className="form-input" id="subject" placeholder="Brief summary of the issue" />
                </div>

                <div>
                  <label htmlFor="priority" className="form-label">
                    Priority
                  </label>
                  <select id="priority" className="form-select">
                    <option disabled value="">
                      Choose...
                    </option>
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Urgent">Urgent</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="tickstatus" className="form-label">
                    Status
                  </label>
                  <select id="tickstatus" className="form-select">
                    <option value="" disabled>
                      Choose...
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="tags" className="form-label">
                    Tags (comma-separated)
                  </label>
                  <input type="text" className="form-input" id="tags" placeholder="e.g. login, error, payment" />
                </div>

                <div className="mb-7.5 md:col-span-2">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea id="description" className="form-textarea" rows={5} placeholder="Describe the issue in detail..." />
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button type="submit" className="btn bg-primary text-white hover:bg-primary-hover">
                  <Icon icon="plus" />
                  Submit Ticket
                </button>
                <button type="reset" className="btn border-secondary hover:bg-secondary text-secondary hover:text-white">
                  <Icon icon="refresh" />
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
