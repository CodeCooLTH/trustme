import Icon from '@/components/wrappers/Icon'
import { SimpleBar } from '@/components/wrappers/SimpleBar'
import { cn } from '@/utils/helpers'
import Link from 'next/link'
import { conversationData, mainMenuData, workspaceData } from './data'
const SidePanel = () => {
  return (
    <div
      id="outlookSidebaroffcanvas"
      className="hs-overlay hs-overlay-open:translate-x-0 w-70 card lg:rounded rounded-none fixed start-0 top-0 bottom-0 z-60 hidden h-full -translate-x-full transform transition-transform duration-300 [--auto-close:lg] lg:static lg:end-auto lg:bottom-0 lg:block! lg:translate-x-0"
      role="dialog"
      tabIndex={-1}
      aria-label="Sidebar"
    >
      <SimpleBar className="card-body h-full">
        <div className="mb-9">
          {mainMenuData.map((item, idx) => (
            <Link
              key={idx}
              href=""
              className={cn(' hover:bg-default-100 flex w-full items-center gap-3 font-medium rounded px-3.75 py-2.25', {
                'bg-default-100': idx === 0,
              })}
            >
              {item.icon && <Icon icon={item.icon} className="text-md" />}
              {item.label}
            </Link>
          ))}
        </div>
        <div className="mb-9">
          <h6 className="text-default-400 mb-3 text-xs uppercase">Workspaces</h6>
          {workspaceData.map((item, idx) => (
            <Link href="" key={idx} className="hover:bg-default-100 flex w-full items-center gap-3 font-medium rounded px-3.75 py-2.25">
              {item.icon && <Icon icon={item.icon} className="text-md" />}
              {item.label}
            </Link>
          ))}
        </div>
        <div>
          <h6 className="text-default-400 mb-3 text-xs uppercase">Recent Conversations</h6>

          {conversationData.map((item, idx) => (
            <Link key={idx} href="" className="hover:bg-default-100 flex w-full items-center gap-3 font-medium rounded px-3.75 py-2.25">
              {item.label}
            </Link>
          ))}
        </div>
      </SimpleBar>
    </div>
  )
}
export default SidePanel
