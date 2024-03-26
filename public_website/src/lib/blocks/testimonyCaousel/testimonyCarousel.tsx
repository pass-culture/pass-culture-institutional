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
import { Typo } from '../../../ui/components/typographies'
import {
  TestimonyCarouselSlide,
  TestimonyCarouselSlideProps,
} from './testimonyCarouselSlide'
import { MediaQueries } from '@/theme/media-queries'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

type TestimonyCarouselProps = {
  title: string
  controlsLabel: string
  nextButtonLabel: string
  previousButtonLabel: string
  items: Omit<TestimonyCarouselSlideProps, 'slideIndex'>[]
}

export function TestimonyCarousel({
  title,
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  items,
}: TestimonyCarouselProps) {
  const TESTIMONY_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const TESTIMONY_SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'

  const [screenWidth, setScreenWidth] = useState<number>()

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const visibleTestimonySlides =
    screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 4

  useEffect(() => {
    const carouselEl = document.querySelector(TESTIMONY_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      TESTIMONY_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [TESTIMONY_CAROUSEL_SELECTOR])

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

  function handleNavigationButtonClick() {
    const carouselEl = document.querySelector(TESTIMONY_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      TESTIMONY_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  return (
    <CarouselProvider
      naturalSlideHeight={75}
      totalSlides={items.length}
      visibleSlides={visibleTestimonySlides}
      isIntrinsicHeight={true}
      naturalSlideWidth={60}
      infinite={true}
      dragEnabled={false}
      step={1}>
      <StyledHeading>
        <Typo.Heading2 dangerouslySetInnerHTML={{ __html: title }} />

        <StyledNavigationButtons role="group" aria-label={controlsLabel}>
          <ButtonBack
            aria-label={previousButtonLabel}
            onClick={handleNavigationButtonClick}>
            <ArrowRight />
          </ButtonBack>
          <ButtonNext
            onClick={handleNavigationButtonClick}
            aria-label={nextButtonLabel}>
            <ArrowRight />
          </ButtonNext>
        </StyledNavigationButtons>
      </StyledHeading>

      <StyledSlider
        role="region"
        aria-label={stripTags(title)}
        aria-roledescription="carrousel">
        {items.map((item, index) => {
          return (
            <TestimonyCarouselSlide
              {...item}
              key={item.title}
              slideIndex={index}
            />
          )
        })}
      </StyledSlider>

      <StyledDots role="group" aria-label={controlsLabel}>
        {items.map((item, index) => {
          return (
            <StyledDot
              slide={index}
              onClick={handleNavigationButtonClick}
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

const StyledHeading = styled.div`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
    }
    justify-content: space-between;
    padding-right: 7rem;
    margin-bottom: 3rem;
    display: flex;
    align-items: end;
  `}
`

const StyledSlider = styled(Slider)`
  overflow: hidden;
`

const StyledNavigationButtons = styled.div`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
    display: flex;
    align-items: center;
    gap: 0.375rem;

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
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
      align-items: center;
    }
  `}
`

const StyledDot = styled(Dot)`
  ${({ theme }) => css`
    opacity: 0.22;
    width: 0.875rem;
    height: 0.875rem;
    border-radius: 50%;
    background-color: ${theme.colors.black};

    &[disabled] {
      opacity: 1;
      background-color: ${theme.colors.secondary};
    }
  `}
`
