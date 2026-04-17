import PageBreadcrumb from '@/components/PageBreadcrumb'
export const metadata = {
  title: 'List Group',
}
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="List Group" subtitle="Base UI" />

      <div className="container-fluid">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-base">
          <div className="col-span-1">
            <div className="card">
              <BasicExample />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <ActiveItems />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <DisabledItems />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <LinksAndButtons />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <Flush />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <Horizontal />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <ContextualClasses />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <ContextualClasseswithLink />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <CustomContent />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <WithBadges />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <CheckboxesandRadios />
            </div>
          </div>
          <div className="col-span-1">
            <div className="card">
              <Numbered />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
const BasicExample = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Basic Example</h4>
      </div>
      <div className="card-body">
        <ul className="border-default-300 divide-default-200 divide-y rounded border">
          <li className="flex items-center gap-1.5 px-4.75 py-3">Dropbox Cloud Storage</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Slack Team Collaboration</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Microsoft Windows OS</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Zendesk Customer Support</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Stripe Payment Integration</li>
        </ul>
      </div>
    </>
  )
}
const ActiveItems = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Active Items</h4>
      </div>
      <div className="card-body">
        <ul className="border-default-300 divide-default-200 divide-y rounded border">
          <li className="bg-default-100 flex items-center gap-1.5 px-4.75 py-3">GitHub Repository</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Figma Design Tool</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Notion Workspace</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Trello Task Manager</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">DigitalOcean Cloud</li>
        </ul>
      </div>
    </>
  )
}
const DisabledItems = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Disabled Items</h4>
      </div>
      <div className="card-body">
        <ul className="border-default-300 divide-default-200 divide-y rounded border">
          <li className="bg-default-100 text-default-400 flex items-center gap-1.5 px-4.75 py-3">Dropbox Cloud Storage</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Slack Team Collaboration</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Microsoft Windows OS</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Zendesk Customer Support</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Stripe Payment Integration</li>
        </ul>
      </div>
    </>
  )
}
const LinksAndButtons = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Links and Buttons</h4>
      </div>
      <div className="card-body">
        <div className="border-default-300 divide-default-200 divide-y rounded border">
          <a href="#" className="bg-default-100 flex items-center gap-1.5 px-4.75 py-3">
            Stripe Payment Integration
          </a>
          <a href="#" className="hover:bg-default-100 flex items-center gap-1.5 px-4.75 py-3">
            Dropbox Cloud Service
          </a>
          <button type="button" className="hover:bg-default-100 focus:bg-default-100 flex w-full items-center gap-1.5 px-4.75 py-3">
            Slack Communication
          </button>
          <button type="button" className="hover:bg-default-100 focus:bg-default-100 flex w-full items-center gap-1.5 px-4.75 py-3">
            Notion Productivity App
          </button>
          <a href="#" className="bg-default-100 text-default-400 flex items-center gap-1.5 px-4.75 py-3">
            Zendesk Support Tool
          </a>
        </div>
      </div>
    </>
  )
}
const Flush = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Flush</h4>
      </div>
      <div className="card-body">
        <ul>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Slack Collaboration Tool</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Dropbox Cloud Storage</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Notion Workspace Organizer</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Zendesk Customer Support</li>
          <li className="flex items-center gap-1.5 px-4.75 py-3">Stripe Payment Processor</li>
        </ul>
      </div>
    </>
  )
}
const Horizontal = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Horizontal</h4>
      </div>
      <div className="card-body">
        <ul className="divide-default-200 border-default-300 mb-5 inline-flex divide-x rounded border">
          <li className="px-4.75 py-3">Slack</li>
          <li className="px-4.75 py-3">Notion</li>
          <li className="px-4.75 py-3">Dropbox</li>
        </ul>
        <ul className="divide-default-200 border-default-300 mb-5 inline-flex divide-x rounded border">
          <li className="px-4.75 py-3">Figma</li>
          <li className="px-4.75 py-3">Stripe</li>
          <li className="px-4.75 py-3">Zendesk</li>
        </ul>
        <ul className="divide-default-200 border-default-300 inline-flex divide-x rounded border">
          <li className="px-4.75 py-3">Trello</li>
          <li className="px-4.75 py-3">Asana</li>
          <li className="px-4.75 py-3">ClickUp</li>
        </ul>
      </div>
    </>
  )
}
const ContextualClasses = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Contextual Classes</h4>
      </div>
      <div className="card-body">
        <ul className="border-default-300 rounded border">
          <li className="border-default-300 border border-t-0 px-4.75 py-3">Dapibus ac facilisis in</li>
          <li className="text-primary bg-primary/15 border-primary border border-t-0 px-4.75 py-3">A simple primary list group item</li>
          <li className="text-secondary bg-secondary/15 border-secondary border border-t-0 px-4.75 py-3">A simple secondary list group item</li>
          <li className="text-success bg-success/15 border-success border border-t-0 px-4.75 py-3">A simple success list group item</li>
          <li className="text-danger bg-danger/15 border-danger border border-t-0 px-4.75 py-3">A simple danger list group ite</li>
          <li className="text-warning bg-warning/15 border-warning border border-t-0 px-4.75 py-3">A simple warning list group item</li>
          <li className="text-info bg-info/15 border-info border border-t-0 px-4.75 py-3">A simple info list group item</li>
          <li className="bg-light/15 text-default-400 border-light border border-t-0 px-4.75 py-3">A simple light list group item</li>
          <li className="text-dark bg-dark/15 border-dark border border-t-0 px-4.75 py-3">A simple dark list group item</li>
        </ul>
      </div>
    </>
  )
}
const ContextualClasseswithLink = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Contextual Classes with Link</h4>
      </div>
      <div className="card-body">
        <div className="border-default-300 rounded border">
          <a href="#" className="border-default-300 block border border-t-0 px-4.75 py-3">
            Dapibus ac facilisis in
          </a>
          <a href="#" className="hover:bg-primary/40 bg-primary/15 border-primary block border border-t-0 px-4.75 py-3">
            A simple primary list group item
          </a>
          <a href="#" className="hover:bg-secondary/40 bg-secondary/15 border-secondary block border border-t-0 px-4.75 py-3">
            A simple secondary list group item
          </a>
          <a href="#" className="hover:bg-success/40 bg-success/15 border-success block border border-t-0 px-4.75 py-3">
            A simple success list group item
          </a>
          <a href="#" className="hover:bg-danger/40 bg-danger/15 border-danger block border border-t-0 px-4.75 py-3">
            A simple danger list group ite
          </a>
          <a href="#" className="hover:bg-warning/40 bg-warning/15 border-warning block border border-t-0 px-4.75 py-3">
            A simple warning list group item
          </a>
          <a href="#" className="hover:bg-info/40 bg-info/15 border-info block border border-t-0 px-4.75 py-3">
            A simple info list group item
          </a>
          <a href="#" className="hover:bg-light/40 bg-light/15 border-light block border border-t-0 px-4.75 py-3">
            A simple light list group item
          </a>
          <a href="#" className="hover:bg-dark/40 bg-dark/15 border-dark block border border-t-0 px-4.75 py-3">
            A simple dark list group item
          </a>
        </div>
      </div>
    </>
  )
}
const CustomContent = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Custom Content</h4>
      </div>
      <div className="card-body">
        <div className="border-default-300 divide-default-200 divide-y rounded border">
          <a href="#" className="bg-default-100 block px-4.75 py-3">
            <div className="flex items-center justify-between">
              <h5 className="mb-2">List group item heading</h5>
              <small className="text-[10px]">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-[10px]">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="hover:bg-default-100 focus:bg-default-100 block px-4.75 py-3">
            <div className="flex items-center justify-between">
              <h5 className="mb-2">List group item heading</h5>
              <small className="text-[10px]">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-[10px]">Donec id elit non mi porta.</small>
          </a>
          <a href="#" className="hover:bg-default-100 focus:bg-default-100 block px-4.75 py-3">
            <div className="flex items-center justify-between">
              <h5 className="mb-2">List group item heading</h5>
              <small className="text-[10px]">3 days ago</small>
            </div>
            <p className="mb-1">Donec id elit non mi porta gravida at eget metus. Maecenas sed diam eget risus varius blandit.</p>
            <small className="text-[10px]">Donec id elit non mi porta.</small>
          </a>
        </div>
      </div>
    </>
  )
}
const WithBadges = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">With Badges</h4>
      </div>
      <div className="card-body">
        <ul className="divide-default-200 border-default-300 divide-y rounded border">
          <li className="flex items-center justify-between gap-1.5 px-4.75 py-3">
            Gmail Notifications
            <span className="badge bg-primary text-white">14</span>
          </li>
          <li className="flex items-center justify-between gap-1.5 px-4.75 py-3">
            Unprocessed Orders
            <span className="badge bg-success text-white">2</span>
          </li>
          <li className="flex items-center justify-between gap-1.5 px-4.75 py-3">
            Urgent Tickets
            <span className="badge bg-danger text-white">99+</span>
          </li>
          <li className="flex items-center justify-between gap-1.5 px-4.75 py-3">
            Completed Transactions
            <span className="bg-success rounded-full px-0.75 py-0.5 text-[10px] font-semibold text-white">20+</span>
          </li>
          <li className="flex items-center justify-between gap-1.5 px-4.75 py-3">
            Invoices Awaiting Approval
            <span className="bg-warning rounded-full px-0.75 py-0.5 text-[10px] font-semibold text-white">12</span>
          </li>
        </ul>
      </div>
    </>
  )
}
const CheckboxesandRadios = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Checkboxes and Radios</h4>
      </div>
      <div className="card-body">
        <div className="divide-default-200 border-default-300 divide-y rounded border">
          <div className="flex items-center gap-2 px-4.75 py-3">
            <input type="checkbox" className="form-checkbox size-4.25" id="newsletterCheckbox" />
            <label htmlFor="newsletterCheckbox">Subscribe to newsletter</label>
          </div>
          <div className="flex items-center gap-2 px-4.75 py-3">
            <input type="checkbox" className="form-checkbox size-4.25" id="termsCheckbox" />
            <label htmlFor="termsCheckbox">Accept terms and conditions</label>
          </div>
        </div>
        <div className="divide-default-200 border-default-300 mt-3 divide-y rounded border">
          <div className="flex items-center gap-2 px-4.75 py-3">
            <input type="radio" name="notificationOptions" className="form-checkbox size-4.25 rounded-full" id="emailRadio" defaultChecked />
            <label htmlFor="emailRadio">Notify by Email</label>
          </div>
          <div className="flex items-center gap-2 px-4.75 py-3">
            <input type="radio" name="notificationOptions" className="form-checkbox size-4.25 rounded-full" id="smsRadio" />
            <label htmlFor="smsRadio">Notify by SMS</label>
          </div>
        </div>
      </div>
    </>
  )
}
const Numbered = () => {
  return (
    <>
      <div className="card-header">
        <h4 className="card-title">Numbered</h4>
      </div>
      <div className="card-body">
        <ul className="divide-default-200 border-default-300 divide-y rounded border">
          <li className="flex justify-between gap-1.5 px-4.75 py-3">
            <div className="flex gap-3">
              <div>1.</div>
              <div>
                <div className="font-bold">Admin Dashboard Pro</div>A premium admin dashboard with modern UI components.
              </div>
            </div>
            <div>
              <span className="bg-primary rounded-full px-0.75 py-0.5 text-[10px] font-semibold text-white">865</span>
            </div>
          </li>
          <li className="flex justify-between gap-1.5 px-4.75 py-3">
            <div className="flex gap-3">
              <div>2.</div>
              <div>
                <div className="font-bold">Vue Admin Lite</div>
                Clean and minimal admin panel built with Vue.js.
              </div>
            </div>
            <div>
              <span className="bg-primary rounded-full px-0.75 py-0.5 text-[10px] font-semibold text-white">140</span>
            </div>
          </li>
          <li className="flex justify-between gap-1.5 px-4.75 py-3">
            <div className="flex gap-3">
              <div>3.</div>
              <div>
                <div className="font-bold">Angular Admin Panel</div>
                Lightweight and powerful Angular-based admin template. 85
              </div>
            </div>
            <div>
              <span className="bg-primary rounded-full px-0.75 py-0.5 text-[10px] font-semibold text-white">85</span>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
