// Component Imports
import SellerLoginV2 from '@views/seller/auth/SellerLoginV2'

// Server Action Imports
import { getServerMode } from '@core/utils/serverHelpers'

const SellerLoginPage = async () => {
  const mode = await getServerMode()

  return <SellerLoginV2 mode={mode} />
}

export default SellerLoginPage
