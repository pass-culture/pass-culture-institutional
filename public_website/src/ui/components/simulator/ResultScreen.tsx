import React from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'
import { Typo } from '../typographies'

interface ResultScreenProps {
  title: string
  steps: string[]
  ctaLink: { Label: string; URL: string }
  helpText: string
  supportLink: { Label: string; URL: string }
}

export function ResultScreen(props: ResultScreenProps) {
  return (
    <Root>
      <Title as="p" dangerouslySetInnerHTML={{ __html: props.title }} />

      <Steps>
        {props.steps.map((step, i) => (
          <li key={step}>
            <Circle>{(i + 1).toString().padStart(2, '0')}</Circle>
            {step}
          </li>
        ))}
      </Steps>

      <Button href={props.ctaLink.URL}>{props.ctaLink.Label}</Button>

      <HelpText>
        <span dangerouslySetInnerHTML={{ __html: props.helpText }} />
        <a href={props.ctaLink.URL}>{props.supportLink.Label}</a>
      </HelpText>
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
  margin-bottom: 2rem;
`

const Circle = styled.span`
  grid-area: circle;

  font-size: 0.875rem;
  font-weight: 500;
  letter-spacing: -0.01833334938rem;
  color: ${({ theme }) => theme.colors.secondary};

  width: 2rem;
  height: 2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  border: 1px solid #320096;

  margin-right: 1.25rem;
`

const Steps = styled.ul`
  li + li {
    margin-top: 1rem;
  }

  margin-bottom: 2rem;
`

const HelpText = styled.p`
  font-size: 0.625rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: -0.007738075685rem;

  margin-top: 2rem;

  a {
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1.25;
    color: #94008c;
    text-decoration: underline;
    margin-left: 1rem;
  }
`
