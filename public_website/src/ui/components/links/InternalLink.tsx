import React from 'react'
import Link from 'next/link'
import styled from 'styled-components'

type Props = {
  href: string
  name: string
}

export const InternalLink = ({ href, name }: Props) => (
  <FlexContainer>
    <Card>
      <Link href={href} passHref legacyBehavior>
        {name}
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
  display: 'flex',
  padding: '1.35rem',
  color: 'inherit',
  textAlign: 'center',
  textDecoration: 'none',
  border: `2px solid ${theme.colors.black}`,
  borderRadius: '10px',
  transition: 'color 0.15s ease, border-color 0.15s ease',
  ['&:hover, :focus, :active']: {
    color: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
}))
