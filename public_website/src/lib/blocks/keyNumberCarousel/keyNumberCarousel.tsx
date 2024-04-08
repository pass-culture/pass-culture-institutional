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
import { Typo } from '@/ui/components/typographies'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

type KeyNumberCarouselProps = {
  title: string
  items: Omit<KeyNumberCarouselSlideProps, 'slideIndex'>[]
}

export function KeyNumberCarousel({ title, items }: KeyNumberCarouselProps) {
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
    <StyledCarouselProvider
      naturalSlideHeight={75}
      naturalSlideWidth={60}
      totalSlides={items.length}
      visibleSlides={visibleKeySlides}
      isIntrinsicHeight={true}
      dragEnabled={false}
      infinite={true}
      step={1}>
      <StyledKeyCarouselHeading>
        <StyledTitle dangerouslySetInnerHTML={{ __html: title }} />

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
      </StyledKeyCarouselHeading>

      <StyledSlider
        aria-label={stripTags(title)}
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

      <StyledDots aria-label="Contrôles du carousel">
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
    </StyledCarouselProvider>
  )
}

const StyledCarouselProvider = styled(CarouselProvider)`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    background-color: ${theme.colors.secondary}20;

    padding: 2rem 0;
    margin: 4rem auto;
    @media (max-width: ${theme.mediaQueries.mobile}) {
      padding: 0 1rem;
      display: block;
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
      padding: 0;
    }
  `}
`
const StyledTitle = styled(Typo.Heading2)`
  margin: 1.5rem 0 0.25rem;
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
      box-shadow: ${theme.shadows.popover};
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
      padding-bottom: 1rem;
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
