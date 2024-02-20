import styled from 'styled-components'

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
  BorderedText,
  Emoji,
}
