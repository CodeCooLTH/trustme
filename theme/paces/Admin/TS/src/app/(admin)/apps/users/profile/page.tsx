import profile from '@/assets/images/profile-bg.jpg'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { Metadata } from 'next'
import About from './components/About'
import ProfileCard from './components/ProfileCard'
import Settings from './components/Settings'
import TimeLine from './components/TimeLine'

export const metadata: Metadata = { title: 'Profile' }

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Profile" subtitle="Pages" />

      <div>
        <article className="card">
          <div className="relative overflow-hidden h-62.5 bg-cover bg-center rounded-md" style={{ minHeight: 300, backgroundImage: `url(${profile.src})` }}>
            <div className="absolute inset-0 flex flex-col items-center justify-center p-7.5 bg-linear-to-t from-[#313A46] via-[#313a46cc] to-[#313a4680] text-center">
              <h3 className="text-white italic text-2xl mb-1.25">&quot;Crafting innovation through clean design&quot;</h3>
              <p className="text-white mb-5">– MyStatus</p>
            </div>
          </div>
        </article>
      </div>
      <div className="-mt-7.5 md:px-6 px-4">
        <div className="grid lg:grid-cols-3 grid-cols-1 gap-base">
          <div>
            <ProfileCard />
          </div>
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header border-solid">
                <h4 className="card-title">My Account</h4>
                <nav className="nav-tabs" aria-label="Tabs" id="staffTabs" role="tablist" aria-orientation="horizontal">
                  <button type="button" className="nav-link hs-tab-active:border-primary hs-tab-active:text-primary border-b px-4 font-semibold border-transparent" id="about-tab" aria-selected="true" data-hs-tab="#about" aria-controls="about" role="tab">
                    <span className="md:block hidden">About Me</span>
                    <Icon icon="user-circle" className="md:hidden block text-base" />
                  </button>
                  <button type="button" className="nav-link hs-tab-active:border-primary hs-tab-active:text-primary border-b px-4 font-semibold border-transparent active" id="timeline-tab" aria-selected="false" data-hs-tab="#timeline" aria-controls="timeline" role="tab">
                    <span className="md:block hidden">Timeline</span>
                    <Icon icon="clock" className="md:hidden block text-base" />
                  </button>
                  <button type="button" className="nav-link hs-tab-active:border-primary hs-tab-active:text-primary border-b px-4 font-semibold border-transparent" id="Settings-tab" aria-selected="false" data-hs-tab="#Settings" aria-controls="Settings" role="tab">
                    <span className="md:block hidden">Settings</span>
                    <Icon icon="settings" className="md:hidden block text-base" />
                  </button>
                </nav>
              </div>
              <div className="card-body">
                <div className="hidden" id="about" role="tabpanel" aria-labelledby="about-tab">
                  <About />
                </div>
                <div className="active" id="timeline" role="tabpanel" aria-labelledby="timeline-tab">
                  <TimeLine />
                </div>
                <div className="hidden" id="Settings" role="tabpanel" aria-labelledby="Settings-tab">
                  <Settings />
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
