import type { Metadata } from 'next'

import AppProvidersWrapper from '@/components/wrappers/AppProvidersWrapper'
import { META_DATA } from '@/config/constants'

import '@/assets/css/app.css'

export const metadata: Metadata = {
  title: {
    default: META_DATA.title,
    template: `%s | ${META_DATA.name}`,
  },
  description: META_DATA.description,
  keywords: META_DATA.keywords,
  authors: [{ name: META_DATA.author }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="th"
      data-layout="vertical"
      data-sidenav-user="false"
      data-layout-position="fixed"
      data-topbar-color="light"
      data-menu-color="dark"
      data-theme="light"
      data-skin="saas"
      data-sidenav-size="on-hover-active"
      data-layout-width="fluid"
      dir="ltr"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anuphan:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <AppProvidersWrapper>{children}</AppProvidersWrapper>
      </body>
    </html>
  )
}
