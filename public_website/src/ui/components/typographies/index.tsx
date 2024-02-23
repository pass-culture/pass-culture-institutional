import styled from 'styled-components'

/**
 * Use these components to apply typography styles.
 *
 * - To override the tag name, use `as` prop: https://styled-components.com/docs/api#as-polymorphic-prop
 * - To override CSS properties when using them, use the double ampersand (&&) operator: https://styled-components.com/docs/faqs#how-can-i-override-styles-with-higher-specificity
 */

const Heading1 = styled.h1(({ theme }) => ({
  ...theme.typography.heading1.desktop,
  [`@media(width < ${theme.mediaQueries.mobile})`]: {
    ...theme.typography.heading1.mobile,
  },
}))

const Heading2 = styled.h2(({ theme }) => {
  return {
    ...theme.typography.heading2.desktop,
    [`@media(width < ${theme.mediaQueries.mobile})`]: {
      ...theme.typography.heading2.mobile,
    },
  }
})

const Body = styled.h2(({ theme }) => {
  return {
    ...theme.typography.body.desktop,
    [`@media(width < ${theme.mediaQueries.mobile})`]: {
      ...theme.typography.body.mobile,
    },
  }
})

const BorderedText = styled.p(({ theme }) => {
  return {
    ...theme.typography.borderedText.desktop,
    [`@media(width < ${theme.mediaQueries.mobile})`]: {
      ...theme.typography.borderedText.mobile,
    },
  }
})

const Emoji = styled.span(({ theme }) => ({
  ...theme.typography.emoji,
}))

export const Typo = {
  Heading1,
  Heading2,
  Body,
  BorderedText,
  Emoji,
}
