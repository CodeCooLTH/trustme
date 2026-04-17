import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Contact Us' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Contact Us" subtitle="Pages" />

      <div className="card">
        <div className="card-body">
          <div className="bg-light rounded p-2.5">
            <iframe src="https://www.google.com/maps/embed/v1/place?q=Eiffel+Tower&key=AIzaSyBSFRN6WWGYwmFi498qXXsD2UwkbmD74v4" style={{ width: '100%', height: 360, overflow: 'hidden', border: 0 }} />
          </div>
          <div className="py-15">
            <div className="text-center">
              <span className="text-default-400 inline-block">📩 We’re here to help</span>
              <h3 className="mt-5 mb-7.5 text-2xl font-bold lg:mb-15">
                Get in Touch with <span className="bg-warning/15 p-1 dark:text-warning">Our Team</span>
              </h3>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-base">
              <div className="p-7.5">
                <div className="mb-15">
                  <div className="flex gap-base">
                    <div>
                      <div className="bg-secondary/15 text-secondary flex size-12 items-center justify-center rounded-full">
                        <Icon icon="phone-call" className="size-5.5" />
                      </div>
                    </div>
                    <div>
                      <span className="text-default-400">Contact Numbers</span>
                      <h5 className="my-2.5">+1 (800) 123-4567</h5>
                      <h5>+1 (415) 987-6543</h5>
                    </div>
                  </div>
                </div>
                <div className="mb-15">
                  <div className="flex gap-base">
                    <div>
                      <div className="bg-secondary/15 text-secondary flex size-12 items-center justify-center rounded-full">
                        <Icon icon="mail" className="size-5.5" />
                      </div>
                    </div>
                    <div>
                      <span className="text-default-400">Email</span>
                      <h5 className="my-2.5">support@yourcompany.com</h5>
                      <h5>info@yourcompany.com</h5>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex gap-base">
                    <div>
                      <div className="bg-secondary/15 text-secondary flex size-12 items-center justify-center rounded-full">
                        <Icon icon="map-pin" className="size-5.5" />
                      </div>
                    </div>
                    <div>
                      <span className="text-default-400">Address</span>
                      <h5 className="my-2.5">Premium HQ, 123 Market Street, 5th</h5>
                      <h5>Floor, Financial District, San Francisco, CA 94103, United States</h5>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-span-1 lg:col-span-2">
                <div className="border-default-300 rounded-2xl border border-dashed p-6 md:p-7.5">
                  <div className="col-span-1 grid lg:grid-cols-2 gap-base">
                    <div>
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input type="text" className="form-input" id="name" placeholder="Enter your full name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">
                        Email Address
                      </label>
                      <input type="text" className="form-input" id="email" placeholder="Enter your email" />
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input type="text" className="form-input" id="subject" placeholder="What’s the reason for contact?" />
                    </div>
                    <div className="col-span-1 lg:col-span-2">
                      <label htmlFor="message" className="form-label">
                        Message
                      </label>
                      <textarea className="form-textarea" rows={5} id="message" placeholder="Write your message here..." />
                    </div>
                  </div>
                  <div className="mt-5 text-end">
                    <button type="submit" className="btn bg-primary rounded-full text-white">
                      Send Message
                    </button>
                  </div>
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
