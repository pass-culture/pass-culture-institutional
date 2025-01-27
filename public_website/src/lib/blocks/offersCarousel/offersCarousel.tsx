import React, { useEffect, useMemo } from 'react'
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { OffersCarouselSlide } from './offersCarouselSlide'
import { ComponentBlockOffersCarouselFragment } from '@/generated/graphql'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { Link } from '@/ui/components/Link'
import NavigationWithArrow from '@/ui/components/nav-carousel/NavigationWithArrow'
import NavigationWithDots from '@/ui/components/nav-carousel/NavigationWithDots'
import { Typo } from '@/ui/components/typographies'
import { cleanSlideAttributes } from '@/utils/carouselHelper'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { isRenderable } from '@/utils/isRenderable'
import { stripTags } from '@/utils/stripTags'

const MOBILE_WIDTH = getMediaQuery(MediaQueries.MOBILE)
const LARGE_DESKTOP_WIDTH = getMediaQuery(MediaQueries.LARGE_DESKTOP)

export function OffersCarousel(props: ComponentBlockOffersCarouselFragment) {
  const { requiredTitle, offersCarouselItems, requiredCta, jsonDescription } =
    props
  const OFFERS_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    requiredTitle ?? ''
  )}"]`
  const OFFERS_SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })
  const TOTAL_SLIDES = useMemo(
    () => offersCarouselItems?.length ?? 0,
    [offersCarouselItems]
  )

  const getvisibleSlides = useMemo(() => {
    if (width < MOBILE_WIDTH) return 1
    if (width < LARGE_DESKTOP_WIDTH) return 2
    return 3.2
  }, [width])

  const isNavShowing = useMemo(() => {
    const visibleKeySlides = getvisibleSlides

    return TOTAL_SLIDES > visibleKeySlides
  }, [TOTAL_SLIDES, getvisibleSlides])

  useEffect(() => {
    const carouselEl = document.querySelector(OFFERS_CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      OFFERS_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [OFFERS_CAROUSEL_SELECTOR])

  const visibleSlides = getvisibleSlides

  const descriptionIsEmpty =
    !jsonDescription ||
    (jsonDescription.length === 1 &&
      jsonDescription.at(0)?.children.at(0)?.type === 'text' &&
      (jsonDescription.at(0)?.children.at(0) as { text: string })?.text === '')

  return (
    <StyledCarousel
      naturalSlideWidth={60}
      naturalSlideHeight={75}
      visibleSlides={visibleSlides}
      totalSlides={TOTAL_SLIDES}
      isIntrinsicHeight
      dragEnabled
      touchEnabled
      infinite={false}
      step={1}>
      <StyledHeading>
        <Typo.Heading2>{requiredTitle ?? ''}</Typo.Heading2>

        <BlockRendererWithCondition condition={!descriptionIsEmpty}>
          <BlocksRenderer content={jsonDescription as BlocksContent} />
        </BlockRendererWithCondition>

        <StyledArrowButtonWrapper>
          <BlockRendererWithCondition condition={isNavShowing}>
            <BlockRendererWithCondition condition={width > MOBILE_WIDTH}>
              <NavigationWithArrow
                carrouselSelector={OFFERS_CAROUSEL_SELECTOR}
                slidesSelector={OFFERS_SLIDES_SELECTOR}
              />
            </BlockRendererWithCondition>
          </BlockRendererWithCondition>
          <BlockRendererWithCondition
            condition={isRenderable(requiredCta?.URL)}>
            <CtaLink href={requiredCta?.URL}>
              <span>{requiredCta?.Label}</span>
            </CtaLink>
          </BlockRendererWithCondition>
        </StyledArrowButtonWrapper>
      </StyledHeading>

      <StyledSlider
        classNameAnimation="customCarrouselAnimation"
        preventVerticalScrollOnTouch
        aria-label={stripTags(requiredTitle ?? '')}
        aria-roledescription="carrousel">
        {offersCarouselItems
          ?.filter((item) => item !== null)
          .map((item, index) => {
            return (
              <OffersCarouselSlide
                key={`${item?.title ?? ''}_${index}`}
                slideIndex={index}
                {...item}
              />
            )
          })}
      </StyledSlider>
      <BlockRendererWithCondition
        condition={isNavShowing && width < MOBILE_WIDTH}>
        <NavigationWithDots
          items={offersCarouselItems?.filter((item) => item !== null) ?? []}
          carrouselSelector={OFFERS_CAROUSEL_SELECTOR}
          slidesSelector={OFFERS_SLIDES_SELECTOR}
          carouselName="OFFERS_CAROUSEL"
        />
      </BlockRendererWithCondition>

      <BlockRendererWithCondition condition={isRenderable(requiredCta?.Label)}>
        <MobileCtaWrapper>
          <MobileCtaLink href={requiredCta?.URL}>
            {requiredCta?.Label}
          </MobileCtaLink>
        </MobileCtaWrapper>
      </BlockRendererWithCondition>
    </StyledCarousel>
  )
}

const StyledCarousel = styled(CarouselProvider)`
  ${({ theme }) => css`
    margin-bottom: var(--module-margin);
    margin-top: var(--module-margin);

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      width: 100%;
    }
  `}
`

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 2rem;

    h2 {
      width: 60%;
      text-align: center;
    }

    p {
      max-width: 40rem;
    }

    p a {
      color: ${theme.colors.primary};
      text-decoration: underline;
    }
    margin: 0px auto;
    position: relative;
    max-width: calc(var(--container-width, 75.8125rem) + 1.3rem);
    padding-left: 1.3rem;
    padding-right: 1.3rem;
  `}
`

const StyledSlider = styled(Slider)`
  overflow: hidden;
  padding: 3.125rem 0;

  @media (width < ${(p) => p.theme.mediaQueries.largeDesktop}) {
    padding: 3.5rem 0;
  }
  @media (width < ${(p) => p.theme.mediaQueries.mobile}) {
    padding: 0;
  }
`

const CtaLink = styled(Link)`
  ${({ theme }) => css`
    display: inline-block;

    font-size: ${theme.fonts.sizes.xs};
    font-weight: ${theme.fonts.weights.semiBold};
    line-height: 1.4;
    height: fit-content;

    background: linear-gradient(
      90deg,
      ${theme.colors.tertiary},
      ${theme.colors.secondary}
    );
    color: ${theme.colors.white};
    position: absolute;
    right: 0;
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

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      display: none;
    }
  `}
`

const StyledArrowButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`

const MobileCtaWrapper = styled.div`
  ${({ theme }) => css`
    display: none;

    @media (width < ${theme.mediaQueries.largeDesktop}) {
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

    @media (width < ${theme.mediaQueries.largeDesktop}) {
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
