import React from 'react'

import { Typo } from '../typographies'
import { StyledTitle } from '@/theme/style'

const Title = (props: { title: string }) => {
  const { title } = props

  return (
    <StyledTitle>
      <Typo.Heading2>{title}</Typo.Heading2>
    </StyledTitle>
  )
}

export default Title
