import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { Button } from '@/ui/components/button/Button'
import { ContentWrapper } from '@/ui/components/ContentWrapper'
import { Typo } from '@/ui/components/typographies'

type DetailedLogosProps = {
  title?: string
  logos: {
    title: string
    description: string
    cta: { Label: string; URL: string }
    image: APIResponse<'plugin::upload.file'> | null
  }[]
}

export function DetailedLogos({ title, logos }: DetailedLogosProps) {
  return (
    <ContentWrapper>
      <InnerWrapper>
        {title && <StyledHeading>{title}</StyledHeading>}
        <StyledList>
          {logos.map((logo) => {
            return (
              <StyledListItem key={logo.title}>
                {logo.image && (
                  <StyledLogoImage
                    src={logo.image?.data.attributes.url}
                    alt=""
                    width={logo.image?.data.attributes.width}
                    height={logo.image?.data.attributes.height}
                  />
                )}
                <StyledLogoHeading>{logo.title}</StyledLogoHeading>
                <StyledLogoDescription>
                  {logo.description}
                </StyledLogoDescription>
                <div>
                  <StyledCta href={logo.cta.URL}>
                    {logo.cta.Label}
                    <span className="visually-hidden">sur {logo.title}</span>
                  </StyledCta>
                </div>
              </StyledListItem>
            )
          })}
        </StyledList>
      </InnerWrapper>
    </ContentWrapper>
  )
}

const StyledHeading = styled(Typo.Heading2)`
  text-align: center;
  margin-bottom: 4rem;
`

const InnerWrapper = styled.div`
  padding: 0 8.5%;
  @media (width < ${(p) => p.theme.mediaQueries.tablet}) {
    grid-template-columns: 1fr;
  }
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;

    @media (width < ${theme.mediaQueries.tablet}) {
      grid-template-columns: 1fr;
    }
  `}
`

const StyledListItem = styled.li`
  ${({ theme }) => css`
    background: ${theme.colors.lightBlue};
    border-radius: 2.5rem;
    padding: 4rem 6.25rem;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 2rem 1rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      border-radius: 1.25rem;
    }
  `}
`

const StyledLogoImage = styled(Image)`
  margin-bottom: 2.5rem;
  height: 10rem;
  width: auto;
`

const StyledLogoHeading = styled.h3`
  ${({ theme }) => css`
    margin-bottom: 0.5rem;
    font-size: ${theme.fonts.sizes.xl};
    font-weight: ${theme.fonts.weights.bold};
  `}
`

const StyledLogoDescription = styled(Typo.Body)`
  margin: 0 auto 2rem;
  max-width: 40ch;
  font-size: ${(p) => p.theme.fonts.sizes.s};
`

const StyledCta = styled(Button)`
  margin-top: auto;
`
