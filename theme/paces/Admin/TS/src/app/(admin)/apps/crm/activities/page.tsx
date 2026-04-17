import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = { title: 'Activities' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Activities" subtitle="CRM" />
      <div className="lg:w-3/4 w-full mx-auto">
        <div className="card">
          <div className="card-body">
            <div className="space-y-5">
              <div>
                <h6 className="text-xs font-bold mb-5 text-default-400">01 Aug, 2025</h6>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">09:30 AM</div>
                  <div className="after:border-default-300 relative after:absolute after:start-1/2 after:top-7 after:bottom-0 after:w-px after:border-e -ms-px after:border-dashed last:after:hidden">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="user-plus" className="text-lg text-success" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>New lead:</strong>{' '}
                      <Link href="" className="text-primary">
                        John Carter
                      </Link>{' '}
                      added to the &quot;Enterprise&quot; pipeline by <span className="font-semibold text-primary">Sarah Lee</span>.
                    </p>
                    <div className="flex items-center gap-2.5 my-2.5">
                      <button className="btn btn-sm border-secondary text-secondary hover:bg-secondary hover:text-white text-nowrap">Follow Up</button>
                      <button className="btn btn-sm border-primary text-primary hover:bg-primary hover:text-white text-nowrap">Log Note</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-default-100 border border-default-300 text-default-400">Cold Lead</span>
                      <div>
                        <small className="text-default-400">01 Aug, 2025, 09:30 AM</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">10:15 AM</div>
                  <div className="after:border-default-300 relative after:absolute after:start-1/2 after:top-7 after:bottom-0 after:w-px after:border-e -ms-px after:border-dashed last:after:hidden">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="briefcase" className="text-lg text-info" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Deal created: </strong>Q3 Licensing for John Carter added by
                      <span className="font-semibold text-primary">Sarah Lee </span>with value $15,000.
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border-primary text-primary hover:bg-primary hover:text-white">View Deal</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-info/15 text-info">High Priority</span>
                      <div>
                        <small className="text-default-400 align-middle">01 Aug, 2025, 10:15 AM</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">11:45 AM</div>
                  <div className="relative">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="pencil" className="text-lg text-default-400" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Note added:</strong>
                      Client requested a 15-day extension on proposal deadline. Logged by
                      <span className="font-semibold text-primary">Sarah Lee.</span>
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border-info text-info hover:bg-info hover:text-white">Edit Note</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-warning/15 text-warning">Client Requested</span>
                      <div>
                        <small className="text-default-400">01 Aug, 2025, 11:45 AM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="text-xs font-bold mb-5 text-default-400">31 Jul, 2025</h6>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">03:30 PM</div>
                  <div className="after:border-default-300 relative after:absolute after:start-1/2 after:top-7 after:bottom-0 after:w-px after:border-e -ms-px after:border-dashed last:after:hidden">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="phone-call" className="text-lg text-success" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Call completed:</strong>
                      Follow-up call with
                      <strong>Emily Watson</strong>
                      to discuss contract renewal.
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border-success text-success hover:bg-success hover:text-white">Call Again</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-warning/15 text-warning">Follow Up Needed</span>
                      <div>
                        <small className="text-default-400">31 Jul, 2025, 03:30 PM</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">01:00 PM</div>
                  <div className="relative">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="mail" className="text-lg text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Email: </strong>
                      Welcome email with demo link sent to
                      <span className="font-semibold text-primary">Michael Barnes</span>.
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border border-dark text-dark hover:bg-dark hover:text-white">Resend</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-default-100 border border-default-300 text-default-400">Automated</span>
                      <div>
                        <small className="text-default-400 align-middle">31 Jul, 2025, 01:00 PM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="text-xs font-bold mb-5 text-default-400">30 Jul, 2025</h6>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">02:45 PM</div>
                  <div className="after:border-default-300 relative after:absolute after:start-1/2 after:top-7 after:bottom-0 after:w-px after:border-e -ms-px after:border-dashed last:after:hidden">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="calendar-event" className="text-lg text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Demo scheduled:</strong>A demo was booked with
                      <strong>Linda Rowe</strong>
                      for 02 Aug at 4:00 PM. Invite sent with Google Meet link.
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border-success text-success hover:bg-success hover:text-white">Send Reminder</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="badge bg-default-100 border border-default-300 text-default-400">Scheduled</span>
                      <div>
                        <small className="text-default-400">30 Jul, 2025, 02:45 PM</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">10:00 AM</div>
                  <div className="relative">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="user-circle" className="text-lg text-secondary" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Lead reassigned: </strong>
                      Lead <strong>Alice Monroe</strong>
                      was reassigned from James Parker to
                      <strong>Lisa Turner</strong>
                      for better regional alignment.
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border border-dark text-dark hover:bg-dark hover:text-white">Resend</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-default-100 border border-default-300 text-default-400">Internal</span>
                      <div>
                        <small className="text-default-400 align-middle">30 Jul, 2025, 10:00 AM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="text-xs font-bold mb-5 text-default-400">29 Jul, 2025</h6>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">05:30 PM</div>
                  <div className="after:border-default-300 relative after:absolute after:start-1/2 after:top-7 after:bottom-0 after:w-px after:border-e -ms-px after:border-dashed last:after:hidden">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="star" className="text-lg text-success" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Lead converted:</strong>
                      Jacob Wells converted into customer after final proposal approval. Contract sent for signing.
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border-primary text-primary hover:bg-primary hover:text-white">View Client</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-success/15 text-success">Won</span>
                      <div>
                        <small className="text-default-400">29 Jul, 2025, 05:30 PM</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">11:15 AM</div>
                  <div className="relative">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="message" className="text-lg text-default-400" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Note added:</strong>
                      Added post-call notes for <strong>Emily Watson</strong>
                      Follow-up set for next week to review proposal edits.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-default-100 border border-default-300 text-default-400">Internal Note</span>
                      <div>
                        <small className="text-default-400 align-middle">29 Jul, 2025, 11:15 AM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h6 className="text-xs font-bold mb-5 text-default-400">27 Jul, 2025</h6>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">03:00 PM</div>
                  <div className="after:border-default-300 relative after:absolute after:start-1/2 after:top-7 after:bottom-0 after:w-px after:border-e -ms-px after:border-dashed last:after:hidden">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="x" className="text-lg text-danger" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Deal lost: </strong>
                      Deal <strong>IT Revamp - BetaSoft</strong>
                      marked as lost due to pricing mismatch. Feedback recorded.
                    </p>
                    <div className="my-2.5">
                      <button className="btn btn-sm border-dark text-dark hover:bg-dark hover:text-white">Review Notes</button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-danger/15 text-danger">Lost</span>
                      <div>
                        <small className="text-default-400">27 Jul, 2025, 03:00 PM</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-5">
                  <div className="text-sm text-default-400 w-30 text-end">09:20 AM</div>
                  <div className="relative">
                    <div className="relative z-10">
                      <div className="flex justify-center items-center border border-dashed border-default-300 rounded-full size-7.5">
                        <Icon icon="edit" className="text-lg text-primary" />
                      </div>
                    </div>
                  </div>
                  <div className="grow pb-7.5">
                    <p className="mb-1.25">
                      <strong>Contact info updated:</strong> Phone and email updated for <strong>Jessica Tran </strong>. New contact details logged.
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="badge bg-default-100 border border-default-300 text-default-400">Updated</span>
                      <div>
                        <small className="text-default-400 align-middle">27 Jul, 2025, 09:20 AM</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center gap-3 md:p-5 p-3">
                <strong>Loading...</strong>
                <div className="animate-spin inline-block size-4 border-2 border-current border-t-transparent text-danger rounded-full" role="status" aria-label="loading">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
