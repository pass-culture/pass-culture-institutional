import styled, { css } from 'styled-components'

export const Label = styled.label`
  ${({ theme }) => css`
    display: block;
    font-size: ${theme.fonts.sizes['4xl']};
    font-weight: ${theme.fonts.weights.bold};

    border-bottom: 1px solid ${theme.colors.primary}33; // 20% opacity
    padding-bottom: 2.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding-bottom: 1.5rem;
    }
  `}
`
