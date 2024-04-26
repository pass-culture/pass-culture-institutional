import React from 'react'
import styled from 'styled-components'

import { parseText } from '@/utils/parseText'
/**
 * Use these components to apply typography styles.
 *
 * - To override the tag name, use `as` prop: https://styled-components.com/docs/api#as-polymorphic-prop
 * - To override CSS properties when using them, use the double ampersand (&&) operator: https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
 */

interface HeadingProps {
  children: string
  as?: keyof JSX.IntrinsicElements
}

const Heading1: React.FC<HeadingProps> = ({ children, as, ...rest }) => {
  const { processedText, accessibilityLabel } = parseText(children)
  return (
    <StyledHeading1 as={as} aria-label={accessibilityLabel} {...rest}>
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

const Heading2: React.FC<HeadingProps> = ({ children, as, ...rest }) => {
  const { processedText, accessibilityLabel } = parseText(children)
  return (
    <StyledHeading2 as={as} aria-label={accessibilityLabel} {...rest}>
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
  const { processedText, accessibilityLabel } = parseText(children)
  return (
    <StyledHeading3 as={as} aria-label={accessibilityLabel} {...rest}>
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
  const { processedText, accessibilityLabel } = parseText(children)
  return (
    <StyledBody as={as} aria-label={accessibilityLabel} {...rest}>
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
