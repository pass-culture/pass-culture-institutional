import React, { useEffect, useMemo } from 'react'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slider,
} from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ExperienceVideoCarouselSlide } from './experieneVideoCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MediaQueries } from '@/theme/media-queries'
import { StyledDot } from '@/theme/style'
import { ExperienceVideoCarouselProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { ArrowRight } from '@/ui/components/icons/ArrowRight'
import { Typo } from '@/ui/components/typographies'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

const MEDIA_QUERY_MOBILE = getMediaQuery(MediaQueries.MOBILE)

export function ExperienceVideoCarousel({
  title,
  isLandscape,
  carouselItems: items,
}: ExperienceVideoCarouselProps) {
  const EXPERIENCE_VIDEO_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const EXPERIENCE_VIDEO_SLIDES_SELECTOR =
    '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })

  const setVisibleSlide = (): number => {
    if (width < MEDIA_QUERY_MOBILE) return 1
    if (isLandscape) return 2
    return 4
  }

  const TOTAL_SLIDES = useMemo(() => items.length, [items])

  const isNavShowing = (): boolean => {
    if (TOTAL_SLIDES > visibleSlides) return true
    return false
  }

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

  function handleExperienceVideoNavigationButtonClick(): void {
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

  const visibleSlides = setVisibleSlide()

  return (
    <ContentWrapper>
      <CarouselProvider
        naturalSlideWidth={60}
        naturalSlideHeight={75}
        visibleSlides={visibleSlides}
        totalSlides={TOTAL_SLIDES}
        isIntrinsicHeight
        dragEnabled={false}
        infinite
        step={1}>
        <StyledHeading>
          <StyledHeading2>{title}</StyledHeading2>
          {isNavShowing() && (
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
          )}
        </StyledHeading>

        <StyledSlider
          classNameAnimation="customCarrouselAnimation"
          aria-label={stripTags(title)}
          aria-roledescription="carrousel">
          {items?.map((item, index) => {
            return (
              <ExperienceVideoCarouselSlide
                isLandscape={isLandscape}
                key={`${item.title}_${index}`}
                slideIndex={index}
                {...item}
              />
            )
          })}
        </StyledSlider>

        {isNavShowing() && (
          <StyledDots aria-label="Contrôles du carousel">
            {items?.map((item, index) => {
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
        )}
      </CarouselProvider>
    </ContentWrapper>
  )
}

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 3rem;

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
      box-shadow: ${theme.shadows.buttonCircular};
      transition: all 0.3s ease-in-out;
      border-radius: 50%;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 3.625rem;
      height: 3.625rem;
      cursor: pointer;
      &:focus {
        outline: 2px solid ${theme.colors.primary};
      }
      &:hover {
        box-shadow: none;
        filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.15));
      }
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
const StyledHeading2 = styled(Typo.Heading2)`
  ${({ theme }) => css`
    max-width: 50%;
    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 100%;
      text-align: center;
    }
  `}
`
