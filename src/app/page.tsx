// MUI Imports
import Button from '@mui/material/Button'

// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import FrontLayout from '@components/layout/front-pages'
import LandingPageWrapper from '@views/front-pages/landing-page'
import ScrollToTop from '@core/components/scroll-to-top'

// Context Imports
import { IntersectionProvider } from '@/contexts/intersectionContext'

// Config Imports
import { i18n } from '@configs/i18n'

// Util Imports
import { getServerMode, getSystemMode } from '@core/utils/serverHelpers'

const LandingPage = async () => {
  // Vars
  const direction = i18n.langDirection[i18n.defaultLocale]
  const mode = await getServerMode()
  const systemMode = await getSystemMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <IntersectionProvider>
          <FrontLayout>
            <LandingPageWrapper mode={mode} />
            <ScrollToTop className='mui-fixed'>
              <Button
                variant='contained'
                className='is-10 bs-10 rounded-full p-0 min-is-0 flex items-center justify-center'
              >
                <i className='tabler-arrow-up' />
              </Button>
            </ScrollToTop>
          </FrontLayout>
        </IntersectionProvider>
      </BlankLayout>
    </Providers>
  )
}

export default LandingPage
