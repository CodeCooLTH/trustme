import bgCard from '@/assets/images/auth-card-bg.svg'
import user1 from '@/assets/images/users/user-1.jpg'
import user2 from '@/assets/images/users/user-2.jpg'
import user7 from '@/assets/images/users/user-7.jpg'
import user8 from '@/assets/images/users/user-8.jpg'
import user9 from '@/assets/images/users/user-9.jpg'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import Image from 'next/image'
import { branchData, featureData, teamMemberData } from './components/data'
export const metadata = {
  title: 'About Us',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="About Us" subtitle="Pages" />

      <div className="container-fluid">
        <div className="card">
          <div className="card-body">
            <div className="bg-light/50 rounded px-4 md:px-4 lg:px-0 relative">
              <div className="mx-auto lg:w-2/3 py-8 text-center md:py-18">
                <span className="text-default-400 font-semibold italic">Trusted by 1M+ AI innovators worldwide</span>

                <div className="mt-5 flex justify-center -space-x-2">
                  <Image src={user7} alt="Ava Lee" className="object-cover size-8 rounded-full transition-all hover:-translate-y-1" />
                  <Image src={user8} alt="Ethan King" className="object-cover size-8 rounded-full transition-all hover:-translate-y-1" />
                  <Image src={user9} alt="Lucas White" className="object-cover size-8 rounded-full transition-all hover:-translate-y-1" />
                  <Image src={user1} alt="Lucas White" className="object-cover size-8 rounded-full transition-all hover:-translate-y-1" />
                  <Image src={user2} alt="Lucas White" className="object-cover size-8 rounded-full transition-all hover:-translate-y-1" />
                </div>

                <h1 className="my-7.5 text-3xl font-bold md:text-4xl md:leading-snug">
                  Accelerate Innovation with the
                  <span className="text-primary">&nbsp;AI Control Panel</span>–<span className="text-default-400 italic">Smart.Scalable. Built for the Future.</span>
                </h1>
                <p className="text-default-400 mx-auto mb-7.5 leading-relaxed lg:max-w-4xl">
                  Design, deploy, and manage machine learning models faster than ever. Our AI Control Panel empowers teams to collaborate, monitor, and scale securely with intuitive dashboards and cutting-edge analytics.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <a href="#!" target="_blank" className="btn py-3 font-semibold bg-light text-dark hover:text-primary">
                    <Icon icon="phone-ringing" className="text-lg" />
                    Get a Demo
                  </a>
                </div>
              </div>
              <Image src={bgCard} className="max-h-87.5 absolute top-0 end-0" height={350} width={375} alt="auth-card-bg" />
            </div>
            <section className="border-default-300 border-b border-dashed py-8 md:py-15">
              <div className="container">
                <div className="mb-8 text-center md:mb-10 lg:mb-15">
                  <span className="text-default-400 inline-block rounded-md">💼 Tailored Solutions for Every Need</span>
                  <h3 className="text-default-900 mt-base text-2xl font-bold">
                    Explore Our Professional <span className="text-primary">Services</span> and Expertise
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-base md:gap-x-15 md:gap-y-4 lg:grid-cols-3">
                  {featureData.map((item, idx) => (
                    <div className="border-0 p-4 text-center md:p-6" key={idx}>
                      <div>
                        <div className="bg-secondary/15 text-secondary mx-auto mb-5 flex size-12 items-center justify-center rounded-full">
                          <Icon icon={item.icon} className="size-5.5" />
                        </div>
                        <h4 className="mb-2.5 text-lg">{item.title}</h4>
                        <p className="text-default-400 mb-5">{item.description}</p>
                        <a href="#" className="text-primary flex items-center justify-center gap-1 text-sm">
                          Know more
                          <Icon icon="arrow-right" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="py-8 md:py-15">
              <div className="container">
                <div className="mb-8 text-center md:mb-10 lg:mb-15">
                  <h3 className="text-default-900 text-xl font-bold">
                    Meet Our <span className="bg-warning/15 text-warning rounded px-1.5 py-1">Dedicated</span> Team
                  </h3>
                </div>
                <div className="mb-5 flex flex-wrap justify-center *:2xl:w-1/5 *:md:w-1/3 w-full -mx-3 *:mb-base">
                  {teamMemberData.map((member, idx) => (
                    <div className="px-2.5" key={idx}>
                      <div className="card border-light">
                        <div className="card-body text-center">
                          <div className="mx-auto mb-base size-37.5">
                            <Image src={member.image} alt={member.name} className="rounded" />
                          </div>
                          <h4 className="text-default-700 mb-1.25 text-base">{member.name}</h4>
                          <p className="text-default-400 italic">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <section className="bg-light/25 rounded border border-dashed border-default-300 px-6 py-8 md:px-15 md:py-15">
              <div className="container">
                <div className="mb-8 text-center md:mb-10 lg:mb-15">
                  <h3 className="text-default-900 text-xl font-bold">
                    Expanding Horizons.
                    <span className="text-primary">Empowering</span> Futures
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-base lg:grid-cols-3">
                  {branchData.map((branch, idx) => (
                    <div className="card border-light p-2.5" key={idx}>
                      <div className="card-body">
                        <Image src={branch.image} alt="" className="mb-5 size-12 rounded-full" />
                        <h4 className="mb-2.5 text-lg">{branch.country}</h4>
                        <p className="text-default-400 mb-5">
                          {branch.address.map((line, i) => (
                            <span key={i}>
                              {line}
                              <br />
                            </span>
                          ))}
                        </p>

                        <a href="#" className="text-primary flex items-center justify-start gap-1 text-sm">
                          Contact Us
                          <Icon icon="arrow-right" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
