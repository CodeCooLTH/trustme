import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Icon as IconifyIcon } from '@iconify/react'
import { Metadata } from 'next'

export const metadata: Metadata = { title: 'Solar Broken' }

export type SolarBrokenIconType = {
  iconName: string
  name: string
}

export const solarBrokenIconData: SolarBrokenIconType[] = [
  { iconName: 'phone-broken', name: 'Phone' },
  { iconName: 'camera-broken', name: 'Camera' },
  { iconName: 'microphone-2-broken', name: 'Microphone' },
  { iconName: 'gamepad-broken', name: 'Gamepad' },
  { iconName: 'printer-broken', name: 'Printer' },
  { iconName: 'database-broken', name: 'Database' },
  { iconName: 'cloud-broken', name: 'Cloud' },
  { iconName: 'lock-keyhole-broken', name: 'Lock' },
  { iconName: 'key-broken', name: 'Key' },
  { iconName: 'shield-check-broken', name: 'Shield' },
  { iconName: 'letter-broken', name: 'Mail' },
  { iconName: 'user-broken', name: 'User' },
  { iconName: 'users-group-two-rounded-broken', name: 'Users' },
  { iconName: 'cart-3-broken', name: 'Cart' },
  { iconName: 'file-broken', name: 'File' },
  { iconName: 'book-2-broken', name: 'Book' },
  { iconName: 'bell-broken', name: 'Notification' },
  { iconName: 'settings-broken', name: 'Settings' },
  { iconName: 'calendar-broken', name: 'Calendar' },
  { iconName: 'flag-broken', name: 'Flag' },
  { iconName: 'music-note-3-broken', name: 'Music' },
  { iconName: 'upload-broken', name: 'Upload' },
  { iconName: 'download-broken', name: 'Download' },
  { iconName: 'home-broken', name: 'Home' },
  { iconName: 'user-broken', name: 'User' },
  { iconName: 'users-group-rounded-broken', name: 'Users' },
  { iconName: 'settings-broken', name: 'Settings' },
  { iconName: 'bell-broken', name: 'Notification' },
  { iconName: 'calendar-broken', name: 'Calendar' },
  { iconName: 'chat-round-dots-broken', name: 'Chat' },
  { iconName: 'phone-broken', name: 'Phone' },
  { iconName: 'camera-broken', name: 'Camera' },
  { iconName: 'music-note-3-broken', name: 'Music' },
  { iconName: 'heart-broken', name: 'Heart' },
  { iconName: 'like-broken', name: 'Like' },
  { iconName: 'star-broken', name: 'Star' },
  { iconName: 'map-point-broken', name: 'Location' },
  { iconName: 'compass-broken', name: 'Compass' },
  { iconName: 'map-broken', name: 'Map' },
  { iconName: 'compass-square-broken', name: 'Navigation' },
  { iconName: 'cart-broken', name: 'Cart' },
  { iconName: 'wallet-broken', name: 'Wallet' },
]

const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Solar Broken" subtitle="Icons" />

      <div className="container-fluid">
        <div className="card">
          <div className="card-header block">
            <h4 className="card-title mb-1.25">Overview</h4>
            <p className="text-default-400">Solar Broken is a modern set of outline-style SVG icons, free to use and easy to customize with CSS.</p>
          </div>

          <div className="card-body">
            <h4 className="mb-2 text-sm">Usage</h4>

            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="solar:camera-broken" className="text-2xl" />
              <IconifyIcon icon="solar:heart-broken" className="text-2xl" />
              <IconifyIcon icon="solar:star-broken" className="text-2xl" />
              <IconifyIcon icon="solar:check-circle-broken" className="text-2xl" />
              <IconifyIcon icon="solar:bell-broken" className="text-2xl" />
              <IconifyIcon icon="solar:cloud-broken" className="text-2xl" />
              <IconifyIcon icon="solar:user-broken" className="text-2xl" />
            </div>
          </div>

          <div className="card-body border-default-300 border-t border-dashed">
            <h4 className="mb-2 text-sm">Colors</h4>

            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="solar:home-broken" className="text-primary text-2xl" />
              <IconifyIcon icon="solar:settings-broken" className="text-secondary text-2xl" />
              <IconifyIcon icon="solar:calendar-broken" className="text-success text-2xl" />
              <IconifyIcon icon="solar:chat-round-dots-broken" className="text-info text-2xl" />
              <IconifyIcon icon="solar:flag-broken" className="text-warning text-2xl" />
              <IconifyIcon icon="solar:folder-broken" className="text-danger text-2xl" />
              <IconifyIcon icon="solar:adhesive-plaster-broken" className="text-light text-2xl" />
              <IconifyIcon icon="solar:key-broken" className="text-dark text-2xl" />
              <IconifyIcon icon="solar:layers-broken" className="text-purple text-2xl" />
            </div>
          </div>
          <div className="card-body border-default-300 border-t border-dashed">
            <h4 className="mb-2 text-sm">Sizes</h4>

            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="solar:phone-broken" className="size-9" />
              <IconifyIcon icon="solar:tag-price-broken" className="size-7.5" />
              <IconifyIcon icon="solar:laptop-2-broken" className="size-5" />
              <IconifyIcon icon="solar:tablet-broken" className="size-3.25" />
              <IconifyIcon icon="solar:gamepad-broken" className="size-3.5" />
              <IconifyIcon icon="solar:alarm-broken" className="size-2.75" />
            </div>
            <div className="mt-3 flex items-center gap-3">
              <IconifyIcon icon="solar:watch-square-broken" className="size-3" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-3.25" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-3.75" />
              <IconifyIcon icon="solar:watch-square-broken" className="text-lg" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-5" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-6" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-7.5" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-9" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-10" />
              <IconifyIcon icon="solar:watch-square-broken" className="size-15" />
            </div>
          </div>

          <div className="card-body border-default-300 border-t border-dashed">
            <h4 className="mt-0 mb-3">Icons</h4>
            <div className="align-items-center flex flex-wrap gap-3 text-center">
              {solarBrokenIconData.map((item, idx) => (
                <div key={idx} className="border-default-300 flex size-20 flex-col items-center justify-center gap-3 truncate rounded border border-dashed">
                  <IconifyIcon icon={`solar:${item.iconName}`} className="text-2xl" />
                  <span className="block w-full truncate text-center font-semibold">{item.name}</span>
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
