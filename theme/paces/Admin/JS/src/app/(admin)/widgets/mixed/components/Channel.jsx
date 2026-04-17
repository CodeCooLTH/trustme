import flower from '@/assets/images/flower-style.svg'
import user10 from '@/assets/images/users/user-10.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user3 from '@/assets/images/users/user-3.jpg'
import user4 from '@/assets/images/users/user-4.jpg'
import user5 from '@/assets/images/users/user-5.jpg'
import user7 from '@/assets/images/users/user-7.jpg'
import user8 from '@/assets/images/users/user-8.jpg'
import user9 from '@/assets/images/users/user-9.jpg'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import React from 'react'
import { channelData } from './data'
const Channel = () => {
  return (
    <>
      <div className="flex flex-col gap-base">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Channels</h4>
          </div>
          <div className="card-body">
            {channelData.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="flex justify-between items-center mb-1.25">
                  <div className="flex items-center gap-2">
                    <Image src={item.image} alt="Meta" className="size-4 rounded" />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-semibold">{item.progress}%</span>
                </div>
                <div className="flex w-full h-2 mb-base bg-default-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={78} aria-valuemin={0} aria-valuemax={100}>
                  <div
                    className="bg-success"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  />
                </div>
              </React.Fragment>
            ))}

            <button className="btn bg-primary text-white hover:bg-primary-hover w-full mt-2.5">Download Reports</button>
          </div>
        </div>
        <div className="card bg-secondary bg-linear-to-b from-white/30 to-white/0">
          <div
            className="card-body rounded-md"
            style={{
              backgroundImage: `url(${flower.src})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right bottom',
            }}
          >
            <h5 className="mb-1.25 text-white font-semibold">Company Contact</h5>
            <p className="text-white/75 mb-base">Get in touch with our support team.</p>
            <div className="mb-2.5 text-white/75 flex items-center text-sm">
              <Icon icon="mail" className="me-2.5 text-white" />
              support@company.com
            </div>
            <div className="mb-2.5 text-white/75 flex items-center text-sm">
              <Icon icon="phone" className="me-2.5 text-white" />
              +1 (234) 567-890
            </div>
            <a href="mailto:support@company.com" className="btn bg-light w-full hover:text-primary">
              Contact Support
            </a>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-base">
        <div className="card">
          <div className="card-body">
            <div className="flex items-center mb-base text-default-400">
              <span className="me-1.25">★</span>
              <span>
                <strong>Dane</strong>, Your Project Progress Can <strong>Inspire</strong> Your Team
              </span>
            </div>
            <div className="flex items-center -space-x-2 mb-base">
              <Image src={user7} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
              <Image src={user8} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
              <Image src={user9} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
              <Image src={user10} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
            </div>
            <p className="mb-1.25">
              <strong>5 Team Members</strong> are currently waiting for your update on this project.
            </p>
            <p className="text-default-400 text-xs mb-base">Share your progress and the team will be notified instantly.</p>
            <button className="btn bg-info text-white w-full rounded-full hover:bg-info-hover">Update Project</button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="flex justify-between items-start mb-base">
              <div>
                <h6 className="mb-1.25 text-2xs">Project Update Needed</h6>
                <span className="text-default-400">Your team is waiting for your input</span>
              </div>
              <span className="badge bg-warning text-white">Pending</span>
            </div>
            <div className="flex items-center mb-base">
              <div className="flex items-center -space-x-2 me-2.5">
                <Image src={user2} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
                <Image src={user3} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
                <Image src={user4} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
                <Image src={user5} alt="user" className="transitio-all size-8 rounded-full duration-200 hover:-translate-y-1" />
              </div>
              <small className="text-default-400 ms-1.25">+3 more reviewers</small>
            </div>

            <div className="mb-base">
              <p className="mb-1.25">
                <strong>Design System Revamp</strong> requires your final approval.
              </p>
              <p className="text-default-400 italic">Once approved, the development team will begin implementing the new UI components.</p>
            </div>

            <div className="mb-base">
              <div className="flex justify-between mb-2.5">
                <small className="text-default-400">Progress</small>
                <small className="font-semibold">72%</small>
              </div>
              <div className="flex w-full h-2 bg-default-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}>
                <div
                  className="bg-success"
                  style={{
                    width: '72%',
                  }}
                />
              </div>
            </div>

            <button className="btn bg-primary text-white w-full rounded-full hover:bg-primary-hover">Review &amp; Approve</button>
          </div>
        </div>
      </div>
    </>
  )
}
export default Channel
