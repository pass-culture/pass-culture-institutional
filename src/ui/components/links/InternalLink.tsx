import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

type Props = {
  href: string
  name: string
}

export const InternalLink = ({ href, name }: Props) => (
  <FlexContainer>
    <Card>
      <Link href={href} passHref legacyBehavior>
        <StyledA>{name}</StyledA>
      </Link>
    </Card>
  </FlexContainer>
)

const FlexContainer = styled.div({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexFlow: 'column wrap',
  maxWidth: '800px',
  marginTop: '1.5rem',
})

const Card = styled.div(({ theme }) => ({
  padding: '1.35rem',
  color: 'inherit',
  textAlign: 'center',
  textDecoration: 'none',
  border: `2px solid ${theme.colors.black}`,
  borderRadius: '10px',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  width: '100%',
  ['&:hover, :focus, :active']: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
}))

const StyledA = styled.a(({ theme }) => ({
  ...theme.typography.buttonText,
  color: 'inherit',
}))
