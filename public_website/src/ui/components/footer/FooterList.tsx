import React from 'react'
import Link from 'next/link'
import styled, { css } from 'styled-components'

export type FooterListProps = {
  title: string
  listItems: { Label: string; URL: string }[]
}

export function FooterList({ title, listItems }: FooterListProps) {
  return (
    <StyledFooterList>
      <h3>{title}</h3>
      <ul>
        {listItems.map((anchor) => {
          return (
            <li key={anchor.Label}>
              <Link
                href={anchor.URL}
                dangerouslySetInnerHTML={{ __html: anchor.Label }}
              />
            </li>
          )
        })}
      </ul>
    </StyledFooterList>
  )
}

const StyledFooterList = styled.div`
  ${({ theme }) => css`
    h3 {
      color: ${theme.colors.secondary};
      text-transform: uppercase;
      font-size: ${theme.fonts.sizes.xs};
      margin-bottom: 1rem;
      font-weight: ${theme.fonts.weights.bold};
    }

    li {
      color: ${theme.colors.black};
      opacity: 0.7;
      font-size: ${theme.fonts.sizes.m};
      font-weight: ${theme.fonts.weights.semiBold};

      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      a:hover {
        text-decoration: underline;
      }
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`
