import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

const USERNAME_RE = /^[a-zA-Z0-9_]{3,30}$/
const RESERVED = new Set(['admin', 'root', 'api', 'seller', 'safepay', 'www'])

export async function GET(request: NextRequest) {
  const u = request.nextUrl.searchParams.get('u') ?? ''

  if (!USERNAME_RE.test(u)) {
    return NextResponse.json({ available: false, reason: 'invalid' })
  }
  if (RESERVED.has(u.toLowerCase())) {
    return NextResponse.json({ available: false, reason: 'reserved' })
  }

  const existing = await prisma.user.findUnique({
    where: { username: u },
    select: { id: true },
  })
  if (existing) {
    return NextResponse.json({ available: false, reason: 'taken' })
  }

  return NextResponse.json({ available: true })
}
