// MUI Imports
import Button from '@mui/material/Button'

// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import LayoutWrapper from '@layouts/LayoutWrapper'
import VerticalLayout from '@layouts/VerticalLayout'
import HorizontalLayout from '@layouts/HorizontalLayout'

// Component Imports
import SellerNavigation from '@components/layout/vertical/SellerNavigation'
import Header from '@components/layout/horizontal/Header'
import Navbar from '@components/layout/vertical/Navbar'
import VerticalFooter from '@components/layout/vertical/Footer'
import HorizontalFooter from '@components/layout/horizontal/Footer'
import ScrollToTop from '@core/components/scroll-to-top'
import AuthGuard from '@/hocs/AuthGuard'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getDictionary } from '@/utils/getDictionary'
import { getMode, getSystemMode } from '@core/utils/serverHelpers'

const SellerDashboardLayout = async ({ children }: ChildrenType) => {
  const dictionary = await getDictionary(i18n.defaultLocale)
  const mode = await getMode()
  const systemMode = await getSystemMode()

  return (
    <AuthGuard locale={i18n.defaultLocale}>
      <LayoutWrapper
        systemMode={systemMode}
        verticalLayout={
          <VerticalLayout
            navigation={<SellerNavigation mode={mode} />}
            navbar={<Navbar />}
            footer={<VerticalFooter />}
          >
            {children}
          </VerticalLayout>
        }
        horizontalLayout={
          <HorizontalLayout header={<Header dictionary={dictionary} />} footer={<HorizontalFooter />}>
            {children}
          </HorizontalLayout>
        }
      />
      <ScrollToTop className='mui-fixed'>
        <Button
          variant='contained'
          className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
        >
          <i className='tabler-arrow-up' />
        </Button>
      </ScrollToTop>
    </AuthGuard>
  )
}

export default SellerDashboardLayout
