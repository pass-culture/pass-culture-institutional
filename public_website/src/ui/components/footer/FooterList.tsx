import React from 'react'
import styled, { css } from 'styled-components'

import { FooterListProps } from '@/types/props'
import { Link } from '@/ui/components/Link'
import { parseText } from '@/utils/parseText'

export function FooterList(props: FooterListProps) {
  const { title, listItems } = props
  return (
    <StyledFooterList>
      <h3>{title}</h3>
      <ul>
        {listItems?.map((anchor) => {
          return (
            <li key={anchor.Label}>
              <Link
                href={anchor.URL}
                aria-label={parseText(anchor.Label).accessibilityLabel}>
                {parseText(anchor.Label).processedText}
              </Link>
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
