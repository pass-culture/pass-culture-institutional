import React from 'react'
import styled, { css } from 'styled-components'

import { SimpleTextV2 } from './SimpleTextV2'
import { AccordionProps } from '@/types/props'
import arrowUrl from '@/ui/image/arrowd.svg'

export default function Accordion({ title, simpleText }: AccordionProps) {
  return (
    <StyledAccordion key={title}>
      <summary aria-label={title}>{title}</summary>
      <SimpleTextV2
        columns={simpleText.columns}
        title={simpleText.title}
        text={simpleText.text}
        padding={false}
      />
    </StyledAccordion>
  )
}

const StyledAccordion = styled.details`
  ${({ theme }) => css`
    &:not(:last-of-type) {
      margin-bottom: 3rem;
    }
    padding-bottom: 3rem;
    border-bottom: solid 1px ${theme.colors.black}20;

    summary {
      font-size: ${theme.fonts.sizes['xl']};
      font-weight: ${theme.fonts.weights.bold};
      display: block;
      position: relative;
      padding-right: 4rem;
      cursor: pointer;
    }

    summary::after {
      content: url('${arrowUrl.src}');
      right: 2rem;
      top: 50%;
      position: absolute;
      line-height: 0;
    }

    summary::-webkit-details-marker {
      display: none;
    }

    &[open] summary::after {
      transform: rotate(180deg);
    }

    p {
      margin-top: 1.0625rem;
      line-height: 2.125rem;
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

    @media (width < ${theme.mediaQueries.largeDesktop}) {
      text-align: left;

      padding-bottom: 2rem;

      &:not(:last-of-type) {
        margin-bottom: 2rem;
      }
    }
  `}
`
