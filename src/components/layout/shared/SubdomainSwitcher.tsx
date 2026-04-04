'use client'

import Button from '@mui/material/Button'

interface SubdomainSwitcherProps {
  currentSubdomain: 'main' | 'seller'
}

export default function SubdomainSwitcher({ currentSubdomain }: SubdomainSwitcherProps) {
  if (currentSubdomain === 'seller') {
    return (
      <Button
        variant="text"
        size="small"
        href={process.env.NEXT_PUBLIC_BUYER_URL || '/'}
        fullWidth
      >
        กลับหน้าผู้ซื้อ
      </Button>
    )
  }

  return (
    <Button
      variant="text"
      size="small"
      href={process.env.NEXT_PUBLIC_SELLER_URL || '/seller'}
      fullWidth
    >
      ไปหน้าร้าน
    </Button>
  )
}
