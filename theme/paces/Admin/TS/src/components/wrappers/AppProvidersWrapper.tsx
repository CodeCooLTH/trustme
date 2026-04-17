'use client'
import { LayoutProvider } from '@/context/useLayoutContext'
import { useAuth } from '@/hooks/useAuth'
import { preline } from '@/utils/preline'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()

  const { isAuthenticated } = useAuth()
  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/auth/sign-in')
    }
  }, [])
  preline.init()
  return <LayoutProvider>{children}</LayoutProvider>
}

export default AppProvidersWrapper
