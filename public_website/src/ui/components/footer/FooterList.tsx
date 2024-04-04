import React from 'react'
import styled, { css } from 'styled-components'

import { Link } from '@/ui/components/Link'

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
      margin-bottom: 0.575rem;
      font-weight: ${theme.fonts.weights.bold};
    }

    li {
      color: ${theme.colors.black};
      opacity: 0.7;
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.semiBold};

      &:not(:last-child) {
        margin-bottom: 0.575rem;
      }

      a:hover {
        text-decoration: underline;
      }
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      display: none;
    }
  `}
`
