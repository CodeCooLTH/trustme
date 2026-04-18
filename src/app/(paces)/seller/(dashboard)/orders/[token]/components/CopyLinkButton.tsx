'use client'

import { useEffect, useState } from 'react'

import { toast } from 'react-toastify'

interface CopyLinkButtonProps {
  publicToken: string
}

// Resolve the buyer-facing URL at runtime so it tracks whatever port the dev
// server is using today (4000 in dev, deepthailand.app in prod) instead of
// baking a stale hostname into the bundle.
function resolveBuyerBaseUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_BUYER_URL
  if (envUrl) return envUrl.replace(/\/$/, '')
  if (typeof window !== 'undefined') {
    const { protocol, host } = window.location
    // Seller is on `seller.<buyerHost>`; strip the prefix.
    const buyerHost = host.replace(/^seller\./, '')
    return `${protocol}//${buyerHost}`
  }
  return 'https://deepthailand.app'
}

export default function CopyLinkButton({ publicToken }: CopyLinkButtonProps) {
  const [publicUrl, setPublicUrl] = useState(`/o/${publicToken}`)

  useEffect(() => {
    setPublicUrl(`${resolveBuyerBaseUrl()}/o/${publicToken}`)
  }, [publicToken])

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
