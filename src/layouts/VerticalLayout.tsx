'use client'
import Customizer from '@/layouts/components/Customizer'
import Footer from '@/layouts/components/Footer'
import Sidenav from '@/layouts/components/Sidenav'
import TopBar from '@/layouts/components/TopBar'
import type { MenuItemType } from '@/types'
import { type ReactNode } from 'react'

const VerticalLayout = ({ children, menuItems }: { children: ReactNode; menuItems?: MenuItemType[] }) => {
  return (
    <>
      <div className="wrapper">
        <TopBar />
        <Sidenav items={menuItems} />
        <div className="page-content">
          <main>
            <div className="container-fluid">{children}</div>
          </main>
          <Footer />
        </div>
      </div>
      <Customizer />
    </>
  )
}

export default VerticalLayout
