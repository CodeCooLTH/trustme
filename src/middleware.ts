import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token
    const path = req.nextUrl.pathname

    if (path.startsWith('/admin') && token?.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    if (
      (path.startsWith('/dashboard') || path.startsWith('/deals') ||
        path.startsWith('/disputes') || path.startsWith('/notifications') ||
        path.startsWith('/profile')) &&
      !token?.role
    ) {
      return NextResponse.redirect(new URL('/login', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname
        if (
          path === '/' || path.startsWith('/login') || path.startsWith('/register') ||
          path.startsWith('/orders/') || path.startsWith('/tracking/') ||
          path.startsWith('/api/auth') || path.startsWith('/api/orders/')
        ) {
          return true
        }
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api/auth).*)'],
}
