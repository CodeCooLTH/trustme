import type { PaginationParams } from '@/types'

export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
  return { page, limit }
}

export function paginationToSkipTake(params: PaginationParams) {
  return { skip: (params.page - 1) * params.limit, take: params.limit }
}

export function generateSlug(): string {
  const adjectives = ['happy', 'lucky', 'swift', 'cool', 'bright', 'neat', 'bold', 'calm', 'fair', 'keen']
  const nouns = ['shop', 'store', 'mart', 'deal', 'trade', 'hub', 'spot', 'zone', 'bay', 'box']
  const adj = adjectives[Math.floor(Math.random() * adjectives.length)]
  const noun = nouns[Math.floor(Math.random() * nouns.length)]
  const num = Math.floor(Math.random() * 9000) + 1000
  return `${adj}-${noun}-${num}`
}

export function getSubdomain(host: string): string | null {
  const parts = host.replace(/:\d+$/, '').split('.')
  if (parts.length >= 3) return parts[0]
  return null
}
