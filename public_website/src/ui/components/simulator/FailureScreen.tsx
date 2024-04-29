import React from 'react'
import styled from 'styled-components'

import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { Typo } from '../typographies'
import { CTA } from '@/types/CTA'

interface FailureScreenProps {
  title: string
  text: string
  ctaLink: CTA
}

export function FailureScreen(props: FailureScreenProps) {
  return (
    <Root>
      <Typo.Heading3 as="p">{props.title}</Typo.Heading3>
      <Spacer />
      <Text>{props.text}</Text>
      <ButtonWithCTA cta={props.ctaLink} />
    </Root>
  )
}

const Root = styled.div`
  padding: 6rem 3rem 2.5rem 4rem;

  @media (width < ${({ theme }) => theme.mediaQueries.tablet}) {
    padding: 1rem 1.5rem 2.5rem 1.5rem;
  }
`

const Spacer = styled.div`
  margin-bottom: 1.25rem;
`

const Text = styled(Typo.Body)`
  margin-bottom: 1.5rem;
`
