// View Imports
import RegisterView from '@views/pages/auth/RegisterView'

// Util Imports
import { getServerMode } from '@core/utils/serverHelpers'

const RegisterPage = async () => {
  // Vars
  const mode = await getServerMode()

  return <RegisterView mode={mode} />
}

export default RegisterPage
