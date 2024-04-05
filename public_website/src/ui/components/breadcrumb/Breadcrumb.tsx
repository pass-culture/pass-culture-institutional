import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled, { css } from 'styled-components'

import { ChevronDown } from '../icons/ChevronDown'
type LinkType = { Label: string; URL: string }[]

type Breadcrumb = {
  id: number
  fils: LinkType
  parent: { id: number; Label: string; URL: string }
}

type BreadcrumbProps = {
  breadCrumbs: Breadcrumb[]
}

export function Breadcrumb({ breadCrumbs }: BreadcrumbProps) {
  const router = useRouter()

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUrl = event.target.value
    router.push('/' + selectedUrl)
  }

  return (
    <Root aria-label="fil d’arianne">
      <ol>
        {breadCrumbs.map((link, index) => (
          <ListItem key={link.id}>
            {link.fils.length < 1 ? (
              <StyledSimpleLink>
                <Link href={'/' + link.parent.URL} aria-current="page">
                  {link.parent.Label}
                </Link>
                <ListSeparator
                  aria-hidden="true"
                  $isLast={index === breadCrumbs.length - 1}>
                  <ChevronDown />
                </ListSeparator>
              </StyledSimpleLink>
            ) : (
              <select onChange={handleOptionChange}>
                <option value={link.parent.URL}>{link.parent.Label}</option>
                {link.fils.map((fils) => (
                  <option key={fils.Label} value={fils.URL}>
                    {fils.Label}
                  </option>
                ))}
              </select>
            )}
          </ListItem>
        ))}
      </ol>
    </Root>
  )
}

const Root = styled.nav`
  ${({ theme }) => css`
    @media (max-width: ${theme.mediaQueries.largeDesktop}) {
      display: none;
    }

    max-width: 90rem;
    margin: 0 auto;
    ol {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.25rem 0.875rem;
    }
    select {
      border: none;
      background: none;
      color: ${theme.colors.black};
      font-size: ${theme.fonts.sizes['2xs']};
      font-weight: ${theme.fonts.weights.medium};
      cursor: pointer;
    }

    transform: translateY(-13rem);
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
const ListSeparator = styled.div<{ $isLast: boolean }>`
  ${({ $isLast }) => css`
    svg {
      width: 0.5rem;

      ${!$isLast && 'transform: rotate(-90deg)'};
    }
  `}
`
const StyledSimpleLink = styled.div`
  display: flex;
  gap: 1.25rem;
`
