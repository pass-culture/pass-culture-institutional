import React, { ReactNode } from 'react'
import NextLink, { LinkProps as NextLinkProps } from 'next/link'

type LinkProps = {
  href: string
  children?: ReactNode
} & NextLinkProps

export function Link(props: LinkProps) {
  console.log(props)

  const external = !props.href.startsWith('/')

  return (
    <NextLink
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener,noreferrer' : undefined}
      {...props}
    />
  )
}
