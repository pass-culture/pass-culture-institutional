import React from 'react'
import NextLink from 'next/link'

import { LinkProps } from '@/types/props'

export function Link(props: LinkProps) {
  const { href } = props

  const external = !href?.startsWith('/')

  return (
    <NextLink
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener,noreferrer' : undefined}
      {...props}
    />
  )
}
