// Third-party Imports
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

// Type Imports
import type { ChildrenType } from '@core/types'

// Layout Imports
import VerticalLayout from '@layouts/VerticalLayout'

// Component Imports
import Providers from '@/components/Providers'
import Navigation from '@/components/layout/vertical/Navigation'
import Navbar from '@/components/layout/vertical/Navbar'
import VerticalFooter from '@/components/layout/vertical/Footer'
import ScrollToTop from '@core/components/scroll-to-top'

// Auth Imports
import { authOptions } from '@/lib/auth'

// Util Imports
import { getMode } from '@core/utils/serverHelpers'

/**
 * Buyer authed app shell. Wraps /dashboard, /orders, /reviews, /settings with
 * Providers + VerticalLayout + Navigation + Navbar + Footer.
 *
 * Base: theme/vuexy/typescript-version/full-version/src/app/[lang]/(dashboard)/(private)/layout.tsx
 * Adapted: no locale prop / i18n dictionary; redirect directly to /auth/sign-in when
 * unauthenticated; ScrollToTop button without Customizer sidebar.
 */
export default async function BuyerAppLayout({ children }: ChildrenType) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/sign-in')
  }

  const direction = 'ltr'
  const mode = await getMode()

  return (
    <Providers direction={direction}>
      <VerticalLayout
        navigation={<Navigation mode={mode} />}
        navbar={<Navbar />}
        footer={<VerticalFooter />}
      >
        {children}
      </VerticalLayout>
      <ScrollToTop className='mui-fixed'>
        <button
          aria-label='scroll to top'
          className='is-10 bs-10 rounded-full p-0 bg-[var(--mui-palette-primary-main)] text-[var(--mui-palette-primary-contrastText)] flex items-center justify-center shadow-lg'
        >
          <i className='tabler-arrow-up' />
        </button>
      </ScrollToTop>
    </Providers>
  )
}
