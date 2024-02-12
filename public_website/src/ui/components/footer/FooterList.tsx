import React from 'react'
import styled from 'styled-components'

export type FooterListProps = {
  title: string
  listItems: { label: string; href: string }[]
}

export function FooterList({ title, listItems }: FooterListProps) {
  return (
    <StyledFooterList>
      <h3>{title}</h3>
      <ul>
        {listItems.map((el, i) => {
          return (
            <li key={i}>
              <a href={el.href}>{el.label}</a>
            </li>
          )
        })}
      </ul>
    </StyledFooterList>
  )
}

const StyledFooterList = styled.div`
  h3 {
    color: ${({ theme }) => theme.colors.secondary};
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fonts.sizes.xs};
    margin-bottom: 1rem;
    font-weight: ${({ theme }) => theme.fonts.weights.bold};
  }

  li {
    color: ${({ theme }) => theme.colors.black};
    opacity: 0.7;
    font-size: ${({ theme }) => theme.fonts.sizes.m};
    font-weight: ${({ theme }) => theme.fonts.weights.semiBold};

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    a:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 50rem) {
    display: none;
  }
`
