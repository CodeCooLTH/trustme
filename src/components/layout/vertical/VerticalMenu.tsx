'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import { useSession } from 'next-auth/react'
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, MenuItem } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

type SafePaySessionUser = {
  id?: string
  username?: string
  isShop?: boolean
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { data: session } = useSession()
  const user = (session?.user ?? {}) as SafePaySessionUser

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  const sellerUrl = process.env.NEXT_PUBLIC_SELLER_URL ?? 'https://seller.deepthailand.app/dashboard'

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: (container) => scrollMenu(container, false),
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container) => scrollMenu(container, true),
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
      >
        <MenuItem href='/dashboard' icon={<i className='tabler-smart-home' />}>
          หน้าหลัก
        </MenuItem>
        <MenuItem href='/orders' icon={<i className='tabler-shopping-bag' />}>
          คำสั่งซื้อของฉัน
        </MenuItem>
        <MenuItem href='/reviews' icon={<i className='tabler-star' />}>
          รีวิวที่ให้
        </MenuItem>
        <MenuItem href='/settings/verification' icon={<i className='tabler-shield-check' />}>
          ยืนยันตัวตน
        </MenuItem>
        <MenuItem href='/settings/profile' icon={<i className='tabler-user-cog' />}>
          แก้ไขโปรไฟล์
        </MenuItem>
        {user.username && (
          <MenuItem
            href={`/u/${user.username}`}
            icon={<i className='tabler-external-link' />}
            target='_blank'
          >
            โปรไฟล์สาธารณะ
          </MenuItem>
        )}
        {user.isShop && (
          <MenuItem
            href={sellerUrl}
            icon={<i className='tabler-building-store' />}
            target='_blank'
            suffix={<i className='tabler-external-link text-base' />}
          >
            ไปหน้าร้านค้า
          </MenuItem>
        )}
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
