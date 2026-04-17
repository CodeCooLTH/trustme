'use client'

import { SessionProvider } from 'next-auth/react'
import React, { useEffect } from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { LayoutProvider } from '@/context/useLayoutContext'
import { preline } from '@/utils/preline'

const AppProvidersWrapper = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    preline.init()
  }, [])

  return (
    <SessionProvider>
      <LayoutProvider>{children}</LayoutProvider>
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />
    </SessionProvider>
  )
}

export default AppProvidersWrapper
