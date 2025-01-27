import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import {
  ComponentCommonExperienceVideoCarouselItemFragment,
  ComponentCommonKeyNumberItems,
  ComponentCommonOffersCarouselItemFragment,
  ComponentCommonPiledCardItemFragment,
  ComponentCommonVerticalCarouselItem,
  UploadFileFragment,
} from '@/generated/graphql'
import { StyledDot } from '@/theme/style'
import { handleNavigationButtonClick } from '@/utils/carouselHelper'

type Item =
  | Omit<ComponentCommonVerticalCarouselItem, 'image'>
  | Omit<ComponentCommonKeyNumberItems, 'image'>
  | Omit<ComponentCommonPiledCardItemFragment, 'image'>
  | Omit<ComponentCommonOffersCarouselItemFragment, 'image'>
  | Omit<ComponentCommonExperienceVideoCarouselItemFragment, 'image'>
  | { logo: UploadFileFragment | null | undefined }

const NavigationWithDots = (props: {
  items: Item[]
  carrouselSelector: string
  slidesSelector: string
  carouselName: string
}) => {
  const { items, carrouselSelector, slidesSelector, carouselName } = props

  const handleNavigation = useCallback(() => {
    handleNavigationButtonClick(carrouselSelector, slidesSelector)
  }, [carrouselSelector, slidesSelector])

  const getTitle = (item: Item, key: string): string => {
    if ('title' in item) return item.title ?? ''
    if ('logo' in item) return item.logo?.hash ?? ''
    return key
  }

  const getLabel = (item: Item): string => {
    if ('title' in item) return item.title ?? ''
    if ('logo' in item) return item.logo?.alternativeText ?? ''
    return ''
  }

  const renderDot = useMemo(() => {
    return items?.map((item, index) => {
      const key = getTitle(item, `${carouselName}_${index}`)
      return (
        <StyledDot
          onClick={handleNavigation}
          key={key}
          slide={index}
          aria-label={`Afficher la diapositive ${index + 1} sur ${
            items.length
          } : ${getLabel(item)}`}
        />
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <StyledDots role="group" aria-label="Contrôles du carousel">
      {renderDot}
    </StyledDots>
  )
}

export default NavigationWithDots

const StyledDots = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
`
