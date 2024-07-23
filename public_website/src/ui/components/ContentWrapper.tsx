import styled, { css } from 'styled-components'

export const ContentWrapper = styled.section<{
  $noMargin?: boolean
  $marginTop?: number
  $marginBottom?: number
}>`
  margin: auto;
  position: relative;
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: var(--module-margin);
      margin-bottom: var(--module-margin);
    }
  `}
  ${(p) => {
    if (!p.$noMargin) {
      return `
    margin-top: var(--module-margin);
    margin-bottom: var(--module-margin);
    `
    } else if (p.$marginTop && p.$marginBottom) {
      return `
    margin-top: ${p.$marginTop}rem;
    margin-bottom: ${p.$marginBottom}rem;
    `
    } else {
      return `
    margin-top: 0;
    margin-bottom: 0;
    `
    }
  }}

  max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  box-sizing: border-box;
`
