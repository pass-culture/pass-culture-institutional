import styled from 'styled-components'

export const ContentWrapper = styled.div<{ $noBottomMargin?: boolean }>`
  margin: auto;
  max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
  padding: 0 1.3rem;

  &:not(:last-child) {
    ${({ $noBottomMargin }) => !$noBottomMargin && 'margin-bottom: 5rem;'}
  }
`
