import styled from 'styled-components'

export const ExternalLink = styled.a(({ theme }) => ({
  color: theme.colors.hardBlue,
  textDecoration: 'none',
  ['&:hover, :focus, :active']: {
    textDecoration: 'underline',
  },
}))
