import React, { useCallback } from 'react'
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

  const handleNavigation = useCallback(() => {
    handleNavigationButtonClick(carrouselSelector, slidesSelector)
  }, [carrouselSelector, slidesSelector])

  return (
    <StyledNavigationButtons role="group" aria-label="Contrôles du carousel">
      <ButtonBack aria-label="Élement précédent" onClick={handleNavigation}>
        <ArrowRight />
      </ButtonBack>
      <ButtonNext aria-label="Élément suivant" onClick={handleNavigation}>
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

    button {
      background-color: ${theme.colors.white};
      box-shadow: ${theme.shadows.buttonCircular};
      border: 1px solid #90949d;
      -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 3.625rem;
      width: 3.625rem;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      &:disabled {
        opacity: 0.5;
      }
      &:active {
        outline: 2px solid ${theme.colors.primary};
      }

      svg {
        will-change: transform;
        transition: transform 0.2s linear;
      }
    }

    button:first-child {
      svg {
        transform: translateX(0) rotate(180deg);
      }
    }
    button:not([disabled]):nth-child(1):hover {
      svg {
        transform: translateX(-5px) rotate(180deg);
      }
    }
    button:not([disabled]):nth-child(2):hover {
      svg {
        transform: translateX(5px) rotate(0deg);
      }
    }
  `}
`
