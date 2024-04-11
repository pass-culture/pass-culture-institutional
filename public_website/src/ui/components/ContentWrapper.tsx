import styled from 'styled-components'

export const ContentWrapper = styled.div<{ $noMargin?: boolean }>`
  /* margin: ${(p) => (p.$noMargin ? '0 auto' : '5rem auto')}; */
  margin: auto;
  ${(p) => !p.$noMargin && 'margin-bottom: var(--module-spacing);'}
  max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
  padding: 0 1.3rem;

  /* @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin: ${(p) => (p.$noMargin ? '0 auto' : '2.825rem auto')};
  } */
`
