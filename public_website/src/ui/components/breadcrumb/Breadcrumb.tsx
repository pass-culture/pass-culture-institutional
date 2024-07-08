import React, { useContext, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '../ContentWrapper'
import { ChevronDown } from '../icons/ChevronDown'
import { BreadcrumbContext } from './breadcrumb-context'
import { onClickAnalytics } from '@/lib/analytics/helpers'
import { CustomSelect, CustomSelectButton, WrapperChevron } from '@/theme/style'
import { BreadcrumbProps } from '@/types/props'
import { isStringAreEquals } from '@/utils/stringAreEquals'

export function Breadcrumb(props: BreadcrumbProps) {
  const { isUnderHeader, className } = props
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const [isOpen, setIsOpen] = useState<number>(-1)

  const headerData = useContext(BreadcrumbContext)
  const pathname = usePathname()

  const allItems = headerData
    ? [...headerData.targetItems, ...headerData.aboutItems]
    : []

  const currentNavigationGroup = allItems.find(
    (x) =>
      x.megaMenu.primaryListItems.some((y: { URL: string }) =>
        isStringAreEquals(y.URL, pathname)
      ) ||
      x.megaMenu.secondaryListItems.some((y: { URL: string }) =>
        isStringAreEquals(y.URL, pathname)
      )
  )

  const groupLinks = currentNavigationGroup
    ? [
        ...currentNavigationGroup.megaMenu.primaryListItems,
        ...currentNavigationGroup.megaMenu.secondaryListItems,
      ]
    : []

  const currentLink = groupLinks.find(
    (l) => l.URL.trim().toLowerCase() === pathname.trim().toLowerCase()
  )

  const checkIfOpen = (index: number): boolean => {
    return isOpen === index
  }

  const openDropdown = (index: number): void => {
    // TODO update dynamic position top/bottom
    setIsOpen(index)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted && currentNavigationGroup ? (
    <Root
      as="nav"
      aria-label="fil d’arianne"
      $isUnderHeader={isUnderHeader}
      className={className}
      $noMargin={isUnderHeader}>
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
            <SelectInnerWrapper>
              <CustomSelect
                onMouseLeave={(): void => setIsOpen(-1)}
                $isInBreadcrumb>
                <CustomSelectButton
                  role="combobox"
                  onClick={(): void => {
                    openDropdown(0)
                  }}
                  $isInBreadcrumb
                  aria-labelledby="Naviguez"
                  aria-label="Naviguez"
                  aria-haspopup="listbox"
                  aria-expanded={checkIfOpen(0)}
                  aria-controls="select-dropdown">
                  {currentLink?.Label}
                  <WrapperChevron $isOpen={checkIfOpen(0)}>
                    <ChevronDown />
                  </WrapperChevron>
                </CustomSelectButton>
                {checkIfOpen(0) && (
                  <span
                    id="select-dropdown"
                    role="listbox"
                    aria-label="Liste URL">
                    <ul ref={dropdownRef} className="select-dropdown">
                      {groupLinks.map((link) =>
                        link?.Label.trim() ? (
                          <span
                            aria-selected="false"
                            role="option"
                            aria-hidden="true"
                            tabIndex={-1}
                            key={link.Label}>
                            <li>
                              <Link
                                href={link.URL}
                                onClick={(): void =>
                                  onClickAnalytics({
                                    eventName: link.eventName,
                                    eventOrigin: link.eventOrigin,
                                  })
                                }>
                                <span>{link.Label.trim()}</span>
                              </Link>
                            </li>
                          </span>
                        ) : null
                      )}
                    </ul>
                  </span>
                )}
              </CustomSelect>
            </SelectInnerWrapper>
          </SelectWrapper>
        </ListItem>
      </ol>
    </Root>
  ) : null
}

const Root = styled(ContentWrapper)<{ $isUnderHeader?: boolean }>`
  ${({ theme, $isUnderHeader }) => css`
    @media (max-width: ${theme.mediaQueries.mobile}) {
      display: none;
    }
    ol {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.25rem 0.875rem;
    }
    z-index: 200;
    position: relative;
    color: ${theme.colors.black};
    font-size: ${theme.fonts.sizes['2xs']};
    font-weight: ${theme.fonts.weights.medium};

    ${$isUnderHeader &&
    css`
      transform: translateY(-10rem);
      @media (max-width: ${theme.mediaQueries.tablet}) {
        transform: none;
      }
    `}
  `};
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

const SelectInnerWrapper = styled.div`
  display: inline-block;
  padding: 0 0.25rem;
  position: relative;
`

const SelectWrapper = styled.div<{ $groupLabel: string }>`
  &::before {
    content: '${({ $groupLabel }) => `${$groupLabel}\\00a0\\00a0-\\00a0`}';
  }
`
