import React from 'react'
import { ButtonBack, ButtonNext } from 'pure-react-carousel'
import styled, { css } from 'styled-components'

import { ArrowRight } from '@/ui/components/icons/ArrowRight'
import { handleNavigationButtonClick } from '@/utils/carouselHelper'

const NavigationWithArrow = (props: {
  carrouselSelector: string
  slidesSelector: string
}) => {
  const { carrouselSelector, slidesSelector } = props
  // If we use a props infinite, arrow navifation are not disabled, so we can use CarouselContext if we need for disabling button with infinite
  //const carouselContext = useContext(CarouselContext)

  return (
    <StyledNavigationButtons role="group" aria-label="Contrôles du carousel">
      <ButtonBack
        aria-label="Élement précédent"
        onClick={() =>
          handleNavigationButtonClick(carrouselSelector, slidesSelector)
        }>
        <ArrowRight />
      </ButtonBack>
      <ButtonNext
        aria-label="Élément suivant"
        onClick={() =>
          handleNavigationButtonClick(carrouselSelector, slidesSelector)
        }>
        <ArrowRight />
      </ButtonNext>
    </StyledNavigationButtons>
  )
}
export default NavigationWithArrow

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
      &:disabled {
        opacity: 0.5;
      }
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
