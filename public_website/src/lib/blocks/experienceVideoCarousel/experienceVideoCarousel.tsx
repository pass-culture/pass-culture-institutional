import React, { useEffect, useMemo } from 'react'
import { CarouselProvider, Slider } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ExperienceVideoCarouselSlide } from './experieneVideoCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { ExperienceVideoCarouselProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import NavigationWithArrow from '@/ui/components/nav-carousel/NavigationWithArrow'
import NavigationWithDots from '@/ui/components/nav-carousel/NavigationWithDots'
import { Typo } from '@/ui/components/typographies'
import { cleanSlideAttributes } from '@/utils/carouselHelper'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

const MOBILE_WIDTH = getMediaQuery(MediaQueries.MOBILE)
const LARGE_DESKTOP_WIDTH = getMediaQuery(MediaQueries.LARGE_DESKTOP)
export function ExperienceVideoCarousel(props: ExperienceVideoCarouselProps) {
  const { title, isLandscape, carouselItems: items } = props
  const EXPERIENCE_VIDEO_CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
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
    const visibleKeySlides = getvisibleSlides
    return TOTAL_SLIDES > visibleKeySlides
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
    <StylesContainer>
      <ContentWrapper>
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
            <StyledHeading2>{title}</StyledHeading2>
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
          </BlockRendererWithCondition>

          <BlockRendererWithCondition
            condition={isNavShowing && width < MOBILE_WIDTH}>
            <NavigationWithDots
              items={items}
              carrouselSelector={EXPERIENCE_VIDEO_CAROUSEL_SELECTOR}
              slidesSelector={EXPERIENCE_VIDEO_SLIDES_SELECTOR}
              carouselName="EXPERIENCE_VIDEO_CAROUSEL"
            />
          </BlockRendererWithCondition>
        </CarouselProvider>
      </ContentWrapper>
    </StylesContainer>
  )
}

const StylesContainer = styled(ContentWrapper)`
  ${({ theme }) => css`
    background: ${theme.colors.lila};
    min-width: 100%;
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
    max-width: 50%;
    @media (width < ${theme.mediaQueries.mobile}) {
      max-width: 100%;
      text-align: center;
    }
  `}
`
