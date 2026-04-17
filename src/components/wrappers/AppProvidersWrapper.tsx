'use client'

import { SessionProvider } from 'next-auth/react'
import React, { useEffect } from 'react'

import { LayoutProvider } from '@/context/useLayoutContext'
import { preline } from '@/utils/preline'

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    preline.init()
  }, [])

  return (
    <SessionProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </SessionProvider>
  )
}

export default AppProvidersWrapper
