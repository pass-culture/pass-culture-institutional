import React, { useCallback } from 'react'
import styled, { css } from 'styled-components'

import SitemapLinkItem from './SitemapLinkItem'
import { CTA } from '@/types/CTA'
import { HeaderNavigationItemProps } from '@/types/props'

const MenuSection = ({ item }: { item: HeaderNavigationItemProps }) => {
  const cardLink = item.megaMenu.cardLink
  const cardCTA = item.megaMenu.cta

  const filterNonEmptyLabel = useCallback(
    (item: { Label?: string }): boolean => item.Label?.trim() !== '',
    []
  )

  const renderFilteredLinks = useCallback(
    (links: CTA[]) =>
      links
        .filter(filterNonEmptyLabel)
        .map((link) => (
          <SitemapLinkItem
            key={link.Label}
            link={link}
            sectionLabel={item.label}
          />
        )),
    [filterNonEmptyLabel, item.label]
  )
  return (
    <div key={item.label}>
      <SectionTitle>{item.label}</SectionTitle>
      <SitemapList>
        {renderFilteredLinks(item.megaMenu.primaryListItems)}
        {renderFilteredLinks(item.megaMenu.secondaryListItems)}
        {cardLink && (
          <SitemapLinkItem link={cardLink} sectionLabel={cardLink.Label} />
        )}
        {cardCTA && (
          <SitemapLinkItem link={cardCTA} sectionLabel={cardCTA.Label} />
        )}
      </SitemapList>
    </div>
  )
}
export default MenuSection

const SectionTitle = styled.h3`
  ${({ theme }) => css`
    margin-top: 1.5rem;
    margin-bottom: 1rem;
    color: ${theme.colors.primary};
  `}
`
const SitemapList = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    padding-left: 1.5rem;
    margin: 0;

    li {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        left: -1rem;
        top: 0.8em;
        width: 0.3125rem;
        height: 0.3125rem;
        background-color: ${theme.colors.primary};
        border-radius: 50%;
      }
    }
  `}
`
