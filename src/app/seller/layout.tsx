// Type Imports
import type { ChildrenType } from '@core/types'

// Component Imports
import Providers from '@components/Providers'

// Config Imports
import { i18n } from '@configs/i18n'

const SellerLayout = ({ children }: ChildrenType) => {
  const direction = i18n.langDirection[i18n.defaultLocale]

  return <Providers direction={direction}>{children}</Providers>
}

export default SellerLayout
