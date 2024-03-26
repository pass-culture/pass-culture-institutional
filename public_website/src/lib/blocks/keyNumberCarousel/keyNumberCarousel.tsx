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
    const handleResize = () => setScreenWidth(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
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
      naturalSlideWidth={60}
      naturalSlideHeight={75}
      totalSlides={items.length}
      visibleSlides={visibleKeySlides}
      isIntrinsicHeight={true}
      infinite={true}
      dragEnabled={false}
      step={1}>
      <StyledKeyCarouselHeading>
        <StyledNavigationButtons role="group" aria-label={controlsLabel}>
          <ButtonBack
            aria-label={previousButtonLabel}
            onClick={handleKeyNumberNavigationButtonClick}>
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
        role="region"
        aria-label={stripTags(title)}
        aria-roledescription="carrousel">
        {items.map((item, index) => {
          return (
            <KeyNumberCarouselSlide
              key={item.title}
              slideIndex={index}
              title={item.title}
              description={item.description}
              firstEmoji={item.firstEmoji}
              secondEmoji={item.secondEmoji}
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
    align-items: center;
    gap: 0.375rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }

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
  `}
`

const StyledDots = styled.div`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.mobile}) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
  `}
`

const StyledDot = styled(Dot)`
  ${({ theme }) => css`
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    opacity: 0.22;
    background-color: ${theme.colors.black};

    &[disabled] {
      background-color: ${theme.colors.secondary};
      opacity: 1;
    }
  `}
`
