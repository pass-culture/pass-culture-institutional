import React from 'react'
import styled, { css } from 'styled-components'

import { theme } from '@/theme/theme'
import { APIResponse } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'
import { getStrapiURL } from '@/utils/apiHelpers'
interface HeaderProps {
  title: string
  text?: string
  image: APIResponse<'plugin::upload.file'> | null
  icon: string
}

export function Header(props: HeaderProps) {
  return (
    <Root>
      <StyledContentWrapper>
        <StyledContentTextWrapper>
          <StyledHeading dangerouslySetInnerHTML={{ __html: props.title }} />
          <StyledText>{props.text}</StyledText>
        </StyledContentTextWrapper>
        <CardContainer>
          <Card
            $imageUrl={
              props.image?.data.attributes.url &&
              getStrapiURL(props.image?.data.attributes.url)
            }>
            <p>{props.icon}</p>
          </Card>
          <BackgroundLayer />
        </CardContainer>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      180deg,
      ${theme.colors.lightBlue} 0%,
      ${theme.colors.white} 100%
    );
    transform: translateY(-8rem);
    overflow: hidden;

    @media (width < ${theme.mediaQueries.mobile}) {
      transform: translateY(-7rem);
      overflow: visible;
    }
  `}
`

const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 0 auto;
    position: relative;
    transform: translateY(-8rem);
    padding: calc(18rem + 10rem) 1.5rem 2.5rem;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    gap: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      text-align: center;
      padding: calc(10rem + 10rem) 1.5rem 2.5rem;
    }
  `}
`

const StyledContentTextWrapper = styled.div`
  ${({ theme }) => css`
    padding-left: 2rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      padding-left: 0;
    }
  `}
`

const StyledHeading = styled(Typo.Heading1)`
  ${({ theme }) => css`
    max-width: 35rem;
    margin: 0 0 3rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes['5xl']};
    }
  `}
`

const StyledText = styled.p`
  ${({ theme }) => css`
    max-width: 43rem;
    margin: 0 0 2rem;
    line-height: 2;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 3.5rem;
      padding-bottom: 1.5rem;
    }
  `}
`

const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  margin: -3.125rem 0 -3.125rem 5rem;
  max-width: 28rem;

  @media (width < ${theme.mediaQueries.tablet}) {
    margin: -2.125rem 2rem -20.125rem 2rem;
  }
`

const Card = styled.div<{ $imageUrl?: string }>`
  ${({ $imageUrl, theme }) => css`
    background-color: ${theme.colors.tertiary};
    border-radius: 1rem;
    background-image: ${$imageUrl ? `url(${$imageUrl})` : 'none'};
    background-size: cover;
    background-repeat: no-repeat;

    display: flex;
    flex-direction: column-reverse;
    padding: 2rem;
    width: calc(100% - 4rem);
    height: 30rem;

    position: relative;

    p {
      font-size: ${theme.fonts.sizes['6xl']};
      position: absolute;

      bottom: 30%;
      right: -5%;
    }

    @media (width < ${theme.mediaQueries.tablet}) {
    }
  `}
`

const BackgroundLayer = styled.div`
  ${({ theme }) => css`
    position: absolute;
    content: '';
    inset: 0;
    background-color: ${theme.colors.secondary};
    transform: rotate(7deg);
    border-radius: 1.5rem;
    width: 100%;
    height: 35rem;
    z-index: -1;

    @media (width < ${theme.mediaQueries.tablet}) {
    }
  `}
`
