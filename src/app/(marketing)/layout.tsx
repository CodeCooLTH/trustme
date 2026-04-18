// Next Imports
import type { Metadata } from 'next'
import { Anuphan } from 'next/font/google'

// MUI Imports
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

// Type Imports
import type { ChildrenType } from '@core/types'

// Context Imports
import { VerticalNavProvider } from '@menu/contexts/verticalNavContext'
import { SettingsProvider } from '@core/contexts/settingsContext'
import { IntersectionProvider } from '@/contexts/intersectionContext'

// Component Imports
import ThemeProvider from '@components/theme'

// Util Imports
import { getMode, getSettingsFromCookie, getSystemMode } from '@core/utils/serverHelpers'

import ToastMount from '@/components/ToastMount'

import './marketing.css'

const anuphan = Anuphan({
  subsets: ['thai', 'latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700'],
  variable: '--font-anuphan',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Deep — ซื้อขายออนไลน์อย่างมั่นใจ',
  description:
    'Deep คือระบบสร้างความน่าเชื่อถือสำหรับการซื้อขายออนไลน์ ผ่านการยืนยันตัวตน Trust Score และ Badge เพื่อลดปัญหามิจฉาชีพ',
  keywords: ['Deep', 'Trust Score', 'ซื้อขายออนไลน์', 'ยืนยันตัวตน', 'มิจฉาชีพ'],
}

export default async function MarketingRootLayout({ children }: ChildrenType) {
  const direction = 'ltr'
  const mode = await getMode()
  const settingsCookie = await getSettingsFromCookie()
  const systemMode = await getSystemMode()

  return (
    <html id="__next" lang="th" dir={direction} className={anuphan.variable} suppressHydrationWarning>
      <body className="marketing-body flex is-full min-bs-full flex-auto flex-col">
        <InitColorSchemeScript attribute="data" defaultMode={systemMode} />
        <VerticalNavProvider>
          <SettingsProvider settingsCookie={settingsCookie} mode={mode}>
            <ThemeProvider direction={direction} systemMode={systemMode}>
              <IntersectionProvider>{children}</IntersectionProvider>
              <ToastMount />
            </ThemeProvider>
          </SettingsProvider>
        </VerticalNavProvider>
      </body>
    </html>
  )
}
