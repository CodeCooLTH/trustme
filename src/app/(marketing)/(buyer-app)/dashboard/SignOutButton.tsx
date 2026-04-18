'use client'

import Button from '@mui/material/Button'
import { signOut } from 'next-auth/react'

export default function SignOutButton() {
  return (
    <Button
      variant='outlined'
      color='error'
      size='small'
      startIcon={<i className='tabler-logout' />}
      onClick={() => signOut({ callbackUrl: '/' })}
    >
      ออกจากระบบ
    </Button>
  )
}
