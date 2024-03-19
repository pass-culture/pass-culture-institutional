import React from 'react'
import styled, { css } from 'styled-components'

import { Button } from '../button/Button'
import { Typo } from '../typographies'
import { LinkFaq } from './Link'

type FaqProps = {
  title: string
  cta: string
  link: string
}

export function Faq({ title, cta, link }: FaqProps) {
  const detailTitle =
    'Je ne suis pas né en France, comment faire pour m’inscrire ?'
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
            <summary
              dangerouslySetInnerHTML={{ __html: detailTitle }}></summary>
            <p dangerouslySetInnerHTML={{ __html: defaultContent }}></p>
            <LinkFaq href="#" text="Voir le detail" />
          </StyledAccordion>
          <StyledAccordion>
            <summary
              dangerouslySetInnerHTML={{ __html: detailTitle }}></summary>
            <p dangerouslySetInnerHTML={{ __html: defaultContent }}></p>
            <LinkFaq href="#" text="Voir le detail" />
          </StyledAccordion>
          <StyledAccordion>
            <summary
              dangerouslySetInnerHTML={{ __html: detailTitle }}></summary>
            <p dangerouslySetInnerHTML={{ __html: defaultContent }}></p>
            <LinkFaq href="#" text="Voir le detail" />
          </StyledAccordion>
        </StyledFaqtWrapper>
      </StyledContentWrapper>
    </Root>
  )
}

const Root = styled.div`
  ${({ theme }) => css`
    overflow: hidden;

    @media (width < ${theme.mediaQueries.mobile}) {
    }
  `}
`

const StyledContentWrapper = styled.div`
  ${({ theme }) => css`
    max-width: 90rem;
    margin: 0 auto;
    position: relative;
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
  margin-top: 2rem;
`

const StyledAccordion = styled.details`
  ${({ theme }) => css`
    margin-bottom: 3rem;
    padding-bottom: 3rem;

    border-bottom: solid 1px ${theme.colors.black}20;
    summary {
      font-size: ${theme.fonts.sizes['xl']};
      font-weight: ${theme.fonts.weights.bold};
    }

    summary {
      display: flex;
      justify-content: space-between;
    }

    summary::after {
      content: url('../../image/arrowd.svg');
      display: inline-block;
      width: 20px;
      height: 20px;
    }

    p {
      margin-top: 1rem;
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
