import PageBreadcrumb from '@/components/PageBreadcrumb'
export const metadata = {
  title: 'Popovers',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Popovers" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid xl:grid-cols-2 gap-base">
          <div className="space-y-base">
            <div className="card">
              <SimplePopover />
            </div>
            <div className="card">
              <HoverPopovers />
            </div>
            <div className="card">
              <CustomPopovers />
            </div>
          </div>
          <div className="space-y-base">
            <div className="card">
              <DismissOnPopover />
            </div>
            <div className="card">
              <FourDirections />
            </div>
            <div className="card">
              <DisabledPopover />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
const SimplePopover = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Simple Popover</h4>
      </div>
      <div className="card-body">
        <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
          <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
            <button type="button" className="btn bg-info hover:bg-info-hover text-white disabled:pointer-events-none disabled:opacity-50">
              Get Support Info
            </button>
            <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card text-start opacity-0 transition-opacity" role="tooltip">
              <div className="bg-default-100 border-default-300 border-b px-3.5 py-3">
                <h3>Need Help?</h3>
              </div>
              <div className="p-5">Click here to get support from our team. We&apos;re here 24/7 to assist you.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const HoverPopovers = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Hover</h4>
      </div>
      <div className="card-body">
        <div className="hs-tooltip inline-block [--placement:right] [--trigger:hover]">
          <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
            <button type="button" className="btn bg-dark text-white disabled:pointer-events-none disabled:opacity-50">
              Please Hover Me
            </button>
            <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card text-start opacity-0 transition-opacity" role="tooltip">
              <div className="bg-default-100 border-default-300 border-b px-3.5 py-3">
                <h3>Exciting Features!</h3>
              </div>
              <div className="p-5">Discover features you didn’t know existed. Hover to explore more!</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const CustomPopovers = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Custom Popovers</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap items-center gap-3">
          <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-primary hover:bg-primary-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Primary Popover
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-70 hidden w-55 text-start text-white opacity-0 transition-opacity" role="tooltip">
                <div className="bg-primary rounded-t-md px-3.5 py-3">
                  <h3>Primary Popover</h3>
                </div>
                <div className="bg-primary rounded-b-md px-4 py-2">This is a primary-themed popover styled using CSS variables.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-success hover:bg-success-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Success Popover
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-70 hidden w-55 text-start text-white opacity-0 transition-opacity" role="tooltip">
                <div className="bg-success rounded-t-md px-3.5 py-3">
                  <h3>Success Popover</h3>
                </div>
                <div className="bg-success rounded-b-md px-4 py-2">This is a success-themed popover styled using CSS variables.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-danger hover:bg-danger-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Danger Popover
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-70 hidden w-55 text-start text-white opacity-0 transition-opacity" role="tooltip">
                <div className="bg-danger rounded-t-md px-3.5 py-3">
                  <h3>Danger Popover</h3>
                </div>
                <div className="bg-danger rounded-b-md px-4 py-2">This is a danger-themed popover styled using CSS variables.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-info hover:bg-info-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Info Popover
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-70 hidden w-55 text-start text-white opacity-0 transition-opacity" role="tooltip">
                <div className="bg-info rounded-t-md px-3.5 py-3">
                  <h3>Info Popover</h3>
                </div>
                <div className="bg-info rounded-b-md px-4 py-2">This is an info-themed popover styled using CSS variables.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-dark text-white disabled:pointer-events-none disabled:opacity-50">
                Dark Popover
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-70 hidden w-55 text-start text-white opacity-0 transition-opacity" role="tooltip">
                <div className="bg-dark rounded-t-md px-3.5 py-3">
                  <h3>Dark Popover</h3>
                </div>
                <div className="bg-dark rounded-b-md px-4 py-2">This is a dark-themed popover styled using CSS variables.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-secondary hover:bg-secondary-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Secondary Popover
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible invisible absolute z-70 hidden w-55 text-start text-white opacity-0 transition-opacity" role="tooltip">
                <div className="bg-secondary rounded-t-md px-3.5 py-3">
                  <h3>Secondary Popover</h3>
                </div>
                <div className="bg-secondary rounded-b-md px-4 py-2">This is a secondary-themed popover styled using CSS variables.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const DismissOnPopover = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Dismiss on Next Click</h4>
      </div>
      <div className="card-body">
        <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
          <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
            <button type="button" className="btn bg-primary hover:bg-primary-hover text-white disabled:pointer-events-none disabled:opacity-50">
              Show Tips
            </button>
            <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card text-start opacity-0 transition-opacity" role="tooltip">
              <div className="bg-default-100 border-default-300 border-b px-3.5 py-3">
                <h3>Quick Tips</h3>
              </div>
              <div className="p-5">Get quick tips and tricks to improve your workflow instantly.</div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const FourDirections = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Four Directions</h4>
      </div>
      <div className="card-body">
        <div className="flex flex-wrap items-center gap-3">
          <div className="hs-tooltip inline-block [--placement:top] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-primary hover:bg-primary-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Popover on top
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card text-start opacity-0 transition-opacity" role="tooltip">
                <div className="bg-default-100 border-default-300 border-b px-3.5 py-3">
                  <h3>Top Popover</h3>
                </div>
                <div className="p-5">This popover appears above the button. Great for tips or info.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:bottom] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-primary hover:bg-primary-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Popover on bottom
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card text-start opacity-0 transition-opacity" role="tooltip">
                <div className="bg-default-100 border-default-300 border-b px-3.5 py-3">
                  <h3>Bottom Popover</h3>
                </div>
                <div className="p-5">This popover shows below. Perfect for additional details.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:right] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-primary hover:bg-primary-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Popover on right
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card text-start opacity-0 transition-opacity" role="tooltip">
                <div className="bg-default-100 border-default-300 border-b px-3.5 py-3">
                  <h3>Right Popover</h3>
                </div>
                <div className="p-5">Slide in from the right to provide quick insights.</div>
              </div>
            </div>
          </div>
          <div className="hs-tooltip inline-block [--placement:left] [--trigger:click]">
            <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
              <button type="button" className="btn bg-primary hover:bg-primary-hover text-white disabled:pointer-events-none disabled:opacity-50">
                Popover on left
              </button>
              <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card text-start opacity-0 transition-opacity" role="tooltip">
                <div className="bg-default-100 border-default-300 border-b px-3.5 py-3">
                  <h3>Left Popover</h3>
                </div>
                <div className="p-5">Appears on the left side. Great for tooltips or notes.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
const DisabledPopover = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Disabled Elements</h4>
      </div>
      <div className="card-body">
        <div className="hs-tooltip inline-block [--placement:top] [--trigger:click]">
          <div className="hs-tooltip-toggle block text-center" tabIndex={0}>
            <button type="button" className="btn bg-primary text-white disabled:pointer-events-none disabled:opacity-50" disabled>
              Disabled Button
            </button>
            <div className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible border-default-300 invisible absolute z-70 hidden w-70 rounded-md border bg-card p-5 text-start opacity-0 transition-opacity" role="tooltip">
              This button is disabled, but the popover still works.
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
