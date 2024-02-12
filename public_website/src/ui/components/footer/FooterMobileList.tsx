import React from 'react'
import Image from 'next/image'
import styled from 'styled-components'

import accordionChevron from '../../../../public/images/accordion-chevron.svg'
import { FooterListProps } from './FooterList'

export function FooterMobileList({ title, listItems }: FooterListProps) {
  return (
    <StyledMobileFooterList>
      <summary>
        <h3>{title}</h3>
        <Image src={accordionChevron} alt="" />
      </summary>
      <ul>
        {listItems.map((el, i) => {
          return (
            <li key={i}>
              <a href={el.href}>{el.label}</a>
            </li>
          )
        })}
      </ul>
    </StyledMobileFooterList>
  )
}

const StyledMobileFooterList = styled.details`
  display: none;

  summary {
    list-style: none;
    display: inline-flex;
    align-items: center;
    gap: 1rem;

    &::-webkit-details-marker {
      display: none;
    }
  }

  h3 {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fonts.sizes.xs};
    font-weight: ${(props) => props.theme.fonts.weights.bold};
    text-transform: uppercase;
    padding: 1rem 0;
  }

  summary img {
    transform: rotate(180deg);
  }

  &[open] summary img {
    transform: none;
  }

  li {
    color: ${(props) => props.theme.colors.black};
    opacity: 0.7;
    font-size: ${(props) => props.theme.fonts.sizes.s};
    font-weight: ${(props) => props.theme.fonts.weights.bold};
    margin-bottom: 0.875rem;

    a:hover {
      text-decoration: underline;
    }
  }

  @media (max-width: 50rem) {
    display: initial;
  }
`
