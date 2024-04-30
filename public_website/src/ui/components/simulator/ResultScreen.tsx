import React from 'react'
import styled from 'styled-components'

import { ButtonWithCTA } from '../buttonWithCTA/ButtonWithCTA'
import { Link } from '../Link'
import { Typo } from '../typographies'
import { CTA } from '@/types/CTA'
import { parseText } from '@/utils/parseText'

interface ResultScreenProps {
  title: string
  steps: string[]
  ctaLink: CTA
  helpText: string
  supportLink: CTA
}

export function ResultScreen(props: ResultScreenProps) {
  return (
    <Root>
      <Typo.Heading3>{props.title}</Typo.Heading3>
      <Spacer />
      <Steps>
        {props.steps.map((step, i) => (
          <li key={step}>
            <Circle>{(i + 1).toString().padStart(2, '0')}</Circle>
            {step}
          </li>
        ))}
      </Steps>

      <ButtonWithCTA cta={props.ctaLink} />

      <HelpText>
        <span aria-label={parseText(props.helpText).accessibilityLabel}>
          {parseText(props.helpText).processedText}
        </span>
        <Link href={props.ctaLink.URL}>{props.supportLink.Label}</Link>
      </HelpText>
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
  margin-bottom: 2rem;
`

const Circle = styled.span`
  grid-area: circle;

  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fonts.weights.medium};
  color: ${({ theme }) => theme.colors.secondary};

  width: 2rem;
  height: 2rem;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  border: 1px solid ${({ theme }) => theme.colors.secondary};

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
  font-weight: ${({ theme }) => theme.fonts.weights.semiBold};
  line-height: 1.2;

  margin-top: 2rem;

  a {
    font-size: ${({ theme }) => theme.fonts.sizes['2xs']};
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
    line-height: 1.25;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: underline;
    margin-left: 1rem;
  }
`
