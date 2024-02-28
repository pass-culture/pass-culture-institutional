import React from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../button/Button'
import { Typo } from '../typographies'
import { APIResponseData } from '@/types/strapi'
import { getStrapiURL } from '@/utils/apiHelpers'
import { Accordion, AccordionItem } from '@nextui-org/react'
import { LinkFaq } from './Link'

type FaqProps = {
  title: string
  //   subTitle: string
  //   cta: { Label: string; URL: string }
  cta: string
  link: string
  //   firstEmoji: string
  //   secondEmoji: string
  //   thirdEmoji: string
  //   fourthEmoji: string
  //   images: APIResponseData<'plugin::upload.file'>[] | null
}

export function Faq({ title, cta, link }: FaqProps) {
  const defaultContent =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
  return (
    <Root>
      <StyledContentWrapper>
        <StyledContentTextWrapper>
          <StyledHeading dangerouslySetInnerHTML={{ __html: title }} />
          <Button href={link}> {cta} </Button>
        </StyledContentTextWrapper>
        <StyledFaqtWrapper>
          <StyledAccordion>
            <AccordionItem key="1" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem key="2" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem key="4" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem key="5" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem key="6" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem key="7" aria-label="Accordion 3" title="Accordion 3">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem key="8" aria-label="Accordion 1" title="Accordion 1">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem key="9" aria-label="Accordion 2" title="Accordion 2">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
            <AccordionItem
              key="10"
              aria-label="Accordion 3"
              title="Accordion 3">
              {defaultContent}
              <LinkFaq href="#" text="Voir le detail" />
            </AccordionItem>
          </StyledAccordion>
        </StyledFaqtWrapper>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    // background: linear-gradient(
    //   180deg,
    //   ${theme.colors.lightBlue} 0%,
    //   ${theme.colors.white} 100%
    // );
    overflow: hidden;

    @media (width < ${theme.mediaQueries.mobile}) {
    }
  `}
`

const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 0 auto;
    // text-align: center;
    position: relative;
    // padding: calc(1rem + 5rem) 1.5rem 2.5rem;
    padding: 0rem 1.5rem 2.5rem;

    display: grid;
    grid-template-columns: 1fr 1.5fr;
    gap: 1.5rem;

    @media (width < ${theme.mediaQueries.mobile}) {
      grid-template-columns: 1fr;
      text-align: center;
    }
  `}
`

const StyledHeading = styled(Typo.Heading2)`
  ${({ theme }) => css`
    margin-bottom: 2.5rem;

    max-width: 20rem;
    @media (width < ${theme.mediaQueries.mobile}) {
      margin-bottom: 1.75rem;
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

const StyledFaqtWrapper = styled.div`
  ${({ theme }) => css`
    // padding-left: 2rem;
  `}
`

const StyledAccordion = styled(Accordion)`
  ${({ theme }) => css`
    h2 {
      margin: 2rem 0;
      font-size: ${theme.fonts.sizes['xl']};
      font-weight: ${theme.fonts.weights.bold};
    }
    button {
      display: flex;
      width: 100%;
      justify-content: space-between;
      &:focus-visible {
        outline: 0px auto -webkit-focus-ring-color !important;
      }
    }

    svg {
      transform: rotateZ(270deg);
    }

    section {
      margin-bottom: 2rem;
    }

    @media (width < ${theme.mediaQueries.mobile}) {
      text-align: left;
    }
  `}
`
