import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  font-size: 1.625rem;
  font-weight: 700;

  border-bottom: 1px solid #94008c33;
  padding-bottom: 2.5rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding-bottom: 1.5rem;
  }
`
