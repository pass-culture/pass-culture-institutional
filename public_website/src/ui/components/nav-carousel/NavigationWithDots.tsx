import React, { useCallback, useMemo } from 'react'
import styled from 'styled-components'

import { StyledDot } from '@/theme/style'
import {
  ExperienceVideoCarouselSlideProps,
  KeyNumberCarouselSlideProps,
  OffersCarouselSlideProps,
  PiledCardsCarouselSlideProps,
  VerticalCarouselSlideProps,
} from '@/types/props'
import { APIResponse } from '@/types/strapi'
import { handleNavigationButtonClick } from '@/utils/carouselHelper'

type Item =
  | Omit<VerticalCarouselSlideProps, 'slideIndex'>
  | Omit<KeyNumberCarouselSlideProps, 'slideIndex'>
  | Omit<PiledCardsCarouselSlideProps, 'slideIndex'>
  | Omit<OffersCarouselSlideProps, 'slideIndex'>
  | Omit<ExperienceVideoCarouselSlideProps, 'slideIndex'>
  | { logo: APIResponse<'plugin::upload.file'> | null | undefined }

const NavigationWithDots = (props: {
  items:
    | Omit<VerticalCarouselSlideProps, 'slideIndex'>[]
    | Omit<KeyNumberCarouselSlideProps, 'slideIndex'>[]
    | Omit<PiledCardsCarouselSlideProps, 'slideIndex'>[]
    | Omit<OffersCarouselSlideProps, 'slideIndex'>[]
    | Omit<ExperienceVideoCarouselSlideProps, 'slideIndex'>[]
    | { logo: APIResponse<'plugin::upload.file'> | null | undefined }[]
  carrouselSelector: string
  slidesSelector: string
}) => {
  const { items, carrouselSelector, slidesSelector } = props

  const handleNavigation = useCallback(() => {
    handleNavigationButtonClick(carrouselSelector, slidesSelector)
  }, [carrouselSelector, slidesSelector])

  const getTitle = (item: Item, key: string): string => {
    if ('title' in item) return item.title
    if (item.logo) return item.logo.data.attributes.hash
    return key
  }

  const getLabel = (item: Item): string => {
    if ('title' in item) return item.title
    if (item?.logo?.data.attributes.alternativeText)
      return item.logo.data.attributes.alternativeText
    return ''
  }

  const renderDot = useMemo(() => {
    return items?.map((item, index) => {
      const key = getTitle(item, `DOT_${index}`)
      return (
        <StyledDot
          onClick={handleNavigation}
          key={`${key}_${index}`}
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
