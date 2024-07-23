import React, { ReactNode } from 'react'
import styled, { css, WebTarget } from 'styled-components'

interface OutlinedTextProps {
  children: ReactNode
  className?: string
  innerAs?: WebTarget
  shadow?: boolean
}

export function OutlinedText(props: OutlinedTextProps) {
  const { innerAs, className, children, shadow = true, ...other } = props
  return (
    <Root
      aria-hidden="true"
      as={innerAs}
      $shadow={shadow}
      className={className}
      {...other}>
      {children}
    </Root>
  )
}

const Root = styled.span<{ $shadow: boolean }>`
  ${({ $shadow }) => css`
    pointer-events: none;
    ${$shadow && 'filter: drop-shadow(-4px 8px 14px rgba(0, 0, 0, 0.4));'}
  `}
`
