export class AppError extends Error {
  constructor(message: string, public statusCode: number = 400, public code?: string) {
    super(message)
    this.name = 'AppError'
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) { super(`${resource} ไม่พบ`, 404, 'NOT_FOUND') }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'ไม่มีสิทธิ์เข้าถึง') { super(message, 401, 'UNAUTHORIZED') }
}

export class ForbiddenError extends AppError {
  constructor(message = 'ไม่มีสิทธิ์ดำเนินการ') { super(message, 403, 'FORBIDDEN') }
}

export class ConflictError extends AppError {
  constructor(message: string) { super(message, 409, 'CONFLICT') }
}

export class ValidationError extends AppError {
  constructor(message: string) { super(message, 422, 'VALIDATION_ERROR') }
}
