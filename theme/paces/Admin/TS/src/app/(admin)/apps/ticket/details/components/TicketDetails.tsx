import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import Icon from '@/components/wrappers/Icon'
import { cn } from '@/utils/helpers'
import Image from 'next/image'
import Link from 'next/link'
import { timelineData } from './data'

const TicketDetails = () => {
  return (
    <div className="lg:col-span-2">
      <div className="card">
        <div className="card-header">
          <div>
            <h5>
              #SUP-2523 -<span className="text-default-400 text-sm">App freezes when uploading files</span>
            </h5>
          </div>
          <div>
            <span className="badge badge-label bg-warning text-white">Pending</span>
          </div>
        </div>
        <div className="card-body">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-base mb-7.5">
            <div>
              <h6 className="text-default-400 mb-2 text-xs uppercase">Requested By</h6>
              <div className="flex items-center gap-2.5">
                <Image src={user5} alt="Ava Sullivan" className="size-8 rounded-full" />
                <span>Ava Sullivan</span>
              </div>
            </div>
            <div>
              <h6 className="text-default-400 mb-2 text-xs uppercase">Assigned Agent</h6>
              <div className="flex items-center gap-2.5">
                <Image src={user4} alt="Liam Brooks" className="size-8 rounded-full" />
                <span>Liam Brooks</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-base mb-7.5">
            <div>
              <h6 className="text-default-400 mb-2 text-xs uppercase">Priority</h6>
              <span className="badge bg-danger text-white hover:bg-danger-hover">High</span>
            </div>
            <div>
              <h6 className="text-default-400 mb-2 text-xs uppercase">Created On</h6>
              <p>
                05 Aug, 2025
                <small className="text-default-400">1:20 PM</small>
              </p>
            </div>
            <div>
              <h6 className="text-default-400 mb-2 text-xs uppercase">Due Date</h6>
              <p>09 Aug, 2025</p>
            </div>
          </div>
          <div className="mb-7.5">
            <h6 className="text-default-400 mb-2 text-xs uppercase">Description</h6>
            <p>When trying to upload files through the project form, the application becomes unresponsive after selecting a file larger than 5MB. This issue occurs consistently across browsers. Please investigate and apply a fix.</p>
          </div>
          <div className="mb-7.5">
            <h6 className="text-default-400 mb-2 text-xs uppercase">Tags</h6>
            <div className="inline-flex flex-wrap gap-1.5">
              <span className="badge bg-light text-dark">Upload</span>
              <span className="badge bg-light text-dark">Performance</span>
              <span className="badge bg-light text-dark">UI Bug</span>
            </div>
          </div>
          <div className="mb-7.5">
            <h6 className="text-default-400 mb-7.5 text-xs uppercase">Activity:</h6>
            <div>
              {timelineData.map((item, idx) => (
                <div className="flex gap-x-5" key={idx}>
                  <div className="w-15 text-end md:w-25">
                    <span className="text-default-400">{item.time}</span>
                  </div>
                  <div className={cn('after:border-default-300 relative after:absolute after:start-1/2 after:top-3 after:bottom-0 after:w-px after:border-e -ms-px after:border-dashed last:after:hidden', idx === timelineData.length - 1 && 'after:hidden')}>
                    <div className="relative z-10 flex items-center justify-center">
                      <div className={cn('bg-success ms-0.5 size-3.25 rounded-full', item.bulletClassName)} />
                    </div>
                  </div>
                  <div className="flex-1 pb-7.5">
                    <h5 className="mb-1.25">{item.title}</h5>
                    <p className="text-default-400 mb-1.25">{item.description}</p>
                    <span className="text-primary font-semibold">By {item.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Link href="/apps/ticket/create" className="btn bg-primary text-white hover:bg-primary-hover">
              <Icon icon="pencil" />
              Edit Ticket
            </Link>
            <Link href="#" className="btn bg-danger text-white hover:bg-danger-hover">
              <Icon icon="x" />
              Close Ticket
            </Link>
            <Link href="/apps/ticket/list" className="btn border-secondary hover:bg-secondary text-secondary hover:text-white">
              <Icon icon="arrow-left" />
              Back to List
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TicketDetails
