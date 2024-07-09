import React, { useEffect } from 'react'
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slider,
} from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { VerticalCarouselSlide } from './VerticalCarouselSlide'
import { useWindowSize } from '@/hooks/useWindowSize'
import BlockRendererWithCondition from '@/lib/BlockRendererWithCondition'
import { MediaQueries } from '@/theme/media-queries'
import { StyledDot } from '@/theme/style'
import { VerticalCarouselProps } from '@/types/props'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { ArrowRight } from '@/ui/components/icons/ArrowRight'
import { Typo } from '@/ui/components/typographies'
import { getMediaQuery } from '@/utils/getMediaQuery'
import { stripTags } from '@/utils/stripTags'

export function VerticalCarousel(props: VerticalCarouselProps) {
  const { title, items, hidePlayIcon } = props
  const itemsFilter = items.filter((item) => {
    return item.image && item.image !== ''
  })

  const CAROUSEL_SELECTOR = `[aria-roledescription="carrousel"][aria-label="${stripTags(
    title
  )}"]`
  const SLIDES_SELECTOR = '[aria-roledescription="diapositive"]'
  const { width = 0 } = useWindowSize({ debounceDelay: 50 })
  const visibleSlides = width < getMediaQuery(MediaQueries.MOBILE) ? 1 : 4

  /**
   * Remove unnecessary HTML attributes for a11y.
   * PR #469 will improve that: https://github.com/express-labs/pure-react-carousel/pull/469
   *
   * "pure-react-carousel" does not permit using `ref` on components to allow changing attributes
   */
  useEffect(() => {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      cleanSlideAttributes(carouselEl, carouselSlidesEl)
    }
  }, [CAROUSEL_SELECTOR])

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

  // Remove attributes when clicking "previous", "next" and dots buttons
  function handleNavigationButtonClick() {
    const carouselEl = document.querySelector(CAROUSEL_SELECTOR)
    const carouselSlidesEl = carouselEl?.querySelectorAll(SLIDES_SELECTOR)

    if (carouselEl && carouselSlidesEl) {
      setTimeout(() => {
        cleanSlideAttributes(carouselEl, carouselSlidesEl)
      }, 1)
    }
  }

  const isNavigation = (): boolean => {
    return itemsFilter.length > 0
  }
  const TOTAL_SLIDE = itemsFilter.length

  return (
    <Root>
      <ContentWrapper>
        <CarouselProvider
          naturalSlideWidth={60}
          naturalSlideHeight={75}
          totalSlides={TOTAL_SLIDE}
          visibleSlides={visibleSlides}
          isIntrinsicHeight
          infinite
          dragEnabled
          step={1}>
          <BlockRendererWithCondition condition={isNavigation()}>
            <StyledHeading>
              <Typo.Heading2>{title}</Typo.Heading2>

              <StyledNavigationButtons
                role="group"
                aria-label="Contrôles du carousel">
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
          </BlockRendererWithCondition>

          <StyledSlider
            classNameAnimation="customCarrouselAnimation"
            role="region"
            aria-label={stripTags(title)}
            aria-roledescription="carrousel">
            {items.map((item, index) => {
              return (
                <VerticalCarouselSlide
                  key={item.title}
                  slideIndex={index}
                  {...item}
                  hidePlayIcon={hidePlayIcon}
                />
              )
            })}
          </StyledSlider>

          <StyledDots role="group" aria-label="Contrôles du carousel">
            {items.map((item, index) => {
              return (
                <StyledDot
                  onClick={handleNavigationButtonClick}
                  key={item.title}
                  slide={index}
                  aria-label={`Afficher la diapositive ${index + 1} sur ${
                    items.length
                  } : ${item.title}`}
                />
              )
            })}
          </StyledDots>
        </CarouselProvider>
      </ContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  overflow: hidden;

  /* Fix control button shadows being clipped */
  padding-top: 1rem;
  margin-top: -1rem;
`
const StyledSlider = styled(Slider)``

const StyledHeading = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: end;
    justify-content: space-between;
    margin-bottom: 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 2.5rem;
      display: block;
      text-align: center;
    }
  `}
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
      box-shadow: ${theme.shadows.buttonCircular};
      &:hover {
        box-shadow: none;
        filter: drop-shadow(-4px 8px 24px rgba(0, 0, 0, 0.15));
      }
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.625rem;
      width: 3.625rem;
      cursor: pointer;
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
