import React from 'react'
import styled from 'styled-components'

import { Button } from '../button/Button'

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
      <Title dangerouslySetInnerHTML={{ __html: props.title }} />

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
  padding: 6rem 3rem 0 4rem;
`

const Title = styled.p`
  font-size: 26px;
  font-weight: 700;
  line-height: 37px;

  margin-bottom: 2rem;
`

const Circle = styled.span`
  grid-area: circle;

  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.29333359003067017px;
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
  font-size: 10px;
  font-weight: 600;
  line-height: 12px;
  letter-spacing: -0.12380921095609665px;

  margin-top: 2rem;

  a {
    font-size: 12px;
    font-weight: 700;
    line-height: 15px;
    color: #94008c;
    text-decoration: underline;
    margin-left: 1rem;
  }
`
