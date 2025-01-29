import React, { useEffect, useMemo } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ExperienceVideoCarouselSlide } from './experieneVideoCarouselSlide'
import { ComponentBlockExperienceVideoCarouselFragment } from '@/generated/graphql'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import NavigationWithArrow from '@/ui/components/nav-carousel/NavigationWithArrow'
import NavigationWithDots from '@/ui/components/nav-carousel/NavigationWithDots'
import { Typo } from '@/ui/components/typographies'
import { cleanSlideAttributes } from '@/utils/carouselHelper'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

const MOBILE_WIDTH = getMediaQuery(MediaQueries.MOBILE)
const LARGE_DESKTOP_WIDTH = getMediaQuery(MediaQueries.LARGE_DESKTOP)

export function ExperienceVideoCarousel(
  props: Omit<ComponentBlockExperienceVideoCarouselFragment, 'id'>
) {
  const { title, isLandscape, carouselItems: items } = props
  const EXPERIENCE_VIDEO_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title ?? ''
  )}"]`
  const EXPERIENCE_VIDEO_SLIDES_SELECTOR =
    '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })
  const TOTAL_SLIDES = useMemo(() => items.length, [items])

  const getvisibleSlides = useMemo(() => {
    if (width < MOBILE_WIDTH) return 1
    if (width < LARGE_DESKTOP_WIDTH) return 2
    return 4
  }, [width])

  const visibleSlides = getvisibleSlides

  const isNavShowing = useMemo(() => {
    return TOTAL_SLIDES > getvisibleSlides
  }, [TOTAL_SLIDES, getvisibleSlides])

  useEffect(() => {
    const carouselEl = document.querySelector(
      EXPERIENCE_VIDEO_CAROUSEL_SELECTOR
    )
    const carouselSlidesEl = carouselEl?.querySelectorAll(
      EXPERIENCE_VIDEO_SLIDES_SELECTOR
    )

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [EXPERIENCE_VIDEO_CAROUSEL_SELECTOR])

  return (
    <StyledBackgroundExperienceVideoCarousel>
      <StyledContainer>
        <CarouselProvider
          naturalSlideWidth={60}
          naturalSlideHeight={75}
          visibleSlides={visibleSlides}
          totalSlides={TOTAL_SLIDES}
          isIntrinsicHeight
          dragEnabled={false}
          infinite={false}
          step={1}>
          <StyledHeading>
            <StyledHeading2>{title ?? ''}</StyledHeading2>
            <BlockRendererWithCondition condition={isNavShowing}>
              <BlockRendererWithCondition condition={width > MOBILE_WIDTH}>
                <NavigationWithArrow
                  carrouselSelector={EXPERIENCE_VIDEO_CAROUSEL_SELECTOR}
                  slidesSelector={EXPERIENCE_VIDEO_SLIDES_SELECTOR}
                />
              </BlockRendererWithCondition>
            </BlockRendererWithCondition>
          </StyledHeading>

          <BlockRendererWithCondition condition={items && items.length > 0}>
            <StyledSlider
              classNameAnimation="customCarrouselAnimation"
              aria-label={stripTags(title ?? '')}
              aria-roledescription="carrousel">
              {items
                ?.filter((item) => item !== null)
                .map((item, index) => {
                  return (
                    <ExperienceVideoCarouselSlide
                      isLandscape={isLandscape ?? false}
                      key={`${item?.title ?? ''}_${index}`}
                      slideIndex={index}
                      {...item}
                    />
                  )
                })}
            </StyledSlider>
          </BlockRendererWithCondition>
          <BlockRendererWithCondition
            condition={isNavShowing && width < MOBILE_WIDTH}>
            <NavigationWithDots
              items={items.filter((item) => item !== null) ?? []}
              carrouselSelector={EXPERIENCE_VIDEO_CAROUSEL_SELECTOR}
              slidesSelector={EXPERIENCE_VIDEO_SLIDES_SELECTOR}
              carouselName="EXPERIENCE_VIDEO_CAROUSEL"
            />
          </BlockRendererWithCondition>
        </CarouselProvider>
      </StyledContainer>
    </StyledBackgroundExperienceVideoCarousel>
  )
}
const StyledBackgroundExperienceVideoCarousel = styled.div`
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    background: ${theme.colors.lila};
    margin-top: var(--module-margin);
    margin-bottom: var(--module-margin);
  `}
`
const StyledContainer = styled(ContentWrapper)`
  ${({ theme }) => css`
  padding-top: var(--module-margin);
  padding-bottom: var(--module-margin);
  @media (width < ${theme.mediaQueries.mobile}) {
    padding-top:1.875rem;
    padding-bottom:1.875rem;
  }
  }
  `}
`

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

const StyledHeading2 = styled(Typo.Heading2)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 100%;
      text-align: center;
    }
  `}
`
