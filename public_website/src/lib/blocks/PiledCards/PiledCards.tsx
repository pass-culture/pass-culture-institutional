import React, { useEffect, useMemo, useRef } from 'react'
import styled, { css } from 'styled-components'

import { PiledCardsCarousel } from './PiledCardsCarousel'
import {
  ComponentBlockPiledCardsFragment,
  ComponentCommonPiledCardItemFragment,
  Enum_Componentcommonpiledcarditem_Theme,
} from '@/generated/graphql'
import { CARD_BACKGROUNDS } from '@/theme/style'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { ArrowDown } from '@/ui/components/icons/ArrowDown'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'
import { parseText } from '@/utils/parseText'

export function PiledCards(props: ComponentBlockPiledCardsFragment) {
  const { piledCardsItems } = props
  const itemRefs = useRef<(HTMLLIElement | null)[]>([])
  const sentinelRefs = useRef<(HTMLLIElement | null)[]>([])
  const refTop = useRef<number[]>([])
  useEffect(() => {
    refTop.current = []
    window.scrollTo({ top: 0 })

    for (const element of itemRefs.current) {
      if (element) {
        const posY = element.getBoundingClientRect().top + window.scrollY
        refTop.current.push(posY)
      }
    }
    const setScrcoll = (): void => {
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
    }
    window.addEventListener('scroll', setScrcoll)
    return () => window.removeEventListener('scroll', setScrcoll)
  }, [])

  const ScrollTo = (index: number): void => {
    const y = refTop.current[index]
    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const renderNav = (index: number): React.ReactNode => {
    return (
      <React.Fragment>
        <StyledButton
          type="button"
          aria-label="Diapositive précédente"
          $isReverse
          disabled={index === 0}
          onClick={(): void => ScrollTo(index - 1)}>
          <ArrowDown />
        </StyledButton>
        <StyledButton
          type="button"
          disabled={index === (piledCardsItems?.length ?? 0) - 1}
          aria-label="Diapositive suivante"
          onClick={(): void => ScrollTo(index + 1)}>
          <ArrowDown />
        </StyledButton>
      </React.Fragment>
    )
  }

  const carouselItems = useMemo(() => {
    const itemsPiles: ComponentCommonPiledCardItemFragment[] =
      piledCardsItems
        ?.filter((item) => item !== null)
        .map((it, i) => ({
          slideIndex: i,
          ...it,
        })) ?? []
    return itemsPiles
  }, [piledCardsItems])

  return (
    <React.Fragment>
      <Root>
        {piledCardsItems
          ?.filter((item) => item !== null)
          .map((item, index) => (
            <React.Fragment key={item.id}>
              <ItemScrollSentinel
                aria-hidden="true"
                // @ts-expect-error //main pull
                ref={(el) => (sentinelRefs.current[index] = el)}
              />
              <StyledContentListItems
                l
                // @ts-expect-error //main pull
                ref={(el) => (itemRefs.current[index] = el)}
                $itemTheme={item.theme}
                aria-label={`Diapositive ${index + 1}`}>
                <StyledImageWrapper>
                  <StyledImage
                    src={item.image?.url}
                    alt={item.image?.alternativeText ?? ''}
                  />
                  <StyledFirstEmoji aria-hidden="true">
                    <OutlinedText>{item.firstIcon}</OutlinedText>
                  </StyledFirstEmoji>
                  <StyledSecondEmoji aria-hidden="true">
                    <OutlinedText>{item.secondIcon}</OutlinedText>
                  </StyledSecondEmoji>
                </StyledImageWrapper>

                <StyledContentTextWrapper>
                  <div>
                    <p>{(index + 1).toString().padStart(2, '0')}</p>
                    <h3>{item.title}</h3>
                    <p>{parseText(item.description).processedText}</p>
                  </div>
                  <StyledNavWrapper>{renderNav(index)}</StyledNavWrapper>
                </StyledContentTextWrapper>
              </StyledContentListItems>
            </React.Fragment>
          ))}
      </Root>
      <StyledCarousel title={props.accessibleTitle} items={carouselItems} />
    </React.Fragment>
  )
}

const Root = styled(ContentWrapper)`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      display: none;
    }
    p {
      color: ${theme.colors.black};
    }
    p:first-child {
      color: ${theme.colors.secondary};
    }
  `}
`

const StyledCarousel = styled(PiledCardsCarousel)`
  ${({ theme }) => css`
    margin-bottom: var(--module-margin);
    margin-top: var(--module-margin);
    @media (width >= ${theme.mediaQueries.mobile}) {
      display: none;
    }
  `}
`

const ItemScrollSentinel = styled.li`
  margin-bottom: 8rem;
  position: absolute;
  list-style: none;
`

const StyledContentListItems = styled.li<{
  $itemTheme: Enum_Componentcommonpiledcarditem_Theme
}>`
  ${({ $itemTheme, theme }) => css`
    transform-origin: center top;
    position: relative;
    list-style: none;
    background: ${CARD_BACKGROUNDS[$itemTheme]};
    height: 30rem;
    border-radius: ${theme.radius.sm};
    box-shadow: -0.25rem 0.5rem 1.5rem 0 ${theme.colors.black + '22'};
    position: sticky;
    top: 2rem;
    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 5rem;
    padding: 5rem;
    margin-bottom: 8rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      gap: 2rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    align-items: center;
    justify-content: flex-start;
    overflow: hidden;

    h3 {
      font-size: ${theme.fonts.sizes['6xl']};
      font-weight: 700;
      color: ${theme.colors.secondary};

      @media (width < ${theme.mediaQueries.tablet}) {
        font-size: ${theme.fonts.sizes['4xl']};
      }
    }

    p {
      width: 80%;
      line-height: 2.125rem;
    }
  `}
`
const StyledNavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
  padding: 1rem;
`

const StyledButton = styled.button<{
  $isReverse?: boolean
}>`
  ${({ theme, $isReverse }) => css`
    width: 3.4375rem;
    height: 3.4375rem;
    max-width: 3.4375rem;
    max-height: 3.4375rem;
    min-width: 3.4375rem;
    min-height: 3.4375rem;
    background-color: transparent;
    position: relative;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    outline-offset: 0.125rem;
    z-index: 1000;
    transform: translateY(0) rotate(0deg);
    background-color: ${theme.colors.white};
    border: 0.0625rem solid #90949d;
    ${$isReverse && 'transform:translateY(0) rotate(180deg)'};
    &:disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    svg {
      will-change: transform;
      transition: transform 0.2s linear;
    }
    ${$isReverse &&
    `&:hover {
      svg {
        transform: translateY(-0.3125rem) rotate(0deg);
      }
    }`}

    &:hover {
      svg {
        transform: translateY(0.3125rem) rotate(0deg);
      }
    }

    &:active {
      outline: 0.125rem solid ${theme.colors.darkGray};
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
  ${({ theme }) => css`
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${theme.radius.sm};
  `}
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
