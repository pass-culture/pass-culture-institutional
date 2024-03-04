import React from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'
import { Typo } from '../typographies'

interface AmountScreenProps {
  title: string
  text: string

  onNext: () => void
}

export function AmountScreen(props: AmountScreenProps) {
  return (
    <Root>
      <Title as="p" dangerouslySetInnerHTML={{ __html: props.title }} />
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

const Title = styled(Typo.Heading3)`
  margin-bottom: 1.25rem;
`

const Text = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 2;
  letter-spacing: -0.0183333125rem;

  margin-bottom: 1.5rem;
`
