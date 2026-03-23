import { NextRequest, NextResponse } from 'next/server'
import { requireAuth } from '@/lib/auth'
import { errorResponse } from '@/lib/api-response'
import { getFilePath } from '@/lib/upload'
import { readFile } from 'fs/promises'
import { existsSync } from 'fs'

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ fileId: string }> }
) {
  try {
    await requireAuth()
    const { fileId } = await params

    // Prevent path traversal
    if (fileId.includes('..') || fileId.includes('/')) {
      return NextResponse.json({ success: false, error: 'Invalid file ID' }, { status: 400 })
    }

    const filepath = getFilePath(fileId)

    if (!existsSync(filepath)) {
      return NextResponse.json({ success: false, error: 'ไม่พบไฟล์' }, { status: 404 })
    }

    const buffer = await readFile(filepath)
    const ext = fileId.split('.').pop()?.toLowerCase()
    const contentType = ext === 'png' ? 'image/png' : ext === 'webp' ? 'image/webp' : 'image/jpeg'

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'private, max-age=3600',
      },
    })
  } catch (error) {
    return errorResponse(error)
  }
}
