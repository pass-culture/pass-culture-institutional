import React, { AnchorHTMLAttributes, ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

type LinkProps = {
  href: string
  children?: ReactNode
} & NextLinkProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

export function Link(props: LinkProps) {
  const external = !props.href.startsWith('/')

  return (
    <NextLink
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener,noreferrer' : undefined}
      {...props}
    />
  )
}
