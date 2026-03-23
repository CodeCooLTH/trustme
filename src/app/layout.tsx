import type { Metadata } from 'next'
import { Noto_Sans_Thai } from 'next/font/google'
import './globals.css'

const notoSansThai = Noto_Sans_Thai({
  subsets: ['thai', 'latin'],
  variable: '--font-noto-sans-thai',
})

export const metadata: Metadata = {
  title: 'SafePay - ระบบ Escrow สำหรับซื้อขายออนไลน์',
  description: 'ระบบกลางพักเงินสำหรับการซื้อขายออนไลน์ ปลอดภัย มั่นใจทุกดีล',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <body className={`${notoSansThai.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
