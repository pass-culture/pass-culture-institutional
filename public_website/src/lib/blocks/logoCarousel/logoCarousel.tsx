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
import { LogoCarouselSlide, LogoCarouselSlideProps } from './logoCarouselSlide'
import { MediaQueries } from '@/theme/media-queries'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'
import { APIResponse } from '@/types/strapi'

export type LogoCarouselProps = {
  controlsLabel: string | undefined
  nextButtonLabel: string | undefined
  previousButtonLabel: string | undefined
  //   items: Omit<LogoCarouselSlideProps, 'slideIndex'>[]
  items?:
    | ({ logo?: APIResponse<'plugin::upload.file'> | null | undefined } & {})[]
    | undefined
  //   items: APIResponse<'plugin::upload.file'>[] | undefined | null
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

  // Computed the number of visible slides depending on screen width
  const [screenWidth, setScreenWidth] = useState<number>()

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  // Get the MQ in rem and convert it in pixels
  const visibleSlides =
    screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 6

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
  })
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
          console.log(item)
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
