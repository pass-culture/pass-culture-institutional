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
  items: { logo: APIResponse<'plugin::upload.file'> | null | undefined }[]
}

export function LogoCarousel({ items }: LogoCarouselProps) {
  const LOGO_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
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

  function handleNavigationButtonClick() {
    const carouselEl = document.querySelector(LOGO_CAROUSEL_SELECTOR)
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
    margin-top: 3rem;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      padding-right: 0;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
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
