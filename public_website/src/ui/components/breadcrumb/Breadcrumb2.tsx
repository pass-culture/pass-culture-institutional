import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styled, { css } from 'styled-components'

import { ChevronDown } from '../icons/ChevronDown'
import { BreadcrumbContext } from './breadcrumb-context'

export function Breadcrumb2() {
  const headerData = useContext(BreadcrumbContext)
  const pathname = usePathname()
  const router = useRouter()

  if (!headerData) {
    return null
  }

  const currentNavigationGroup = headerData?.targetItems.find((x) =>
    x.megaMenu.primaryListItems.some(
      (y) => y.URL.toLowerCase() === pathname.toLowerCase()
    )
  )

  if (!currentNavigationGroup) {
    return null
  }

  const groupLinks = [
    ...currentNavigationGroup.megaMenu.primaryListItems,
    ...currentNavigationGroup.megaMenu.secondaryListItems,
  ]

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let selectedUrl = event.target.value
    selectedUrl = selectedUrl.startsWith('/') ? selectedUrl : '/' + selectedUrl
    router.push(selectedUrl)
  }

  return (
    <Root aria-label="fil d’arianne">
      <ol>
        <ListItem>
          <StyledSimpleLink>
            <Link href="/">Accueil</Link>
          </StyledSimpleLink>
        </ListItem>
        <ListSeparator aria-hidden="true">
          <ChevronDown />
        </ListSeparator>
        <ListItem>
          <SelectWrapper $groupLabel={currentNavigationGroup.label}>
            <Select
              aria-current="page"
              aria-label="Changer de page"
              value={pathname}
              onChange={handleOptionChange}>
              {groupLinks.map((link) => (
                <option key={link.Label} value={link.URL}>
                  {link.Label}
                </option>
              ))}
            </Select>
          </SelectWrapper>
        </ListItem>
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

    /* TODO: move this to wherever it should be */
    /* transform: translateY(-13rem); */
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
const ListSeparator = styled.li<{ $isLast?: boolean }>`
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

const Select = styled.select`
  appearance: none;
`

const SelectWrapper = styled.div<{ $groupLabel: string }>`
  &::before {
    content: '${({ $groupLabel }) => `${$groupLabel}\\00a0\\00a0-\\00a0`}';
  }
`
