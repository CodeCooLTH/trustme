import type { Metadata } from 'next'
import { Suspense } from 'react'

import VerifyOtpCard from './VerifyOtpCard'

export const metadata: Metadata = { title: 'ยืนยันรหัส OTP' }

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={null}>
      <VerifyOtpCard />
    </Suspense>
  )
}
