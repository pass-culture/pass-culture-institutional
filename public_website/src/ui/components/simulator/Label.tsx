import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  font-size: ${({ theme }) => theme.fonts.sizes['4xl']};
  font-weight: ${({ theme }) => theme.fonts.weights.bold};

  border-bottom: 1px solid ${({ theme }) => theme.colors.primary}33; // 20% opacity
  padding-bottom: 2.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding-bottom: 1.5rem;
  }
`
