import type { PaginationParams } from '@/types'

export function parsePagination(searchParams: URLSearchParams): PaginationParams {
  const page = Math.max(1, parseInt(searchParams.get('page') ?? '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') ?? '20', 10)))
  return { page, limit }
}

export function paginationToSkipTake(params: PaginationParams) {
  return { skip: (params.page - 1) * params.limit, take: params.limit }
}
