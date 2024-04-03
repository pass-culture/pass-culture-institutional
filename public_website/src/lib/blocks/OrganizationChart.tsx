import React from 'react'
import Image from 'next/image'
import styled, { css } from 'styled-components'

import { APIResponse } from '@/types/strapi'
import { Typo } from '@/ui/components/typographies'

type OrganizationChartProps = {
  title: string
  description: string
  people: {
    name: string
    position: string
    image: APIResponse<'plugin::upload.file'> | null
  }[]
}

export function OrganizationChart({
  title,
  description,
  people,
}: OrganizationChartProps) {
  return (
    <Root>
      <StyledHeading>{title}</StyledHeading>
      <StyledDescription>{description}</StyledDescription>
      <StyledList>
        {people.map((person) => {
          return (
            <StyledPerson key={person.name}>
              {person.image && (
                <StyledImage
                  src={person.image?.data.attributes.url}
                  alt=""
                  width={person.image?.data.attributes.width}
                  height={person.image?.data.attributes.height}
                />
              )}
              <div>
                <StyledName>{person.name}</StyledName>
                <StyledPosition>{person.position}</StyledPosition>
              </div>
            </StyledPerson>
          )
        })}
      </StyledList>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    padding: 6.25rem 2rem;
    max-width: 80rem;
    margin: 0 auto;

    @media (width < ${theme.mediaQueries.tablet}) {
      padding: 3.75rem 1rem;
    }
  `}
`

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 1.5rem;
    text-align: center;

    @media (width < ${theme.mediaQueries.mobile}) {
      text-align: start;
    }
  `}
`

const StyledDescription = styled(Typo.Body)`
  ${({ theme }) => css`
    margin: 0 auto 5rem;
    max-width: 50rem;
    text-align: center;

    @media (width < ${theme.mediaQueries.mobile}) {
      text-align: start;
      margin-bottom: 2.375rem;
    }
  `}
`

const StyledList = styled.ul`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
    gap: 3.125rem 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
  `}
`

const StyledPerson = styled.li`
  ${({ theme }) => css`
    @media (width < ${theme.mediaQueries.mobile}) {
      display: grid;
      grid-template-columns: 1.5fr 2fr;
      gap: 0.5rem 1.5rem;
      align-items: center;
    }
  `}
`

const StyledImage = styled(Image)`
  ${({ theme }) => css`
    margin-bottom: 1.5rem;
    border-radius: 0.5rem;
    display: block;
    aspect-ratio: 0.7;
    max-width: 100%;
    height: auto;
    object-fit: cover;

    @media (width < ${theme.mediaQueries.mobile}) {
      margin: 0;
    }
  `}
`

const StyledName = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xl};
    font-weight: ${theme.fonts.weights.bold};
    margin-bottom: 0.5rem;
  `}
`

const StyledPosition = styled.p`
  ${({ theme }) => css`
    font-size: ${theme.fonts.sizes.xl};
    opacity: 0.7;

    @media (width < ${theme.mediaQueries.mobile}) {
      font-size: ${theme.fonts.sizes.l};
    }
  `}
`