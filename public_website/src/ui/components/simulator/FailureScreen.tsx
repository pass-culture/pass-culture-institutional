import React from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'

interface FailureScreenProps {
  title: string
  text: string
  ctaLink: { Label: string; URL: string }
}

export function FailureScreen(props: FailureScreenProps) {
  return (
    <Root>
      <Title dangerouslySetInnerHTML={{ __html: props.title }} />
      <Text dangerouslySetInnerHTML={{ __html: props.text }} />
      <Button href={props.ctaLink.URL}>{props.ctaLink.Label}</Button>
    </Root>
  )
}

const Root = styled.div`
  padding: 6rem 3rem 0 4rem;
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
