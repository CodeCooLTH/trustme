// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import FrontLayout from '@components/layout/front-pages'
import LandingPageWrapper from '@views/front-pages/landing-page'

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
          </FrontLayout>
        </IntersectionProvider>
      </BlankLayout>
    </Providers>
  )
}

export default LandingPage
