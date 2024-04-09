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
  OffersCarouselSlide,
  OffersCarouselSlideProps,
} from './offersCarouselSlide'
import { MediaQueries } from '@/theme/media-queries'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Link } from '@/ui/components/Link'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

type OffersVideoCarouselProps = {
  title: string
  items: Omit<OffersCarouselSlideProps, 'slideIndex'>[]
  cta: { Label: string; URL: string }
}

export function OffersCarousel({
  title,
  items,
  cta,
}: OffersVideoCarouselProps) {
  const OFFERS_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const OFFERS_SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'

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
    screenWidth && screenWidth < getMediaQuery(MediaQueries.MOBILE) ? 1 : 3.2

  useEffect(() => {
    const carouselEl = document.querySelector(OFFERS_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      OFFERS_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      cleanExperienceSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [OFFERS_CAROUSEL_SELECTOR])

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
    const carouselEl = document.querySelector(OFFERS_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      OFFERS_SLIDES_SELECTOR
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
      <StyledHeading $noBottomMargin>
        <Typo.Heading2 dangerouslySetInnerHTML={{ __html: title }} />

        <StyledArrowButtonWrapper>
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
          <CtaLink href={cta.URL}>
            <span>{cta.Label}</span>
          </CtaLink>
        </StyledArrowButtonWrapper>
      </StyledHeading>

      <StyledSlider
        aria-label={stripTags(title)}
        aria-roledescription="carrousel">
        {items.map((item, index) => {
          return (
            <OffersCarouselSlide
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

      <MobileCtaWrapper>
        <MobileCtaLink href={cta?.URL}>{cta?.Label}</MobileCtaLink>
      </MobileCtaWrapper>
    </StyledCarousel>
  )
}

const StyledCarousel = styled(CarouselProvider)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      width: 100%;
    }
  `}
`
const StyledHeading = styled(ContentWrapper)`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;
    /* padding-right: 7rem; */

    h2 {
      width: 60%;
      text-align: center;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
      padding-right: 0;
    }
  `}
`

const StyledSlider = styled(Slider)`
  overflow: hidden;
  padding: 2rem 0;

  .carousel__slider-tray {
    transition: transform 0.2s ease-in;
  }
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
      &:hover {
        box-shadow: none;
        filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.15));
      }
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadows.popover};
      border-radius: 50%;
      align-items: center;
      display: flex;
      justify-content: center;
      width: 3.625rem;
      height: 3.625rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:focus {
        outline: 2px solid ${theme.colors.primary};
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

const CtaLink = styled(Link)`
  ${({ theme }) => css`
    display: inline-block;

    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;
    height: fit-content;

    margin-right: 1.5rem;
    background: linear-gradient(
      90deg,
      ${theme.colors.tertiary},
      ${theme.colors.secondary}
    );
    color: ${theme.colors.white};
    position: relative;
    span {
      position: relative;
      z-index: 1;
    }
    &:hover {
      &:after {
        opacity: 1;
      }
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      height: 100%;
      width: 100%;
      border-radius: 100px;
      background-color: rgba(46, 5, 146, 0.7);
      opacity: 0;
      z-index: 0;
      transition: opacity 0.4s ease-in-out;
      pointer-events: none;
      z-index: 0;
    }
    padding: 1rem 1.75rem;
    border-radius: 100px;

    @media (width < ${theme.mediaQueries.tablet}) {
      display: none;
    }
  `}
`

const StyledArrowButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 50%;
  align-self: end;
  align-items: center;
`

const MobileCtaWrapper = styled.div`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.tablet}) {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 1rem;
    }
  `}
`

const MobileCtaLink = styled(Link)`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.tablet}) {
      display: inline-block;
      font-size: ${theme.fonts.sizes.xs};
      font-weight: ${theme.fonts.weights.semiBold};
      line-height: 1.4;
      margin: auto;
      margin-top: 1rem;
      background: linear-gradient(
        90deg,
        ${theme.colors.tertiary},
        ${theme.colors.secondary}
      );
      color: ${theme.colors.white};
      padding: 1rem 1.75rem;
      border-radius: 100px;
    }
  `}
`
