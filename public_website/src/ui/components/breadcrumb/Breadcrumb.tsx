import React from 'react'
import styled, { css } from 'styled-components'

import { ChevronDown } from '../icons/ChevronDown'
import { Link } from '@/ui/components/Link'

type BreadcrumbProps = {
  links: { Label: string; URL: string }[]
}

export function Breadcrumb({ links }: BreadcrumbProps) {
  return (
    <Root aria-label="fil d’arianne">
      <ol>
        {links.map((link, index) => {
          return (
            <React.Fragment key={link.Label}>
              <ListItem>
                {index === links.length - 1 ? (
                  // Is this case, a link without "href" attribute is valid.
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid
                  <a aria-current="page">{link.Label}</a>
                ) : (
                  <Link href={link.URL}>{link.Label}</Link>
                )}
              </ListItem>
              <ListSeparator
                aria-hidden="true"
                $isLast={index === links.length - 1}>
                <ChevronDown />
              </ListSeparator>
            </React.Fragment>
          )
        })}
      </ol>
    </Root>
  )
}

const Root = styled.nav`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }

    ol {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.25rem 0.875rem;
    }
  `}
`

const ListItem = styled.li`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-size: ${theme.fonts.sizes['2xs']};
    font-weight: ${theme.fonts.weights.medium};

    [href]:hover {
      text-decoration: underline;
    }
  `}
`

const ListSeparator = styled.li<{ $isLast: boolean }>`
  ${({ $isLast }) => css`
    svg {
      width: 0.5rem;

      ${!$isLast && 'transform: rotate(-90deg)'};
    }
  `}
`
