import React from 'react'
import styled from 'styled-components'

import { parseText } from '@/utils/parseText'

interface HeadingProps {
  children: string
  as?: keyof JSX.IntrinsicElements
}
const getFilteredRest = (rest: ParsedTextProps) => {
  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const { ['accessibilityLabel']: _, ...filterRest } = { ...rest }
  return filterRest
}
const Heading1: React.FC<HeadingProps> = ({ children, as, ...rest }) => {
  const { processedText, accessibilityLabel = 'aria-label' } =
    parseText(children)
  const filterRest = getFilteredRest(rest)
  return (
    <StyledHeading1 as={as} aria-label={accessibilityLabel} {...filterRest}>
      {processedText}
    </StyledHeading1>
  )
}

const StyledHeading1 = styled.h1(({ theme }) => ({
  ...theme.typography.heading1.desktop,
  [`@media(width < ${theme.mediaQueries.mobile})`]: {
    ...theme.typography.heading1.mobile,
  },
}))

interface ParsedTextProps {
  accessibilityLabel?: string
}

const Heading2: React.FC<HeadingProps> = (props) => {
  const { children, as, ...rest } = props
  const { processedText, accessibilityLabel = 'aria-label' } =
    parseText(children)

  const filterRest = getFilteredRest(rest)

  return (
    <StyledHeading2 {...filterRest} as={as} aria-label={accessibilityLabel}>
      {processedText}
    </StyledHeading2>
  )
}

const StyledHeading2 = styled.h2(({ theme }) => {
  return {
    ...theme.typography.heading2.desktop,
    [`@media(width < ${theme.mediaQueries.mobile})`]: {
      ...theme.typography.heading2.mobile,
    },
  }
})

const Heading3: React.FC<HeadingProps> = ({ children, as, ...rest }) => {
  const { processedText, accessibilityLabel = 'aria-label' } =
    parseText(children)

  const filterRest = getFilteredRest(rest)
  return (
    <StyledHeading3 as={as} aria-label={accessibilityLabel} {...filterRest}>
      {processedText}
    </StyledHeading3>
  )
}

const StyledHeading3 = styled.h3(({ theme }) => {
  return {
    ...theme.typography.heading3.desktop,
    [`@media(width < ${theme.mediaQueries.mobile})`]: {
      ...theme.typography.heading3.mobile,
    },
  }
})

const Body: React.FC<HeadingProps> = ({ children, as, ...rest }) => {
  const { processedText, accessibilityLabel = 'aria-label' } =
    parseText(children)
  const filterRest = getFilteredRest(rest)
  return (
    <StyledBody as={as} aria-label={accessibilityLabel} {...filterRest}>
      {processedText}
    </StyledBody>
  )
}

const StyledBody = styled.p(({ theme }) => {
  return {
    ...theme.typography.body.desktop,
    [`@media(width < ${theme.mediaQueries.mobile})`]: {
      ...theme.typography.body.mobile,
    },
  }
})

const Emoji = styled.span(({ theme }) => ({
  ...theme.typography.emoji,
}))

export const Typo = {
  Heading1,
  Heading2,
  Heading3,
  Body,
  Emoji,
}
