import React, { useEffect, useState } from 'react'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Dot,
  Slider,
} from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ArrowRight } from '../../../ui/components/icons/ArrowRight'
import {
  KeyNumberCarouselSlide,
  KeyNumberCarouselSlideProps,
} from './keyNumberCarouselSlide'
import { MediaQueries } from '@/theme/media-queries'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

type KeyNumberCarouselProps = {
  title: string
  controlsLabel: string
  nextButtonLabel: string
  previousButtonLabel: string
  items: Omit<KeyNumberCarouselSlideProps, 'slideIndex'>[]
}

export function KeyNumberCarousel({
  title,
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  items,
}: KeyNumberCarouselProps) {
  const KEY_NUMBER_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const KEY_NUMBER_SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'

  const [screenWidth, setScreenWidth] = useState<number>()

  useEffect(() => {
    const handleKeyNumberCarouselResize = () =>
      setScreenWidth(window.innerWidth)

    handleKeyNumberCarouselResize()

    window.addEventListener('resize', handleKeyNumberCarouselResize)

    return () => {
      window.removeEventListener('resize', handleKeyNumberCarouselResize)
    }
  }, [])

  const visibleKeySlides =
    screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 2.5

  useEffect(() => {
    const carouselEl = document.querySelector(KEY_NUMBER_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      KEY_NUMBER_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      cleanKeyNumberSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [KEY_NUMBER_CAROUSEL_SELECTOR])

  function cleanKeyNumberSlideAttributes(
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

  function handleKeyNumberNavigationButtonClick() {
    const carouselEl = document.querySelector(KEY_NUMBER_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      KEY_NUMBER_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanKeyNumberSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  return (
    <CarouselProvider
      naturalSlideHeight={75}
      naturalSlideWidth={60}
      totalSlides={items.length}
      visibleSlides={visibleKeySlides}
      isIntrinsicHeight={true}
      dragEnabled={false}
      infinite={true}
      step={1}>
      <StyledKeyCarouselHeading>
        <StyledNavigationButtons role="group" aria-label={controlsLabel}>
          <ButtonBack
            onClick={handleKeyNumberNavigationButtonClick}
            aria-label={previousButtonLabel}>
            <ArrowRight />
          </ButtonBack>
          <ButtonNext
            aria-label={nextButtonLabel}
            onClick={handleKeyNumberNavigationButtonClick}>
            <ArrowRight />
          </ButtonNext>
        </StyledNavigationButtons>
      </StyledKeyCarouselHeading>

      <StyledSlider
        aria-label={stripTags(title)}
        role="region"
        aria-roledescription="carrousel">
        {items.map((item, index) => {
          return (
            <KeyNumberCarouselSlide
              key={item.title}
              title={item.title}
              slideIndex={index}
              description={item.description}
              secondEmoji={item.secondEmoji}
              firstEmoji={item.firstEmoji}
              thirdEmoji={item.thirdEmoji}
            />
          )
        })}
      </StyledSlider>

      <StyledDots role="group" aria-label={controlsLabel}>
        {items.map((item, index) => {
          return (
            <StyledDot
              onClick={handleKeyNumberNavigationButtonClick}
              slide={index}
              key={item.title}
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

const StyledKeyCarouselHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    padding-right: 7rem;
    margin-bottom: 3rem;
    position: absolute;
    left: -45%;
    top: 14rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
    }
  `}
`

const StyledSlider = styled(Slider)`
  overflow: hidden;
`

const StyledNavigationButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.375rem;
    align-items: center;
    button {
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadows.popover};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.625rem;
      width: 3.625rem;
    }
    button:first-child {
      transform: rotate(180deg);
    }
    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledDots = styled.div`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
    display: none;
  `}
`

const StyledDot = styled(Dot)`
  ${({ theme }) => css`
    height: 0.875rem;
    width: 0.875rem;
    opacity: 0.22;
    border-radius: 50%;
    background-color: ${theme.colors.black};
    &[disabled] {
      background-color: ${theme.colors.secondary};
      opacity: 1;
    }
  `}
`
