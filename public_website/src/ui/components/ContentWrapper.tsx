import styled from 'styled-components'

export const ContentWrapper = styled.div<{ $noMargin?: boolean }>`
  margin: auto;
  ${(p) => !p.$noMargin && 'margin-bottom: var(--module-spacing);'}
  max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
  padding-left: 1.3rem;
  padding-right: 1.3rem;

  box-sizing: border-box;
`
