import React, { AnchorHTMLAttributes, ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

export function Link(
  props: {
    href: string
    children?: ReactNode
  } & NextLinkProps &
    AnchorHTMLAttributes<HTMLAnchorElement>
) {
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
