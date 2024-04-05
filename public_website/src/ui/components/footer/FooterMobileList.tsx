import React from 'react'
import styled, { css } from 'styled-components'

import { ChevronDown } from '../icons/ChevronDown'
import { Link } from '../Link'
import { FooterListProps } from './FooterList'

export function FooterMobileList({ title, listItems }: FooterListProps) {
  return (
    <StyledMobileFooterList>
      <summary>
        <h3>{title}</h3>
        <ChevronDown />
      </summary>
      <ul>
        {listItems.map((anchor) => {
          return (
            <li key={anchor.Label}>
              <Link href={anchor.URL}>{anchor.Label}</Link>
            </li>
          )
        })}
      </ul>
    </StyledMobileFooterList>
  )
}

const StyledMobileFooterList = styled.details`
  ${({ theme }) => css`
    display: none;

    summary {
      list-style: none;
      display: inline-flex;
      align-items: center;
      gap: 1rem;

      &::-webkit-details-marker {
        display: none;
      }
    }

    h3 {
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.bold};
      text-transform: uppercase;
      padding: 1rem 0;
    }

    summary img {
      transform: rotate(180deg);
    }

    &[open] summary img {
      transform: none;
    }

    li {
      color: ${theme.colors.black};
      opacity: 0.7;
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.semiBold};
      margin-bottom: 0.875rem;

      a:hover {
        text-decoration: underline;
      }
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      display: initial;
    }
  `}
`
