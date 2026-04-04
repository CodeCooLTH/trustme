// Next Imports
import { Noto_Sans_Thai } from 'next/font/google'

// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Type Imports
import type { ChildrenType } from '@core/types'

// Util Imports
import { getSystemMode } from '@core/utils/serverHelpers'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-noto-sans-thai'
})

export const metadata = {
  title: 'SafePay - Secure Payment Platform',
  description: 'SafePay - Secure escrow payment platform for safe online transactions'
}

const RootLayout = async ({ children }: ChildrenType) => {
  // Vars
  const systemMode = await getSystemMode()

  return (
    <html id='__next' lang='th' dir='ltr' suppressHydrationWarning>
      <body
        className={`${notoSansThai.variable} flex is-full min-bs-full flex-auto flex-col`}
        style={{ fontFamily: 'var(--font-noto-sans-thai), sans-serif' }}
      >
        <InitColorSchemeScript attribute='data' defaultMode={systemMode} />
        {children}
      </body>
    </html>
  )
}

export default RootLayout
