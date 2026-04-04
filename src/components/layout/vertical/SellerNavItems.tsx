'use client'

// MUI Imports
import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Type Imports
import type { VerticalMenuContextProps } from '@menu/components/vertical-menu/Menu'

// Component Imports
import { Menu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

type RenderExpandIconProps = {
  open?: boolean
  transitionDuration?: VerticalMenuContextProps['transitionDuration']
}

const RenderExpandIcon = ({ open, transitionDuration }: RenderExpandIconProps) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

type Props = {
  scrollMenu: (container: any, isPerfectScrollbar: boolean) => void
}

const SellerNavItems = ({ scrollMenu }: Props) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()

  // Vars
  const { isBreakpointReached, transitionDuration } = verticalNavOptions

  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: (container: any) => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: (container: any) => scrollMenu(container, true)
          })}
    >
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/seller/dashboard' icon={<i className='tabler-layout-dashboard' />}>
          แดชบอร์ด
        </MenuItem>
        <MenuItem href='/seller/products' icon={<i className='tabler-package' />}>
          สินค้า
        </MenuItem>
        <MenuItem href='/seller/orders' icon={<i className='tabler-shopping-bag' />}>
          คำสั่งซื้อ
        </MenuItem>
        <MenuItem href='/seller/orders/create' icon={<i className='tabler-plus' />}>
          สร้างคำสั่งซื้อ
        </MenuItem>
        <MenuItem href='/seller/reviews' icon={<i className='tabler-star' />}>
          รีวิว
        </MenuItem>
        <MenuSection label='ตั้งค่า'>
          <MenuItem href='/seller/settings/shop' icon={<i className='tabler-building-store' />}>
            ร้านค้า
          </MenuItem>
          <MenuItem href='/seller/settings/verification' icon={<i className='tabler-shield-check' />}>
            ยืนยันตัวตน
          </MenuItem>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default SellerNavItems
