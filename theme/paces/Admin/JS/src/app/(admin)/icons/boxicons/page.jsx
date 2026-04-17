import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Icon as IconifyIcon } from '@iconify/react'
export const metadata = {
  title: 'Boxicons',
}
export const boxIconData = [
  {
    iconName: 'bx:phone',
    name: 'Phone',
  },
  {
    iconName: 'bxs:balloon',
    name: 'Balloon',
  },
  {
    iconName: 'bx:headphone',
    name: 'Headphones',
  },
  {
    iconName: 'bx:camera',
    name: 'Camera',
  },
  {
    iconName: 'bx:microphone',
    name: 'Microphone',
  },
  {
    iconName: 'bx:game',
    name: 'Gamepad',
  },
  {
    iconName: 'bx:printer',
    name: 'Printer',
  },
  {
    iconName: 'bx:data',
    name: 'Database',
  },
  {
    iconName: 'bx:cloud',
    name: 'Cloud',
  },
  {
    iconName: 'bx:wifi',
    name: 'Wi-Fi',
  },
  {
    iconName: 'bx:lock-alt',
    name: 'Lock',
  },
  {
    iconName: 'bx:key',
    name: 'Key',
  },
  {
    iconName: 'bx:shield',
    name: 'Shield',
  },
  {
    iconName: 'bx:envelope',
    name: 'Mail',
  },
  {
    iconName: 'bx:user',
    name: 'User',
  },
  {
    iconName: 'bx:group',
    name: 'Users',
  },
  {
    iconName: 'bx:cart',
    name: 'Cart',
  },
  {
    iconName: 'bx:briefcase',
    name: 'Briefcase',
  },
  {
    iconName: 'bx:file',
    name: 'File',
  },
  {
    iconName: 'bx:book',
    name: 'Book',
  },
  {
    iconName: 'bx:search',
    name: 'Search',
  },
  {
    iconName: 'bx:bell',
    name: 'Notification',
  },
  {
    iconName: 'bx:cog',
    name: 'Settings',
  },
  {
    iconName: 'bx:calendar',
    name: 'Calendar',
  },
  {
    iconName: 'bx:flag',
    name: 'Flag',
  },
  {
    iconName: 'bx:music',
    name: 'Music',
  },
  {
    iconName: 'bx:film',
    name: 'Movie',
  },
  {
    iconName: 'bx:upload',
    name: 'Upload',
  },
  {
    iconName: 'bx:download',
    name: 'Download',
  },
  {
    iconName: 'bxl:facebook-circle',
    name: 'Facebook',
  },
  {
    iconName: 'bxl:twitter',
    name: 'Twitter',
  },
  {
    iconName: 'bxl:instagram',
    name: 'Instagram',
  },
  {
    iconName: 'bxl:linkedin-square',
    name: 'LinkedIn',
  },
  {
    iconName: 'bxl:github',
    name: 'GitHub',
  },
  {
    iconName: 'bxl:youtube',
    name: 'YouTube',
  },
  {
    iconName: 'bx:map',
    name: 'Location',
  },
  {
    iconName: 'bx:send',
    name: 'Send',
  },
  {
    iconName: 'bx:chat',
    name: 'Chat',
  },
  {
    iconName: 'bx:like',
    name: 'Like',
  },
  {
    iconName: 'bx:error',
    name: 'Warning',
  },
  {
    iconName: 'bx:check-double',
    name: 'Done',
  },
  {
    iconName: 'bx:child',
    name: 'Child',
  },
]
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Boxicons" subtitle="Icons" />

      <div className="container-fluid">
        <div className="card">
          <div className="card-header block">
            <h4 className="card-title mb-1.25">Overview</h4>
            <p className="text-default-400">Simple Open Source icons carefully crafted for designers &amp; developers</p>
          </div>

          <div className="card-body">
            <h4 className="mb-2 text-sm">Usage</h4>

            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="bx:camera" className="text-2xl" />
              <IconifyIcon icon="bx:heart" className="text-2xl" />
              <IconifyIcon icon="bx:star" className="text-2xl" />
              <IconifyIcon icon="bx:check" className="text-2xl" />
              <IconifyIcon icon="bx:bell" className="text-2xl" />
              <IconifyIcon icon="bx:cloud" className="text-2xl" />
              <IconifyIcon icon="bx:user" className="text-2xl" />
            </div>
          </div>

          <div className="card-body border-default-300 border-t border-dashed">
            <h4 className="mb-2 text-sm">Colors</h4>

            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="bx:home" className="text-primary text-2xl" />
              <IconifyIcon icon="bx:cog" className="text-secondary text-2xl" />
              <IconifyIcon icon="bx:calendar" className="text-success text-2xl" />
              <IconifyIcon icon="bx:message" className="text-info text-2xl" />
              <IconifyIcon icon="bx:flag" className="text-warning text-2xl" />
              <IconifyIcon icon="bx:folder" className="text-danger text-2xl" />
              <IconifyIcon icon="bx:globe" className="text-light text-2xl" />
              <IconifyIcon icon="bx:key" className="text-dark text-2xl" />
              <IconifyIcon icon="bx:layer" className="text-purple text-2xl" />
            </div>
          </div>
          <div className="card-body border-default-300 border-t border-dashed">
            <h4 className="mb-2 text-sm">Solid Icons Style</h4>

            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="bxs:star" className="text-primary text-2xl" />
              <IconifyIcon icon="bxs:user" className="text-secondary text-2xl" />
              <IconifyIcon icon="bxs:check-circle" className="text-success text-2xl" />
              <IconifyIcon icon="bxs:bell" className="text-info text-2xl" />
              <IconifyIcon icon="bxs:error-circle" className="text-warning text-2xl" />
              <IconifyIcon icon="bxs:file" className="text-danger text-2xl" />
              <IconifyIcon icon="bxs:tv" className="text-light text-2xl" />
              <IconifyIcon icon="bxs:lock" className="text-dark text-2xl" />
              <IconifyIcon icon="bxs:data" className="text-purple text-2xl" />
            </div>
          </div>
          <div className="card-body border-default-300 border-t border-dashed">
            <h4 className="mb-2 text-sm">Sizes</h4>

            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="bx:phone" className="size-9" />
              <IconifyIcon icon="bx:purchase-tag" className="size-7.5" />
              <IconifyIcon icon="bx:laptop" className="size-6" />
              <IconifyIcon icon="bx:devices" className="size-4.25" />
              <IconifyIcon icon="bx:game" className="size-3.75" />
              <IconifyIcon icon="bx:timer" className="size-3" />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="bx:timer" className="size-3.5" />
              <IconifyIcon icon="bx:timer" className="size-3.25" />
              <IconifyIcon icon="bx:timer" className="text-lg" />
              <IconifyIcon icon="bx:timer" className="size-5" />
              <IconifyIcon icon="bx:timer" className="size-6" />
              <IconifyIcon icon="bx:timer" className="size-8" />
              <IconifyIcon icon="bx:timer" className="size-9" />
              <IconifyIcon icon="bx:timer" className="size-10.5" />
              <IconifyIcon icon="bx:timer" className="size-15" />
            </div>
          </div>

          <div className="card-body border-default-300 border-t border-dashed">
            <h4 className="mt-0 mb-3">Icons</h4>
            <div className="align-items-center flex flex-wrap gap-3 text-center">
              {boxIconData.map((icon, idx) => (
                <div key={idx} className="border-default-300 flex size-20 flex-col items-center justify-center gap-3 truncate rounded border border-dashed">
                  <IconifyIcon icon={icon.iconName} className="text-2xl" />
                  <span className="block w-full truncate text-center font-semibold">{icon.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-3 text-center">
              <a href="https://tabler.io/icons" target="_blank" className="btn bg-danger text-white hover:bg-danger-hover">
                View All Icons
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default Page
