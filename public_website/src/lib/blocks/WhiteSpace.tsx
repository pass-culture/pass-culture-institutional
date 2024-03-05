import React from 'react'
import { useQRCode } from 'next-qrcode'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
import { is } from '@react-three/fiber/dist/declarations/src/core/utils'

interface WhiteSpaceProps {
  space?: number
}

export function WhiteSpace(props: WhiteSpaceProps) {
  console.log(props.space)
  return <Root $height={props.space}></Root>
}

const Root = styled.div<{ $height?: number }>`
  ${({ $height }) => css`
    width: 100%;
    max-width: 90rem;
    min-height: ${$height ? `${$height / 10}rem` : '3rem'};
  `}
`
