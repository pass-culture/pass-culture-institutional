import React, { useEffect, useMemo } from 'react'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slider,
} from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { LogoCarouselSlide } from './logoCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { StyledDot } from '@/theme/style'
import { LogoCarouselProps } from '@/types/props'
import { ArrowRight } from '@/ui/components/icons/ArrowRight'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

const MEDIA_QUERY = getMediaQuery(MediaQueries.LARGE_DESKTOP)

export function LogoCarousel(props: LogoCarouselProps) {
  const { items } = props
  const LOGO_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    'title'
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 200 })
  const TOTAL_SLIDES = useMemo(() => items.length, [items])

  const visibleSlides = width < MEDIA_QUERY ? 1 : 6

  useEffect(() => {
    const carouselEl = document.querySelector(LOGO_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [LOGO_CAROUSEL_SELECTOR])

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

  const isNavShowing = (): boolean => {
    return TOTAL_SLIDES > visibleSlides
  }

  function handleNavigationButtonClick() {
    const carouselEl = document.querySelector(LOGO_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  return (
    <CarouselProvider
      naturalSlideWidth={60}
      naturalSlideHeight={75}
      totalSlides={TOTAL_SLIDES}
      visibleSlides={visibleSlides}
      isIntrinsicHeight
      infinite
      dragEnabled={false}
      step={1}>
      <StyledSlider
        classNameAnimation="customCarrouselAnimation"
        aria-label={stripTags('title')}
        aria-roledescription="carrousel">
        {items?.map((item, index) => {
          return (
            item.logo && (
              <LogoCarouselSlide
                key={item.logo.data.attributes.hash}
                slideIndex={index}
                {...item}
                image={item.logo}
              />
            )
          )
        })}
      </StyledSlider>

      <BlockRendererWithCondition condition={isNavShowing()}>
        <StyledHeading>
          <StyledNavigationButtons aria-label="Contrôles du carousel">
            <ButtonBack
              aria-label="Élement précédent"
              onClick={handleNavigationButtonClick}>
              <ArrowRight />
            </ButtonBack>
            <ButtonNext
              aria-label="Élément suivant"
              onClick={handleNavigationButtonClick}>
              <ArrowRight />
            </ButtonNext>
          </StyledNavigationButtons>
        </StyledHeading>
        <StyledDots aria-label="Contrôles du carousel">
          {items?.map((item, index) => {
            return (
              item.logo && (
                <StyledDot
                  onClick={handleNavigationButtonClick}
                  key={item.logo.data.attributes.hash}
                  slide={index}
                  aria-label={`Afficher la diapositive ${index + 1} sur ${
                    items.length
                  } : ${item.logo?.data?.attributes?.alternativeText}`}
                />
              )
            )
          })}
        </StyledDots>
      </BlockRendererWithCondition>
    </CarouselProvider>
  )
}

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: center;
    margin-top: 3rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      padding-right: 0;
      margin-top: 2.5rem;
    }
  `}
`

const StyledSlider = styled(Slider)`
  overflow: hidden;

  .carousel__slider-tray {
    margin: auto;
  }
`

const StyledNavigationButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: 0.375rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      display: none;
    }

    button {
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadows.buttonCircular};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.625rem;
      width: 3.625rem;
      cursor: pointer;
      &:hover {
        filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.15));
        box-shadow: none;
      }
      transition: all 0.3s ease-in-out;
      &:focus {
        outline: 2px solid ${theme.colors.primary};
      }
    }

    button:first-child {
      svg {
        transform: rotate(180deg);
      }
    }
  `}
`

const StyledDots = styled.div`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
  `}
`
