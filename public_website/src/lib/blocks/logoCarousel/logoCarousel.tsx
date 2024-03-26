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
import { LogoCarouselSlide } from './logoCarouselSlide'
import { MediaQueries } from '@/theme/media-queries'
import { APIResponse } from '@/types/strapi'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

type LogoCarouselProps = {
  controlsLabel: string | undefined
  nextButtonLabel: string | undefined
  previousButtonLabel: string | undefined
  items: { logo?: APIResponse<'plugin::upload.file'> | null | undefined }[]
}

export function LogoCarousel({
  controlsLabel,
  nextButtonLabel,
  previousButtonLabel,
  items,
}: LogoCarouselProps) {
  const CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    'title'
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'

  const [screenWidth, setScreenWidth] = useState<number>()

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const visibleSlides =
    screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 6

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

  function handleNavigationButtonClick() {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    if (items) {
      setTotal(items.length)
    }
  }, [items])
  return (
    <CarouselProvider
      naturalSlideWidth={60}
      naturalSlideHeight={75}
      totalSlides={total}
      visibleSlides={visibleSlides}
      isIntrinsicHeight={true}
      infinite={true}
      dragEnabled={false}
      step={1}>
      <StyledSlider
        role="region"
        aria-label={stripTags('title')}
        aria-roledescription="carrousel">
        {items?.map((item, index) => {
          return (
            <LogoCarouselSlide
              key={item.logo?.data.attributes.alternativeText}
              slideIndex={index}
              {...item}
              image={item.logo}
            />
          )
        })}
      </StyledSlider>
      <StyledHeading>
        {/* <Typo.Heading2 dangerouslySetInnerHTML={{ __html: title }} /> */}

        <StyledNavigationButtons role="group" aria-label={controlsLabel}>
          <ButtonBack
            aria-label={previousButtonLabel}
            onClick={handleNavigationButtonClick}>
            <ArrowRight />
          </ButtonBack>
          <ButtonNext
            aria-label={nextButtonLabel}
            onClick={handleNavigationButtonClick}>
            <ArrowRight />
          </ButtonNext>
        </StyledNavigationButtons>
      </StyledHeading>
      <StyledDots role="group" aria-label={controlsLabel}>
        {items?.map((item, index) => {
          return (
            <StyledDot
              onClick={handleNavigationButtonClick}
              key={item.logo?.data.attributes.alternativeText}
              slide={index}
              aria-label={`Afficher la diapositive ${index + 1} sur ${
                items.length
              } : ${item.logo?.data.attributes.alternativeText}`}
            />
          )
        })}
      </StyledDots>
    </CarouselProvider>
  )
}

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: center;
    padding-right: 7rem;
    margin-top: 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-top: 2.5rem;
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
