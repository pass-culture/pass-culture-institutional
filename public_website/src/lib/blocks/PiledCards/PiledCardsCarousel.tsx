import React, { useEffect } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled from 'styled-components'

import { VerticalCarouselSlide } from './PiledCardsCarouselSlide'
import { StyledDot } from '@/theme/style'
import { PiledCardsCarouselProps } from '@/types/props'
import { stripTags } from '@/utils/stripTags'

export function PiledCardsCarousel(props: PiledCardsCarouselProps) {
  const { title, items, className } = props
  const CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'

  // Get the MQ in rem and convert it in pixels
  // const visibleSlides =
  //   screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 4
  const visibleSlides = 1

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

  function cleanSlideAttributes(
    carouselEl: Element,
    slidesEl: NodeListOf<Element>
  ) {
    carouselEl?.removeAttribute('tabindex')
    carouselEl?.removeAttribute('aria-live')

    slidesEl.forEach((slideEl) => {
      slideEl.removeAttribute('tabindex')
      slideEl.removeAttribute('aria-selected')
    })
  }

  // Remove attributes when clicking "previous", "next" and dots buttons
  function handleNavigationButtonClick(): void {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  return (
    <CarouselProvider
      naturalSlideWidth={340}
      naturalSlideHeight={475}
      totalSlides={items.length}
      visibleSlides={visibleSlides}
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
              key={item.title}
              slideIndex={index}
              {...item}
            />
          )
        })}
      </StyledSlider>

      <StyledDots role="group" aria-label="Contrôles du carousel">
        {items.map((item, index) => {
          return (
            <StyledDot
              onClick={handleNavigationButtonClick}
              key={item.title}
              slide={index}
              aria-label={`Afficher la diapositive ${index + 1} sur ${
                items.length
              } : ${item.title}`}
            />
          )
        })}
      </StyledDots>
    </CarouselProvider>
  )
}

const StyledSlider = styled(Slider)`
  overflow: hidden;
  padding-left: 1rem;
`

const StyledDots = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 2rem;
`
