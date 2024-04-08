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
  ExperienceVideoCarouselSlide,
  ExperienceVideoCarouselSlideProps,
} from './experieneVideoCarouselSlide'
import { MediaQueries } from '@/theme/media-queries'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

type ExperienceVideoCarouselProps = {
  title: string
  items: Omit<ExperienceVideoCarouselSlideProps, 'slideIndex'>[]
}

export function ExperienceVideoCarousel({
  title,
  items,
}: ExperienceVideoCarouselProps) {
  const EXPERIENCE_VIDEO_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const EXPERIENCE_VIDEO_SLIDES_SELECTOR =
    '[aria-roledescription="diapositive"]'

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
    screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 2

  useEffect(() => {
    const carouselEl = document.querySelector(
      EXPERIENCE_VIDEO_CAROUSEL_SELECTOR
    )
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      EXPERIENCE_VIDEO_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      cleanExperienceSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [EXPERIENCE_VIDEO_CAROUSEL_SELECTOR])

  function cleanExperienceSlideAttributes(
    carouselEl: Element,
    slidesEl: NodeListOf<Element>
  ) {
    carouselEl?.removeAttribute('aria-live')
    carouselEl?.removeAttribute('tabindex')

    slidesEl.forEach((slideEl) => {
      slideEl.removeAttribute('aria-selected')
      slideEl.removeAttribute('tabindex')
    })
  }

  function handleExperienceVideoNavigationButtonClick() {
    const carouselEl = document.querySelector(
      EXPERIENCE_VIDEO_CAROUSEL_SELECTOR
    )
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      EXPERIENCE_VIDEO_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanExperienceSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  return (
    <StyledCarousel
      naturalSlideWidth={60}
      naturalSlideHeight={75}
      visibleSlides={visibleSlides}
      totalSlides={items.length}
      isIntrinsicHeight={true}
      dragEnabled={false}
      infinite={true}
      step={1}>
      <StyledHeading>
        <StyledHeading2 dangerouslySetInnerHTML={{ __html: title }} />

        <StyledNavigationButtons aria-label="Contrôles du carousel">
          <ButtonBack
            onClick={handleExperienceVideoNavigationButtonClick}
            aria-label="Élement précédent">
            <ArrowRight />
          </ButtonBack>
          <ButtonNext
            aria-label="Élément suivant"
            onClick={handleExperienceVideoNavigationButtonClick}>
            <ArrowRight />
          </ButtonNext>
        </StyledNavigationButtons>
      </StyledHeading>

      <StyledSlider
        aria-label={stripTags(title)}
        aria-roledescription="carrousel">
        {items.map((item, index) => {
          return (
            <ExperienceVideoCarouselSlide
              key={item.title}
              slideIndex={index}
              {...item}
            />
          )
        })}
      </StyledSlider>

      <StyledDots aria-label="Contrôles du carousel">
        {items.map((item, index) => {
          return (
            <StyledDot
              onClick={handleExperienceVideoNavigationButtonClick}
              slide={index}
              key={item.title}
              aria-label={`Afficher la diapositive ${index + 1} sur ${
                items.length
              } : ${item.title}`}
            />
          )
        })}
      </StyledDots>
    </StyledCarousel>
  )
}

const StyledCarousel = styled(CarouselProvider)`
  width: 90%;
  margin: auto;
`
const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 3rem;
    padding-right: 1.3rem;

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

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }

    button {
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadows.popover};
      border-radius: 50%;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 3.625rem;
      height: 3.625rem;
      cursor: pointer;
      &:hover {
        filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.15));
      }
      &:focus {
        outline: 2px solid ${theme.colors.primary};
      }
      transition: all 0.3s ease-in-out;
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
      align-items: center;
      gap: 0.5rem;
      margin-top: 2rem;
    }
  `}
`

const StyledDot = styled(Dot)`
  ${({ theme }) => css`
    width: 0.875rem;
    border-radius: 50%;
    height: 0.875rem;
    opacity: 0.22;
    background-color: ${theme.colors.black};

    &[disabled] {
      opacity: 1;
      background-color: ${theme.colors.secondary};
    }
  `}
`

const StyledHeading2 = styled(Typo.Heading2)`
  ${({ theme }) => css`
    max-width: 50%;
    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 100%;
    }
  `}
`
