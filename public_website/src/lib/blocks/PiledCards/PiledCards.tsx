import React, { useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'

import { PiledCardItemsTheme } from './piled-card-items-theme'
import { PiledCardsCarousel } from './PiledCardsCarousel'
import { PiledCardsCarouselSlideProps } from './PiledCardsCarouselSlide'
import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'

interface Item {
  id: number
  title: string
  description: string
  firstIcon: string
  secondIcon: string
  image: APIResponse<'plugin::upload.file'> | null
  theme: PiledCardItemsTheme
}
interface PiledCardsProps {
  items: Item[]
}

export function PiledCards(props: PiledCardsProps) {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const sentinelRefs = useRef<(HTMLLIElement | null)[]>([])

  useEffect(() => {
    window.addEventListener('scroll', () => {
      for (let i = 0; i < itemRefs.current.length; i++) {
        const itemEl = itemRefs.current[i]
        const sentinelEl = sentinelRefs.current[i]
        if (!itemEl || !sentinelEl) continue

        const d = Math.max(
          0,
          Math.min(256, itemEl.offsetTop - sentinelEl.offsetTop - 128)
        )

        const ratio = (256 - d) / 256
        const easedValue = ratio * ratio

        const scaleDiff = 0.1
        const scale = 1 - scaleDiff + scaleDiff * easedValue

        itemEl.style.transform = `scale(${scale})`
      }
    })
  }, [])

  const carouselItems = useMemo(() => {
    const items: PiledCardsCarouselSlideProps[] = props.items.map((it, i) => ({
      slideIndex: i,
      ...it,
    }))
    return items
  }, [props.items])

  return (
    <React.Fragment>
      <Root>
        <StyledContentWrapper>
          {props.items.map((item, index) => (
            <React.Fragment key={item.id}>
              <ItemScrollSentinel
                aria-hidden="true"
                ref={(el) => (sentinelRefs.current[index] = el)}
              />
              <StyledContentListItems
                ref={(el) => (itemRefs.current[index] = el)}
                $itemTheme={item.theme}
                aria-label={`Card ${index + 1}`}>
                <StyledImageWrapper>
                  <StyledImage
                    src={item.image?.data.attributes.url}
                    alt={item.image?.data.attributes.alternativeText}
                  />
                  <StyledFirstEmoji aria-hidden="true">
                    <OutlinedText blurDeviation={1}>
                      {item.firstIcon}
                    </OutlinedText>
                  </StyledFirstEmoji>
                  <StyledSecondEmoji aria-hidden="true">
                    <OutlinedText blurDeviation={1}>
                      {item.secondIcon}
                    </OutlinedText>
                  </StyledSecondEmoji>
                </StyledImageWrapper>

                <StyledContentTextWrapper>
                  <p>{(index + 1).toString().padStart(2, '0')}</p>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </StyledContentTextWrapper>
              </StyledContentListItems>
            </React.Fragment>
          ))}
        </StyledContentWrapper>
      </Root>
      <StyledCarousel title="Pouet" items={carouselItems} />
    </React.Fragment>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 2rem;

    margin-bottom: 8rem;
    color: ${theme.colors.white};

    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledCarousel = styled(PiledCardsCarousel)`
  ${({ theme }) => css`
    margin-bottom: 8rem;

    @media (width >= ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const StyledContentWrapper = styled.ul`
  max-width: 75rem;
  margin: 0 auto;
`

const ItemScrollSentinel = styled.li`
  margin-bottom: 8rem;
`

const CARD_BACKGROUNDS: Record<PiledCardItemsTheme, string> = {
  purple: theme.uniqueColors.purple,
  yellow: `linear-gradient(141.28deg, ${theme.uniqueColors.yellowLight} 1.24%, ${theme.uniqueColors.yellowDark} 97.04%)`,
  magenta: `linear-gradient(140.89deg, ${theme.uniqueColors.magentaLight} 1.32%, ${theme.uniqueColors.magenta} 99.76%)`,
  orange: `linear-gradient(139.76deg, ${theme.uniqueColors.orangeLight} -0.2%, ${theme.uniqueColors.orangeDark} 98.71%)`,
  green: theme.uniqueColors.green,
}

const StyledContentListItems = styled.li<{
  $itemTheme: PiledCardItemsTheme
}>`
  ${({ $itemTheme, theme }) => css`
    transform-origin: center top;

    background: ${CARD_BACKGROUNDS[$itemTheme]};
    height: 30rem;
    border-radius: 2rem;
    box-shadow: -4px 8px 24px 0px ${theme.colors.black + '22'};
    position: sticky;
    top: 2rem;

    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 10rem;

    padding: 5rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      gap: 2rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    /* justify-content: center; */
    gap: 1rem;

    overflow: hidden;

    h3 {
      font-size: ${theme.fonts.sizes['6xl']};
      font-weight: 700;
    }

    p {
      width: 80%;
      line-height: 2.5;
    }
  `}
`

const StyledImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 1rem;
`

const StyledFirstEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    top: 4rem;
    right: 0;
    transform: rotate(8.7deg) translateX(2rem);

    @media (width < ${theme.mediaQueries.tablet}) {
      font-size: ${theme.fonts.sizes['2xl']};
      transform: rotate(8.7deg) translateX(1rem);
    }
  `}
`
const StyledSecondEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 4rem;
    left: 0;
    transform: rotate(-8.7deg) translateX(-2rem);

    @media (width < ${theme.mediaQueries.tablet}) {
      font-size: ${theme.fonts.sizes['2xl']};
      transform: rotate(8.7deg) translateX(-1rem);
    }
  `}
`
