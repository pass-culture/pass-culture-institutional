import React from 'react'
import styled, { css } from 'styled-components'

import { KeyNumberCarousel } from './keyNumberCarousel/keyNumberCarousel'
import { ComponentBlockKeyNumberCarouselFragment } from '@/generated/graphql'
import { Typo } from '@/ui/components/typographies'

export function KeyNumber(props: ComponentBlockKeyNumberCarouselFragment) {
  const { title, keyNumberItems, id } = props
  return (
    <Root>
      <StyledWrapper>
        <div>
          <Typo.Heading2>{title ?? ''}</Typo.Heading2>
        </div>
        <StyledCarouselWrapper>
          <KeyNumberCarousel
            id={id}
            title={title}
            keyNumberItems={keyNumberItems?.filter((item) => item != null)}
          />
        </StyledCarouselWrapper>
      </StyledWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    width: 100%;
    margin: 5rem auto;
    background-color: ${theme.colors.lightBlue};

    display: flex;
    align-items: center;
    justify-content: end;
    gap: 8rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding: 0;
      margin: 2.825rem auto;
    }
  `}
`
const StyledWrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    max-width: 90%;
    padding: 6.25rem 0 5rem;

    display: grid;
    grid-template-columns: 1fr 3fr;

    .carousel {
      position: relative;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      background-color: transparent;
      padding: 0;
      grid-template-columns: 1fr;
    }
  `}
`
const StyledCarouselWrapper = styled.div`
  ${({ theme }) => css`
    padding: 0 0rem 0 7rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      padding: 4rem 1.5rem 2rem;
    }
  `}
`
