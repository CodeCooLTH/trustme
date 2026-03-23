import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(req: NextRequest) {
  const host = req.headers.get('host') || ''
  const path = req.nextUrl.pathname

  // Skip static files, API auth, API routes
  if (
    path.startsWith('/_next') ||
    path.startsWith('/favicon') ||
    path.startsWith('/api/auth') ||
    path.startsWith('/api/')
  ) {
    return NextResponse.next()
  }

  // Detect subdomain: sellers.safepay.local → "sellers"
  const hostname = host.replace(/:\d+$/, '')
  const parts = hostname.split('.')
  const subdomain = parts.length >= 3 ? parts[0] : null

  // ── sellers.safepay.local → rewrite to /seller/* ──
  if (subdomain === 'sellers') {
    if (!path.startsWith('/seller')) {
      const url = req.nextUrl.clone()
      url.pathname = `/seller${path === '/' ? '/dashboard' : path}`
      return NextResponse.rewrite(url)
    }
  }

  // ── admin.safepay.local → rewrite to /admin/* ──
  if (subdomain === 'admin') {
    if (!path.startsWith('/admin')) {
      const url = req.nextUrl.clone()
      url.pathname = `/admin${path === '/' ? '/dashboard' : path}`
      return NextResponse.rewrite(url)
    }
  }

  // ── safepay.local (main) → block /seller/* direct access ──
  if (!subdomain && path.startsWith('/seller')) {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // ── Auth checks ──
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  // Seller protected routes (except login)
  if (path.startsWith('/seller') && path !== '/seller/login') {
    if (!token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/seller/login'
      return NextResponse.redirect(loginUrl)
    }
    if (token.role !== 'SELLER') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Admin protected routes (except login)
  if (path.startsWith('/admin') && path !== '/admin/login') {
    if (!token) {
      const loginUrl = req.nextUrl.clone()
      loginUrl.pathname = '/admin/login'
      return NextResponse.redirect(loginUrl)
    }
    if (token.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  // Buyer protected: /orders
  if (path === '/orders') {
    if (!token) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
