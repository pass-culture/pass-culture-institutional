import styled from 'styled-components'

export const ExternalLink = styled.a(({ theme }) => ({
  color: theme.colors.secondary,
  textDecoration: 'none',
  ['&:hover, :focus, :active']: {
    textDecoration: 'underline',
  },
}))
