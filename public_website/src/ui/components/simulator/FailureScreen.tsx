import React from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'
import { Typo } from '../typographies'

interface FailureScreenProps {
  title: string
  text: string
  ctaLink: { Label: string; URL: string }
}

export function FailureScreen(props: FailureScreenProps) {
  return (
    <Root>
      <Title as="p" dangerouslySetInnerHTML={{ __html: props.title }} />
      <Text dangerouslySetInnerHTML={{ __html: props.text }} />
      <Button href={props.ctaLink.URL}>{props.ctaLink.Label}</Button>
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

  margin-bottom: 1.5rem;
`
