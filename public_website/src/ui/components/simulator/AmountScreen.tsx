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
      <Typo.Heading3 as="p">{props.title}</Typo.Heading3>
      <Spacer />
      <Text>{props.text}</Text>
      <Button onClick={props.onNext}>Suivant</Button>
    </Root>
  )
}

const Root = styled.div`
  padding: 6rem 3rem 2.5rem 4rem;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    padding: 1rem 1.5rem 2.5rem 1.5rem;
  }
`

const Spacer = styled.div`
  margin-bottom: 1.25rem;
`

const Text = styled(Typo.Body)`
  margin-bottom: 1.5rem;
`
