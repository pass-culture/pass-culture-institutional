import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '../ContentWrapper'
import { ChevronDown } from '../icons/ChevronDown'
import { BreadcrumbContext } from './breadcrumb-context'
import { useOnClickAnalytics } from '@/hooks/useOnClickAnalytics'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { Separator } from '@/lib/blocks/Separator'
import { CustomSelect, CustomSelectButton, WrapperChevron } from '@/theme/style'
import { BreadcrumbProps } from '@/types/props'
import { isRenderable } from '@/utils/isRenderable'
import { isStringAreEquals } from '@/utils/stringAreEquals'

export function Breadcrumb(props: BreadcrumbProps) {
  const { isUnderHeader, className } = props
  const [isMounted, setIsMounted] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLUListElement | null>(null)
  const [isOpen, setIsOpen] = useState<number>(-1)
  const params = useParams()
  const { onClickAnalytics } = useOnClickAnalytics()

  const breadcrumbData = useContext(BreadcrumbContext)
  const pathname = usePathname()

  const allItems = breadcrumbData
    ? [...breadcrumbData.targetItems, ...breadcrumbData.aboutItems]
    : []
  const footerItems = breadcrumbData ? [...breadcrumbData.footerItems] : []
  const currentNavigationGroup = allItems.find(
    (x) =>
      x.megaMenu.primaryListItems.some((y: { URL: string }) =>
        isStringAreEquals(y.URL, pathname)
      ) ||
      x.megaMenu.secondaryListItems.some((y: { URL: string }) =>
        isStringAreEquals(y.URL, pathname)
      )
  )

  const groupLinks = useMemo(() => {
    return currentNavigationGroup
      ? [
          ...currentNavigationGroup.megaMenu.primaryListItems,
          ...currentNavigationGroup.megaMenu.secondaryListItems,
        ]
      : []
  }, [currentNavigationGroup])

  const currentLink = groupLinks.find((l) => isStringAreEquals(l.URL, pathname))

  const checkIfOpen = (index: number): boolean => {
    return isOpen === index
  }

  const openDropdown = (index: number): void => {
    setIsOpen(index)
  }

  const isActu = (): boolean => {
    return (
      typeof params?.['slug'] === 'string' && pathname.startsWith('/actualite/')
    )
  }
  const isResource = (): boolean => {
    return (
      typeof params?.['slug'] === 'string' &&
      pathname.startsWith('/ressources/')
    )
  }

  const getFooterItem = (): {
    Label: string
    URL: string
    id: number
  } | null => {
    const item = footerItems.find((obj) => isStringAreEquals(obj.URL, pathname))

    if (item) return item
    return null
  }
  const footerLink = getFooterItem()

  const memoizeUL = useMemo(() => {
    return (
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
    )
  }, [groupLinks, onClickAnalytics])

  const label = currentNavigationGroup?.label

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <BlockRendererWithCondition condition={isMounted}>
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
          {isActu() && (
            <StyledSimpleLink>
              <Link href="/actualites-pass-culture">Actualités</Link>
            </StyledSimpleLink>
          )}
          {isResource() && (
            <StyledSimpleLink>
              <Link href="/ressources-pass-culture">Ressources</Link>
            </StyledSimpleLink>
          )}
          {footerLink && (
            <StyledSimpleLink>
              <Link href={footerLink.URL}>{footerLink.Label}</Link>
            </StyledSimpleLink>
          )}
          <ListItem>
            <BlockRendererWithCondition condition={isRenderable(label)}>
              <SelectWrapper $groupLabel={label as string}>
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
                    <BlockRendererWithCondition condition={checkIfOpen(0)}>
                      <span
                        id="select-dropdown"
                        role="listbox"
                        aria-label="Liste URL">
                        {memoizeUL}
                      </span>
                    </BlockRendererWithCondition>
                  </CustomSelect>
                </SelectInnerWrapper>
              </SelectWrapper>
            </BlockRendererWithCondition>
          </ListItem>
        </ol>
      </Root>
      <Separator isActive={false} />
    </BlockRendererWithCondition>
  )
}

const Root = styled(ContentWrapper)<{ $isUnderHeader?: boolean }>`
  padding-left: 0;
  padding-right: 0;
  ${({ theme, $isUnderHeader }) => css`
    @media (max-width: ${theme.mediaQueries.mobile}) {
      display: none;
    }
    @media (max-width: ${theme.mediaQueries.largeDesktop}) {
      padding-left: 2rem;
      padding-right: 2rem;
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
    margin-bottom: var(--module-margin);
    ${$isUnderHeader &&
    css`
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
