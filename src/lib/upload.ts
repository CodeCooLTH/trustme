import { writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { AppError } from './errors'

const UPLOAD_DIR = process.env.UPLOAD_DIR || './uploads'
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE_MB || '5', 10) * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export async function saveFile(file: File): Promise<string> {
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new AppError('อนุญาตเฉพาะไฟล์ JPEG, PNG, WEBP เท่านั้น', 400)
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new AppError(`ขนาดไฟล์ต้องไม่เกิน ${process.env.MAX_FILE_SIZE_MB || 5}MB`, 400)
  }

  const ext = file.name.split('.').pop() || 'jpg'
  const filename = `${uuidv4()}.${ext}`

  if (!existsSync(UPLOAD_DIR)) {
    await mkdir(UPLOAD_DIR, { recursive: true })
  }

  const filepath = path.join(UPLOAD_DIR, filename)
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filepath, buffer)

  return filename
}

export function getFilePath(filename: string): string {
  return path.join(UPLOAD_DIR, filename)
}
