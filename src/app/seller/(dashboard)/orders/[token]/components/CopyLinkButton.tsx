'use client'

import { toast } from 'react-toastify'

interface CopyLinkButtonProps {
  publicToken: string
}

export default function CopyLinkButton({ publicToken }: CopyLinkButtonProps) {
  const publicUrl = `http://deepth.local:3003/o/${publicToken}`

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(publicUrl)
      toast.success('คัดลอกลิงก์แล้ว')
    } catch {
      // Fallback for HTTP (non-HTTPS) contexts
      try {
        const textarea = document.createElement('textarea')
        textarea.value = publicUrl
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        toast.success('คัดลอกลิงก์แล้ว')
      } catch {
        toast.error('ไม่สามารถคัดลอกได้ โปรดคัดลอกด้วยตนเอง')
      }
    }
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-default-500 font-mono bg-default-100 px-3 py-1.5 rounded-lg flex-1 truncate select-all">
        {publicUrl}
      </span>
      <button
        type="button"
        onClick={handleCopy}
        className="btn btn-sm border border-default-300 bg-card hover:bg-default-50 text-default-700 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        คัดลอก
      </button>
    </div>
  )
}
