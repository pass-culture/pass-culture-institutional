import React, { useEffect, useMemo } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled from 'styled-components'

import { VerticalCarouselSlide } from './PiledCardsCarouselSlide'
import { ComponentCommonPiledCardItemFragment } from '@/generated/graphql'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import NavigationWithDots from '@/ui/components/nav-carousel/NavigationWithDots'
import { cleanSlideAttributes } from '@/utils/carouselHelper'
import { stripTags } from '@/utils/stripTags'

type PiledCardsCarouselProps = {
  title: string
  items: ComponentCommonPiledCardItemFragment[]
  className?: string
}

export function PiledCardsCarousel(props: PiledCardsCarouselProps) {
  const { title, items, className } = props
  const CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const TOTAL_SLIDES = useMemo(() => items.length, [items])
  // Get the MQ in rem and convert it in pixels
  // const visibleSlides =
  //   screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 4
  const getvisibleSlides = 1

  const isNavShowing = useMemo(() => {
    return TOTAL_SLIDES > getvisibleSlides
  }, [TOTAL_SLIDES, getvisibleSlides])

  /**
   * Remove unnecessary HTML attributes for a11y.
   * PR #469 will improve that: https://github.com/express-labs/pure-react-carousel/pull/469
   *
   * "pure-react-carousel" does not permit using `ref` on components to allow changing attributes
   */
  useEffect(() => {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [CAROUSEL_SELECTOR])

  return (
    <CarouselProvider
      naturalSlideWidth={340}
      naturalSlideHeight={475}
      totalSlides={items.length}
      visibleSlides={getvisibleSlides}
      isIntrinsicHeight={true}
      infinite={true}
      dragEnabled={false}
      step={1}
      className={className}>
      <StyledSlider
        role="region"
        classNameAnimation="customCarrouselAnimation"
        aria-label={stripTags(title)}
        aria-roledescription="carrousel">
        {items.map((item, index) => {
          return (
            <VerticalCarouselSlide
              key={`${item.title}_${index}`}
              slideIndex={index}
              {...item}
            />
          )
        })}
      </StyledSlider>

      <BlockRendererWithCondition condition={isNavShowing}>
        <NavigationWithDots
          items={items}
          carrouselSelector={CAROUSEL_SELECTOR}
          slidesSelector={SLIDES_SELECTOR}
          carouselName="PILED_CARDS_CAROUSEL"
        />
      </BlockRendererWithCondition>
    </CarouselProvider>
  )
}

const StyledSlider = styled(Slider)`
  overflow: hidden;
  padding-left: 1rem;
`
