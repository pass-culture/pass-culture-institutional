import styled, { css } from 'styled-components'

export const ContentWrapper = styled.div<{
  $noMargin?: boolean
  $marginTop?: number
  $marginBottom?: number
}>`
  margin: auto;
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: 0;
    }
  `}
  ${(p) =>
    !p.$noMargin
      ? `
      margin-top: var(--module-margin);
      margin-bottom: var(--module-margin);
    `
      : p.$marginTop && p.$marginBottom
        ? `margin-top: ${p.$marginTop}rem;
    margin-bottom: ${p.$marginBottom}rem;`
        : `
     margin-top: 0;
     margin-bottom: 0;`}

  max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
  padding-left: 1.3rem;
  padding-right: 1.3rem;
  box-sizing: border-box;
`
