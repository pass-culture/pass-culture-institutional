import React, { useMemo } from 'react'
import styled, { css } from 'styled-components'

import { StyledDot } from '@/theme/style'
import { VerticalCarouselSlideProps } from '@/types/props'
import { handleNavigationButtonClick } from '@/utils/carouselHelper'

const NavigationWithDots = (props: {
  items: Omit<VerticalCarouselSlideProps, 'slideIndex'>[]
  carrouselSelector: string
  slidesSelector: string
}) => {
  const { items, carrouselSelector, slidesSelector } = props

  const renderDot = useMemo(() => {
    return items?.map((item, index) => {
      return (
        <StyledDot
          onClick={() => {
            handleNavigationButtonClick(carrouselSelector, slidesSelector)
          }}
          key={item.title}
          slide={index}
          aria-label={`Afficher la diapositive ${index + 1} sur ${
            items.length
          } : ${item.title}`}
        />
      )
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items])

  return (
    <StyledDots role="group" aria-label="Contrôles du carousel">
      {renderDot}
    </StyledDots>
  )
}

export default NavigationWithDots

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
