import PageBreadcrumb from '@/components/PageBreadcrumb'
import Icon from '@/components/wrappers/Icon'
import { META_DATA } from '@/config/constants'
import { featureData } from './components/data'
import FeatureCard from './components/FeatureCard'
import SidePanel from './components/SidePanel'

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Pro AI" subtitle="Apps" />

      <div className="lg:flex gap-1.5 lg:h-[calc(100vh-190px)]">
        <div className="w-full lg:w-70">
          <SidePanel />
        </div>
        <div className="card h-[calc(100vh-190px)] w-full overflow-y-auto">
          <div className="card-header gap-2 text-start lg:hidden">
            <button className="btn btn-sm btn-icon border-default-300">
              <Icon icon="menu-4" className="text-default-600 size-6" aria-haspopup="dialog" aria-expanded="false" aria-controls="outlookSidebaroffcanvas" aria-label="Toggle navigation" data-hs-overlay="#outlookSidebaroffcanvas" />
            </button>
          </div>
          <div className="card-body">
            <div className="mx-auto mt-5 w-full lg:w-3/5">
              <div className="bg-dark mx-auto size-8 rounded-full">
                <span className="btn btn-icon size-8 rounded-full text-white">
                  <Icon icon="sparkles" />
                </span>
              </div>
              <h3 className="mt-3 mb-9 text-center text-2xl">How can I help, {META_DATA.username} 👋?</h3>
              <div className="grid grid-cols-1 gap-3 py-9 md:grid-cols-3 mb-base">
                {featureData.map((feature, idx) => (
                  <FeatureCard key={idx} feature={feature} />
                ))}
              </div>
            </div>
          </div>
          <div className="p-12 mt-auto">
            <textarea className="form-textarea" id="exampleFormControlTextarea1" rows={4} placeholder="Enter message" defaultValue={''} />
            <div className="mt-3 flex items-center justify-between">
              <div className="flex gap-1.5">
                <div className="hs-tooltip inline-block [--placement:top]">
                  <button type="button" className="hs-tooltip-toggle btn btn-icon size-8 border-default-300 hover:text-primary">
                    <Icon icon="paperclip" />
                    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-default-900 invisible absolute z-10 inline-block rounded px-2 py-1 text-xs font-medium text-default-100 opacity-0 shadow-2xs transition-opacity" role="tooltip">
                      Attach files
                    </span>
                  </button>
                </div>
                <div className="hs-tooltip inline-block [--placement:top]">
                  <button type="button" className="hs-tooltip-toggle btn btn-icon size-8 border-default-300 hover:text-primary">
                    <Icon icon="link" />
                    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-default-900 invisible absolute z-10 inline-block rounded px-2 py-1 text-xs font-medium text-default-100 opacity-0 shadow-2xs transition-opacity" role="tooltip">
                      Insert link
                    </span>
                  </button>
                </div>
                <div className="hs-tooltip inline-block [--placement:top]">
                  <button type="button" className="hs-tooltip-toggle btn btn-icon size-8 border-default-300 hover:text-primary">
                    <Icon icon="photo-up" />
                    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-default-900 invisible absolute z-10 inline-block rounded px-2 py-1 text-xs font-medium text-default-100 opacity-0 shadow-2xs transition-opacity" role="tooltip">
                      Insert photo
                    </span>
                  </button>
                </div>
                <div className="hs-tooltip inline-block [--placement:top]">
                  <button type="button" className="hs-tooltip-toggle btn btn-icon size-8 border-default-300 hover:text-primary">
                    <Icon icon="microphone" />
                    <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-default-900 invisible absolute z-10 inline-block rounded px-2 py-1 text-xs font-medium text-default-100 opacity-0 shadow-2xs transition-opacity" role="tooltip">
                      Voice
                    </span>
                  </button>
                </div>
              </div>
              <div className="ms-auto">
                <button type="button" className="btn btn-sm bg-primary text-white hover:bg-primary-hover">
                  <Icon icon="send-2" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
