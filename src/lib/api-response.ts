import { NextResponse } from 'next/server'
import { AppError } from './errors'
import { ZodError } from 'zod'
import type { ApiResponse, PaginatedResponse } from '@/types'

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json({ success: true, data } satisfies ApiResponse<T>, { status })
}

export function paginatedResponse<T>(data: T[], total: number, page: number, limit: number) {
  const response: PaginatedResponse<T> = {
    success: true, data,
    meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
  }
  return NextResponse.json(response)
}

export function errorResponse(error: unknown) {
  if (error instanceof ZodError) {
    return NextResponse.json({ success: false, error: error.errors[0]?.message ?? 'ข้อมูลไม่ถูกต้อง' }, { status: 422 })
  }
  if (error instanceof AppError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.statusCode })
  }
  console.error('Unhandled error:', error)
  return NextResponse.json({ success: false, error: 'เกิดข้อผิดพลาดภายในระบบ' }, { status: 500 })
}
