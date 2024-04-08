import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styled, { css } from 'styled-components'

import { ChevronDown } from '../icons/ChevronDown'
import { BreadcrumbContext } from './breadcrumb-context'

interface BreadcrumbProps {
  isUnderHeader?: boolean
  className?: string
}

export function Breadcrumb(props: BreadcrumbProps) {
  const headerData = useContext(BreadcrumbContext)
  const pathname = usePathname()
  const router = useRouter()

  if (!headerData) {
    return null
  }

  const currentNavigationGroup = headerData?.targetItems.find(
    (x) =>
      x.megaMenu.primaryListItems.some(
        (y) => y.URL.toLowerCase() === pathname.toLowerCase()
      ) ||
      x.megaMenu.secondaryListItems.some(
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
    <Root
      aria-label="fil d’arianne"
      $isUnderHeader={props.isUnderHeader}
      className={props.className}>
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

const Root = styled.nav<{ $isUnderHeader?: boolean }>`
  ${({ theme, $isUnderHeader }) => css`
    @media (max-width: ${theme.mediaQueries.mobile}) {
      display: none;
    }

    max-width: 90rem;
    margin: 0 auto;
    padding: 0 3.5rem;

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

    ${$isUnderHeader &&
    css`
      transform: translateY(-10rem);
      position: absolute;

      @media (max-width: ${theme.mediaQueries.tablet}) {
        transform: none;
      }
    `}
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
  padding: 0 0.25rem;
`

const SelectWrapper = styled.div<{ $groupLabel: string }>`
  &::before {
    content: '${({ $groupLabel }) => `${$groupLabel}\\00a0\\00a0-\\00a0`}';
  }
`
