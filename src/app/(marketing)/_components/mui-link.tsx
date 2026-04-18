'use client'

import Button, { type ButtonProps } from '@mui/material/Button'
import Chip, { type ChipProps } from '@mui/material/Chip'
import NextLink from 'next/link'
import type React from 'react'

type LinkOnlyProps = { href: string }

export function LinkButton({
  href,
  ...rest
}: Omit<ButtonProps, 'component' | 'href'> & LinkOnlyProps) {
  const Cmp = Button as unknown as (
    p: ButtonProps & { component: typeof NextLink; href: string },
  ) => React.ReactElement
  return <Cmp {...rest} component={NextLink} href={href} />
}

export function LinkChip({
  href,
  ...rest
}: Omit<ChipProps, 'component' | 'href' | 'clickable'> & LinkOnlyProps) {
  const Cmp = Chip as unknown as (
    p: ChipProps & { component: typeof NextLink; href: string; clickable: true },
  ) => React.ReactElement
  return <Cmp {...rest} component={NextLink} href={href} clickable />
}
