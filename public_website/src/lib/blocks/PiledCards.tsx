import React from 'react'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'

/*

TODO:

- [ ] Width chelou (overflow)
- [ ] fleche de controle
- [ ] emoji outline
- [ ] gestion des couleurs
  - [x] Ajout d'une prop theme sur strapi
  - [ ] Vérifier la liste des couleurs dispo
- [ ] version mobile
- [ ] En fait c'est pas un carousel mais
  - [ ] desktop : une animation au scroll
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
  // const [items, setItems] = useState(props.items)

  // const handleDotClick = (index: number) => {
  //   const newItems = [...items]
  //   const [selectedItem] = newItems.splice(index, 1)
  //   if (selectedItem) {
  //     newItems.unshift(selectedItem)
  //     setItems(newItems)
  //   }
  // }

  return (
    <Root>
      <StyledContentWrapper>
        {/* {items.map((item, index) => ( */}
        {props.items.map((item, index) => (
          <StyledContentListItems
            key={item.id}
            $index={index}
            $itemTheme={item.theme}
            aria-label={`Card ${index + 1}`}>
            <StyledImageWrapper>
              <StyledImage
                src={item.image?.data.attributes.url}
                alt={item.image?.data.attributes.alternativeText}
              />
            </StyledImageWrapper>

            <StyledContentTextWrapper>
              <p>0{index}</p>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </StyledContentTextWrapper>
          </StyledContentListItems>
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
    max-width: 90rem;
    height: 100vh;
    margin: 16rem auto;
    padding: 8rem auto 0 auto;

    margin-bottom: 10rem;
    color: ${theme.colors.white};

    position: relative;
    @media (width < ${theme.mediaQueries.tablet}) {
      display: none;
    }
  `}
`

const StyledContentWrapper = styled.ul`
  max-width: 90rem;
  margin: 0 auto;
  position: relative;
  transform: translateY(-8rem);
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
  $index?: number
  $color?: string
  $itemTheme: PiledCardItemsTheme
}>`
  ${({ $index, $itemTheme, theme }) => css`
    width: 100%;

    transform: scale(${$index ? 1 + $index * 0.01 : 1});

    background: ${CARD_BACKGROUNDS[$itemTheme]};
    height: 40rem;
    border-radius: 2rem;
    box-shadow: -4px 8px 24px 0px ${theme.colors.black + '22'};
    position: absolute;
    top: ${$index ? $index * -2 : 0}rem;
    transform-origin: center top;

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
