import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Icon as IconifyIcon } from '@iconify/react'
export const metadata = {
  title: 'Remix',
}
export const remixIconData = [
  {
    iconName: 'phone-line',
    name: 'Phone',
  },
  {
    iconName: 'percent-line',
    name: 'Discount',
  },
  {
    iconName: 'headphone-line',
    name: 'Headphones',
  },
  {
    iconName: 'camera-line',
    name: 'Camera',
  },
  {
    iconName: 'mic-line',
    name: 'Microphone',
  },
  {
    iconName: 'gamepad-line',
    name: 'Gamepad',
  },
  {
    iconName: 'printer-line',
    name: 'Printer',
  },
  {
    iconName: 'database-2-line',
    name: 'Database',
  },
  {
    iconName: 'cloud-line',
    name: 'Cloud',
  },
  {
    iconName: 'wifi-line',
    name: 'Wi-Fi',
  },
  {
    iconName: 'lock-line',
    name: 'Lock',
  },
  {
    iconName: 'key-2-line',
    name: 'Key',
  },
  {
    iconName: 'shield-line',
    name: 'Shield',
  },
  {
    iconName: 'mail-line',
    name: 'Mail',
  },
  {
    iconName: 'user-3-line',
    name: 'User',
  },
  {
    iconName: 'group-line',
    name: 'Users',
  },
  {
    iconName: 'shopping-cart-line',
    name: 'Cart',
  },
  {
    iconName: 'briefcase-line',
    name: 'Briefcase',
  },
  {
    iconName: 'file-text-line',
    name: 'File',
  },
  {
    iconName: 'book-2-line',
    name: 'Book',
  },
  {
    iconName: 'search-line',
    name: 'Search',
  },
  {
    iconName: 'bell-line',
    name: 'Notification',
  },
  {
    iconName: 'settings-3-line',
    name: 'Settings',
  },
  {
    iconName: 'calendar-line',
    name: 'Calendar',
  },
  {
    iconName: 'flag-line',
    name: 'Flag',
  },
  {
    iconName: 'camera-line',
    name: 'Camera',
  },
  {
    iconName: 'music-2-line',
    name: 'Music',
  },
  {
    iconName: 'movie-line',
    name: 'Movie',
  },
  {
    iconName: 'upload-line',
    name: 'Upload',
  },
  {
    iconName: 'download-line',
    name: 'Download',
  },
  {
    iconName: 'facebook-circle-line',
    name: 'Facebook',
  },
  {
    iconName: 'twitter-x-line',
    name: 'Twitter X',
  },
  {
    iconName: 'instagram-line',
    name: 'Instagram',
  },
  {
    iconName: 'linkedin-box-line',
    name: 'LinkedIn',
  },
  {
    iconName: 'github-line',
    name: 'GitHub',
  },
  {
    iconName: 'youtube-line',
    name: 'YouTube',
  },
  {
    iconName: 'map-pin-line',
    name: 'Location',
  },
  {
    iconName: 'send-plane-line',
    name: 'Send',
  },
  {
    iconName: 'chat-3-line',
    name: 'Chat',
  },
  {
    iconName: 'thumb-up-line',
    name: 'Like',
  },
  {
    iconName: 'error-warning-line',
    name: 'Warning',
  },
  {
    iconName: 'check-double-line',
    name: 'Done',
  },
]
const Page = () => {
  return (
    <>
      <PageBreadcrumb title="Remix" subtitle="Icons" />

      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xxl-10">
            <div className="card">
              <div className="card-header block">
                <h4 className="card-title mb-1.25">Overview</h4>
                <p className="text-default-400">Open-source neutral-style system symbols elaborately crafted for designers and developers. All of the icons are free for both personal and commercial use.</p>
              </div>
              <div className="card-body">
                <h4 className="mb-2 text-sm">Usage</h4>

                <div className="mt-3 flex items-center gap-3">
                  <IconifyIcon icon="ri:camera-line" className="text-2xl" />
                  <IconifyIcon icon="ri:heart-line" className="text-2xl" />
                  <IconifyIcon icon="ri:star-line" className="text-2xl" />
                  <IconifyIcon icon="ri:check-line" className="text-2xl" />
                  <IconifyIcon icon="ri:notification-3-line" className="text-2xl" />
                  <IconifyIcon icon="ri:cloud-line" className="text-2xl" />
                  <IconifyIcon icon="ri:user-line" className="text-2xl" />
                </div>
              </div>
              <div className="card-body border-default-300 border-t border-dashed">
                <h4 className="mb-2 text-sm">Colors</h4>

                <div className="mt-3 flex items-center gap-3">
                  <IconifyIcon icon="ri:home-4-line" className="text-primary text-2xl" />
                  <IconifyIcon icon="ri:settings-3-line" className="text-secondary text-2xl" />
                  <IconifyIcon icon="ri:calendar-line" className="text-success text-2xl" />
                  <IconifyIcon icon="ri:message-3-line" className="text-info text-2xl" />
                  <IconifyIcon icon="ri:flag-line" className="text-warning text-2xl" />
                  <IconifyIcon icon="ri:folder-line" className="text-danger text-2xl" />
                  <IconifyIcon icon="ri:global-line" className="text-light text-2xl" />
                  <IconifyIcon icon="ri:key-2-line" className="text-dark text-2xl" />
                  <IconifyIcon icon="ri:stack-line" className="text-purple text-2xl" />
                </div>
              </div>
              <div className="card-body border-default-300 border-t border-dashed">
                <h4 className="mb-2 text-sm">Fill Colors</h4>

                <div className="mt-3 flex items-center gap-3">
                  <IconifyIcon icon="ri:star-fill" className="text-primary text-2xl" />
                  <IconifyIcon icon="ri:user-fill" className="text-secondary text-2xl" />
                  <IconifyIcon icon="ri:checkbox-circle-fill" className="text-success text-2xl" />
                  <IconifyIcon icon="ri:notification-3-fill" className="text-info text-2xl" />
                  <IconifyIcon icon="ri:alert-fill" className="text-warning text-2xl" />
                  <IconifyIcon icon="ri:file-text-fill" className="text-danger text-2xl" />
                  <IconifyIcon icon="ri:tv-fill" className="text-light text-2xl" />
                  <IconifyIcon icon="ri:lock-fill" className="text-dark text-2xl" />
                  <IconifyIcon icon="ri:database-2-fill" className="text-purple text-2xl" />
                </div>
              </div>
              <div className="card-body border-default-300 border-t border-dashed">
                <h4 className="mb-2 text-sm">Sizes</h4>

                <div className="mt-3 flex items-center gap-3">
                  <IconifyIcon icon="ri:phone-line" className="text-xs" />
                  <IconifyIcon icon="ri:coupon-2-line" className="text-sm" />
                  <IconifyIcon icon="ri:macbook-line" className="text-base" />
                  <IconifyIcon icon="ri:tablet-line" className="text-lg" />
                  <IconifyIcon icon="ri:gamepad-line" className="text-xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-2xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-3xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-4xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-5xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-6xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-7xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-8xl" />
                  <IconifyIcon icon="ri:timer-line" className="text-9xl" />
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <IconifyIcon icon="ri:timer-line" />
                  <IconifyIcon icon="ri:timer-line" className="size-3.25" />
                  <IconifyIcon icon="ri:timer-line" className="size-3.75" />
                  <IconifyIcon icon="ri:timer-line" className="text-base" />
                  <IconifyIcon icon="ri:timer-line" className="text-lg" />
                  <IconifyIcon icon="ri:timer-line" className="size-6" />
                  <IconifyIcon icon="ri:timer-line" className="size-8" />
                  <IconifyIcon icon="ri:timer-line" className="size-9" />
                  <IconifyIcon icon="ri:timer-line" className="size-10.5" />
                  <IconifyIcon icon="ri:timer-line" className="size-15" />
                </div>
              </div>
              <div className="card-body border-default-300 border-t border-dashed">
                <h4 className="mt-0 mb-3">Icons</h4>
                <div className="align-items-center flex flex-wrap gap-3 text-center">
                  {remixIconData.map((item, idx) => (
                    <div className="border-default-300 flex size-20 flex-col items-center justify-center gap-3 truncate rounded border border-dashed" key={idx}>
                      <IconifyIcon icon={`ri:${item.iconName}`} className="text-xl" />
                      <span className="block w-full truncate text-center font-semibold">{item.name}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center">
                  <a href="https://remixicon.com/" target="_blank" className="btn bg-danger text-white hover:bg-danger-hover">
                    View All Icons
                  </a>
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
