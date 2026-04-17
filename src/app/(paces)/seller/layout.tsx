import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { default: 'ผู้ขาย', template: '%s | Deep ผู้ขาย' },
}

export default function SellerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
