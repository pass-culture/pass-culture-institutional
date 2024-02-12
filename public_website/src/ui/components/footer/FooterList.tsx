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
    color: ${(props) => props.theme.colors.hardBlue};
    text-transform: uppercase;
    font-size: ${(props) => props.theme.fonts.sizes.xs};
    margin-bottom: 1rem;
    font-weight: ${(props) => props.theme.fonts.weights.bold};
  }

  li {
    color: ${(props) => props.theme.colors.black};
    opacity: 0.7;
    font-size: ${(props) => props.theme.fonts.sizes.m};
    font-weight: ${(props) => props.theme.fonts.weights.semiBold};

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
