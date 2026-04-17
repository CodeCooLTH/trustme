// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

// Component Imports
import FrontLayout from '@components/layout/front-pages'
import LandingPageWrapper from '@views/front-pages/landing-page'

export default async function MarketingHomePage() {
  const mode = await getServerMode()

  return (
    <FrontLayout>
      <LandingPageWrapper mode={mode} />
    </FrontLayout>
  )
}
