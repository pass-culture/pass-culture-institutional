import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import styled, { css } from 'styled-components'

import { ContentWrapper } from '../ContentWrapper'
import { ChevronDown } from '../icons/ChevronDown'
import { BreadcrumbContext } from './breadcrumb-context'
import chevron from './chevron.svg'

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
      as="nav"
      aria-label="fil d’arianne"
      $isUnderHeader={props.isUnderHeader}
      className={props.className}
      $noMargin={props.isUnderHeader}>
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
            <SelectInnerWrapper data-currentlabel="Aide et support">
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
            </SelectInnerWrapper>
          </SelectWrapper>
        </ListItem>
      </ol>
    </Root>
  )
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

const SelectInnerWrapper = styled.div`
  display: inline-block;
  padding: 0 0.25rem;
  position: relative;

  &::after {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    content: '';
    content: attr(data-currentlabel);
    color: transparent;
    padding: 0 0.25rem;
    font: inherit;

    padding-right: 1.375rem;
    background-image: url('${chevron.src}');
    background-repeat: no-repeat;
    background-position: right center;
    background-size: 0.5rem auto;

    pointer-events: none;
  }
`

const Select = styled.select`
  appearance: none;
  padding: 0;

  border: none;
  background: none;
  cursor: pointer;

  font: inherit;
`

const SelectWrapper = styled.div<{ $groupLabel: string }>`
  &::before {
    content: '${({ $groupLabel }) => `${$groupLabel}\\00a0\\00a0-\\00a0`}';
  }
`
