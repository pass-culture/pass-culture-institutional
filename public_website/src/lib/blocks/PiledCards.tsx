import React, { useState } from 'react'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'

interface Item {
  id: number
  title: string
  description: string
  firstIcon: string
  secondIcon: string
  image: APIResponse<'plugin::upload.file'> | null
  color: string
}
interface PiledCardsProps {
  items: Item[]
}

export function PiledCards(props: PiledCardsProps) {
  const [items, setItems] = useState(props.items)

  const handleDotClick = (index: number) => {
    const newItems = [...items]
    const [selectedItem] = newItems.splice(index, 1)
    if (selectedItem) {
      newItems.unshift(selectedItem)
      setItems(newItems)
    }
  }

  return (
    <Root>
      <StyledContentWrapper>
        {items.map((item, index) => (
          <StyledContentListItems
            key={item.id}
            $index={index}
            $color={item.color}
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

      <DotsWrapper>
        {items.map((_, index) => (
          <Dot
            key={_.title}
            active={index === 0}
            onClick={() => handleDotClick(index)}
            aria-label={`Dot ${index + 1}`}
          />
        ))}
      </DotsWrapper>
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
    }
  `}
`

const StyledContentWrapper = styled.ul`
  max-width: 90rem;
  margin: 0 auto;
  position: relative;
  transform: translateY(-8rem);
`

const StyledContentListItems = styled.li<{ $index?: number; $color?: string }>`
  ${({ $index, $color, theme }) => css`
    width: 100%;

    transform: scale(${$index ? 1 + $index * 0.01 : 1});

    background-color: ${$color};
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
const Dot = styled.div<{ active: boolean }>`
  ${({ active, theme }) => css`
    height: 1rem;
    width: 1rem;
    background-color: ${active
      ? theme.colors.white
      : theme.colors.white + '22'};
    border-radius: 50%;
    display: inline-block;
    margin: 0 2px;
    cursor: pointer;
    gap: 0.5rem;

    ${active ? 'aria-label: Active dot' : 'aria-label: Inactive dot'};
  `}
`

const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  position: absolute;
  right: -5rem;
  top: 20%;
  transform: rotateZ(90deg);
  z-index: 2;
  width: fit-content;
`
