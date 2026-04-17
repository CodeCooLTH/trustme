import PageBreadcrumb from '@/components/PageBreadcrumb'
export const metadata = {
  title: 'Tooltips',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Tooltips" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid xl:grid-cols-2 gap-base">
          <div className="space-y-6">
            <div className="card">
              <BasicTooltips />
            </div>
            <div className="card">
              <DisabledElements />
            </div>
            <div className="card">
              <HoverElements />
            </div>
          </div>
          <div className="space-y-6">
            <div className="card">
              <FourDirections />
            </div>
            <div className="card">
              <HTMLTags />
            </div>
            <div className="card">
              <ColorTooltips />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
const BasicTooltips = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Basic</h4>
      </div>
      <div className="card-body">
        <p className="text-default-400 mb-4">Hover over the links below to see tooltips.</p>
        <p>
          Powerful admin features like&nbsp;
          <span className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle text-primary">
              custom dashboards
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Manage your dashboard easily
              </span>
            </button>
          </span>
          &nbsp;and UI components help you build scalable web applications efficiently. This template includes pre-built pages, clean layouts, and reusable code blocks to boost your development workflow. From user management to analytics and settings, everything is modular and
          developer-friendly. Create modern admin panels with&nbsp;
          <span className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle text-primary">
              responsive design
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Built with TailwindCSS 4
              </span>
            </button>
          </span>
          &nbsp;and seamless UX. Get started quickly with a professional-grade
          <span className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle text-primary">
              UI toolkit
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Tailored for developers
              </span>
            </button>
          </span>
          &nbsp;and supercharge your app with&nbsp;
          <span className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle text-primary">
              powerful components
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Includes charts, tables, forms and more
              </span>
            </button>
          </span>
          &nbsp;and flexible layouts.
        </p>
      </div>
    </>
  )
}
const DisabledElements = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Disabled Elements</h4>
      </div>
      <div className="card-body">
        <div className="hs-tooltip inline-block [--placement:top]">
          <button type="button" className="hs-tooltip-toggle btn bg-primary text-white" disabled>
            Disabled Button
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
              Disabled tooltip
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
const HoverElements = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Hover Elements</h4>
      </div>
      <div className="card-body">
        <div className="hs-tooltip inline-block [--placement:top]">
          <button type="button" className="hs-tooltip-toggle btn bg-primary hover:bg-primary-hover text-white">
            Hover to See Info
            <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
              Tooltip appears on hover only
            </span>
          </button>
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
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-info hover:bg-info-hover text-white">
              Tooltip on top
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Tooltip on top
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:bottom]">
            <button type="button" className="hs-tooltip-toggle btn bg-info hover:bg-info-hover text-white">
              Tooltip on bottom
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Tooltip on bottom
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:left]">
            <button type="button" className="hs-tooltip-toggle btn bg-info hover:bg-info-hover text-white">
              Tooltip on left
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Tooltip on left
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:right]">
            <button type="button" className="hs-tooltip-toggle btn bg-info hover:bg-info-hover text-white">
              Tooltip on right
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                Tooltip on right
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
const HTMLTags = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">HTML Tags</h4>
      </div>
      <div className="card-body">
        <p className="text-default-400 mb-4">And with custom HTML added:</p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-secondary hover:bg-secondary-hover text-white">
              Tooltip with HTML
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                <em>New</em>
                <u>Tooltip</u>
                <b>with</b>
                <i>HTML</i>
                <br />
                Custom message here!
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
const ColorTooltips = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Color Tooltips</h4>
      </div>
      <div className="card-body">
        <p className="text-default-400 mb-4">Use color tooltips to match your theme and highlight elements with a custom background color.</p>
        <div className="flex flex-wrap items-center gap-3">
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-primary hover:bg-primary-hover text-white">
              Primary tooltip
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-primary invisible absolute z-10 inline-block w-46 rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                This is a primary tooltip with a custom style.
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-danger hover:bg-danger-hover text-white">
              Danger tooltip
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-danger invisible absolute z-10 inline-block w-46 rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                This is a danger tooltip with a custom warning message.
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-info hover:bg-info-hover text-white">
              Info tooltip
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-info invisible absolute z-10 inline-block w-46 rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                This is a primary tooltip with a custom style.
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-success hover:bg-info-hover text-white">
              Success tooltip
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-success invisible absolute z-10 inline-block w-46 rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                This is a success tooltip to indicate completion.
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-secondary hover:bg-secondary-hover text-white">
              Secondary tooltip
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-secondary invisible absolute z-10 inline-block w-46 rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                This is a secondary tooltip that gives additional information.
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-warning hover:bg-warning-hover text-white">
              Warning tooltip
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-warning invisible absolute z-10 inline-block w-46 rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                This is a warning tooltip to alert you.
              </span>
            </button>
          </div>
          <div className="hs-tooltip inline-block [--placement:top]">
            <button type="button" className="hs-tooltip-toggle btn bg-dark text-white">
              Dark tooltip
              <span className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible bg-dark invisible absolute z-10 inline-block w-46 rounded px-2 py-1 text-sm font-medium text-white opacity-0 shadow-2xs transition-opacity" role="tooltip">
                This is a dark tooltip with important information.
              </span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
