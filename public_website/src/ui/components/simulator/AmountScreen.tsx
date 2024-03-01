import React from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'

interface AmountScreenProps {
  title: string
  text: string

  onNext: () => void
}

export function AmountScreen(props: AmountScreenProps) {
  return (
    <Root>
      <Title dangerouslySetInnerHTML={{ __html: props.title }} />
      <Text dangerouslySetInnerHTML={{ __html: props.text }} />
      <Button onClick={props.onNext}>Suivant</Button>
    </Root>
  )
}

const Root = styled.div`
  padding: 6rem 3rem 2.5rem 4rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: 1rem 1.5rem 2.5rem 1.5rem;
  }
`

const Title = styled.p`
  font-size: 26px;
  font-weight: 700;
  line-height: 37px;

  margin-bottom: 1.25rem;
`

const Text = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 33px;
  letter-spacing: -0.29333359003067017px;

  margin-bottom: 1.5rem;
`
