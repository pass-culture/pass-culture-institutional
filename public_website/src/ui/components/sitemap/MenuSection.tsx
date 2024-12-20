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

  const renderSitemapLink = useCallback(
    (link: CTA) => (
      <SitemapLinkItem key={link.Label} link={link} sectionLabel={item.label} />
    ),
    [item.label]
  )

  const renderFilteredLinks = useCallback(
    (links: CTA[]) => links.filter(filterNonEmptyLabel).map(renderSitemapLink),
    [filterNonEmptyLabel, renderSitemapLink]
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

export const SectionTitle = styled.h3`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  color: var(--text-primary);
  font-size: 1.25rem;
`
const SitemapList = styled.ul`
  ${({ theme }) => css`
    list-style: none;
    padding-left: 1.5rem;
    margin: 0;

    li {
      position: relative;
      margin-bottom: 0.5rem;

      &::before {
        content: '';
        position: absolute;
        left: -1rem;
        top: 0.8em;
        width: 0.375rem;
        height: 0.375rem;
        background-color: ${theme.colors.primary};
        border-radius: 50%;
      }
    }
  `}
`
