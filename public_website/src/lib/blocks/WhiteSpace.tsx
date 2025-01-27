import React from 'react'
import styled, { css } from 'styled-components'

import { ComponentBlockSpaceFragment } from '@/generated/graphql'

export function WhiteSpace(props: Omit<ComponentBlockSpaceFragment, 'id'>) {
  const { space } = props
  return <Spacer $height={space ?? undefined} />
}

const Spacer = styled.div<{ $height?: number }>`
  ${({ $height }) => css`
    width: 100%;
    max-width: 90rem;
    min-height: ${$height ? `${$height / 10}rem` : '3rem'};
  `}
`
