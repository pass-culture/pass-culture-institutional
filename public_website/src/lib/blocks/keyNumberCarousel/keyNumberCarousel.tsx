import React, { useEffect, useMemo } from 'react'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slider,
} from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import {
  KeyNumberCarouselSlide,
  KeyNumberCarouselSlideProps,
} from './keyNumberCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import { MediaQueries } from '@/theme/media-queries'
import { StyledDot } from '@/theme/style'
import { ArrowRight } from '@/ui/components/icons/ArrowRight'
import { Typo } from '@/ui/components/typographies'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

type KeyNumberCarouselProps = {
  title: string
  items: Omit<KeyNumberCarouselSlideProps, 'slideIndex'>[]
}
const MEDIA_QUERY = getMediaQuery(MediaQueries.MOBILE)
export function KeyNumberCarousel({ title, items }: KeyNumberCarouselProps) {
  const KEY_NUMBER_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const KEY_NUMBER_SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 200 })
  const TOTAL_SLIDES = useMemo(() => items.length, [items])
  const getvisibleKeySlides = (): number => {
    if (width < MEDIA_QUERY) return 1.2
    if (items.length > 2) return 2.2
    return 2
  }

  const isNavShowing = (): boolean => {
    const visibleKeySlides = getvisibleKeySlides()
    if (TOTAL_SLIDES > visibleKeySlides) return true
    return false
  }

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

  function handleKeyNumberNavigationButtonClick(): void {
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
  const visibleKeySlides = getvisibleKeySlides()

  return (
    <StyledCarouselProvider
      naturalSlideHeight={75}
      naturalSlideWidth={60}
      totalSlides={TOTAL_SLIDES}
      visibleSlides={visibleKeySlides}
      isIntrinsicHeight
      dragEnabled
      infinite
      step={1}>
      <StyledKeyCarouselHeading>
        <StyledTitle>{title}</StyledTitle>

        {isNavShowing() && (
          <StyledNavigationButtons aria-label="Contrôles du carousel">
            <ButtonBack
              onClick={handleKeyNumberNavigationButtonClick}
              aria-label="Élement précédent">
              <ArrowRight />
            </ButtonBack>
            <ButtonNext
              aria-label="Élément suivant"
              onClick={handleKeyNumberNavigationButtonClick}>
              <ArrowRight />
            </ButtonNext>
          </StyledNavigationButtons>
        )}
      </StyledKeyCarouselHeading>

      <StyledSlider
        classNameAnimation="customCarrouselAnimation"
        aria-label={stripTags(title)}
        aria-roledescription="carousel">
        {items?.map((item, index) => {
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

      {isNavShowing() && (
        <StyledDots aria-label="Contrôles du carousel">
          {items?.map((item, index) => {
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
      )}
    </StyledCarouselProvider>
  )
}

const StyledCarouselProvider = styled(CarouselProvider)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    background-color: ${theme.colors.lightBlue};

    padding: 3.5rem 0;
    margin: auto;
    margin-bottom: var(--module-margin);
    margin-top: var(--module-margin);

    @media (max-width: ${theme.mediaQueries.mobile}) {
      padding: 0;
      flex-direction: column;
      margin: 0 auto;
    }
  `}
`
const StyledKeyCarouselHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    padding-right: 7rem;
    padding-left: 5rem;
    margin-bottom: 3rem;
    width: 30%;

    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
      margin-bottom: 2.5rem;
      margin-top: 2.5rem;
      padding: 0 1rem;
      box-sizing: border-box;
    }
  `}
`
const StyledTitle = styled(Typo.Heading2)`
  margin: 1.5rem 0 0.25rem;

  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    margin: 0;
  }
`
const StyledSlider = styled(Slider)`
  ${({ theme }) => css`
    overflow: hidden;
    width: 70%;
    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
    }
  `}
`

const StyledNavigationButtons = styled.div`
  ${({ theme }) => css`
    display: flex;
    gap: 0.375rem;
    align-items: center;
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
        box-shadow: none;
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
      padding-bottom: 2.8rem;
    }
    display: none;
  `}
`
