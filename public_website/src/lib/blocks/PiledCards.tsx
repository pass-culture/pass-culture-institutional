import React, { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { OutlinedText } from '@/ui/components/OutlinedText'
import { Typo } from '@/ui/components/typographies'

/*

TODO:

- [x] Width chelou (overflow)
- [ ] fleche de controle
- [x] emoji outline
- [ ] gestion des couleurs
  - [x] Ajout d'une prop theme sur strapi
  - [ ] Vérifier la liste des couleurs dispo
- [ ] version mobile
- [ ] En fait c'est pas un carousel mais
  - [x] desktop : une animation au scroll
  - [ ] mobile : carousel-ish
*/

type PiledCardItemsTheme = 'purple' | 'yellow' | 'magenta' | 'orange' | 'green'

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

  return (
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

      {/* <DotsWrapper>
        {items.map((_, index) => (
          <Dot
            key={_.title}
            active={index === 0}
            onClick={() => handleDotClick(index)}
          />
        ))}
      </DotsWrapper> */}
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    max-width: 75rem;
    margin: 0 auto;
    padding: 0 2rem;

    margin-bottom: 8rem;
    color: ${theme.colors.white};

    @media (width < ${theme.mediaQueries.tablet}) {
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

// TODO: update available color list
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
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1rem;

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

// const Dot = styled.div<{ active: boolean }>`
//   ${({ active, theme }) => css`
//     height: 1rem;
//     width: 1rem;
//     background-color: ${active
//       ? theme.colors.white
//       : theme.colors.white + '22'};
//     border-radius: 50%;
//     display: inline-block;
//     margin: 0 2px;
//     cursor: pointer;
//     gap: 0.5rem;
//   `}
// `

// const DotsWrapper = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-top: 20px;

//   position: absolute;
//   right: -5rem;
//   top: 20%;
//   transform: rotateZ(90deg);
//   z-index: 2;
//   width: fit-content;
// `

const StyledFirstEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    top: 4rem;
    right: 0;
    transform: rotate(8.7deg) translateX(2rem);

    /* @media (width < ${theme.mediaQueries.tablet}) {
      display: none;
    } */
  `}
`
const StyledSecondEmoji = styled(Typo.Emoji)`
  ${({ theme }) => css`
    position: absolute;
    bottom: 4rem;
    left: 0;
    transform: rotate(-8.7deg) translateX(-2rem);

    /* @media (width < ${theme.mediaQueries.tablet}) {
      display: none;
    } */
  `}
`
