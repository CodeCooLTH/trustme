import { NextRequest, NextResponse } from 'next/server'
import { getSubdomain } from '@/lib/subdomain'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host') || 'localhost:3000'
  const subdomain = getSubdomain(host)
  const { pathname } = request.nextUrl

  // Skip internal paths
  if (pathname.startsWith('/_next') || pathname.startsWith('/api')) {
    return NextResponse.next()
  }

  // Seller subdomain: rewrite to /seller/* paths
  if (subdomain === 'seller') {
    if (pathname.startsWith('/seller')) {
      return NextResponse.next()
    }

    const url = request.nextUrl.clone()

    url.pathname = `/seller${pathname}`

    return NextResponse.rewrite(url)
  }

  // Admin subdomain: rewrite to /admin/* paths
  if (subdomain === 'admin') {
    if (pathname.startsWith('/admin')) {
      return NextResponse.next()
    }

    const url = request.nextUrl.clone()

    url.pathname = `/admin${pathname}`

    return NextResponse.rewrite(url)
  }

  // Main domain: block direct access to /seller/* and /admin/*
  if (pathname.startsWith('/seller') || pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|images|icons).*)']
}
