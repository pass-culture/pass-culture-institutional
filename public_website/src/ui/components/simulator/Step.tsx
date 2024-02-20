import React from 'react'
import styled from 'styled-components'

interface StepProps {
  circleText: string
  title: string
  surtitle: string
  isActive?: boolean
}

export function Step(props: StepProps) {
  return (
    <Root>
      <Circle aria-hidden="true" $isActive={props.isActive}>
        {props.circleText}
      </Circle>
      <Surtitle>{props.surtitle}</Surtitle>
      <Title>{props.title}</Title>
    </Root>
  )
}

// TODO: rem-ise everything

const Surtitle = styled.span`
  grid-area: surtitle;
  align-self: flex-end;
  height: min-content;
  line-height: 1.5;

  font-size: 10px;
  font-weight: 600;
  letter-spacing: -0.12380921095609665px;
`

const Title = styled.span`
  grid-area: title;
  align-self: flex-start;
  height: min-content;
  line-height: 1;

  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0px;
`

const Root = styled.li`
  color: ${({ theme }) => theme.colors.secondary};

  display: grid;
  column-gap: 1.25rem;
  grid-template-columns: min-content max-content;
  grid-template-rows: 1fr 1fr;
  grid-template-areas: 'circle surtitle' 'circle title';
  align-items: center;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: block;

    ${Title}, ${Surtitle} {
      display: none;
    }
  }
`

const Circle = styled.span<{ $isActive?: boolean }>`
  grid-area: circle;

  font-size: 16px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.secondary};

  width: 3rem;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;

  position: relative;

  &::before {
    position: absolute;
    content: '';
    inset: ${({ $isActive }) => ($isActive ? '2px' : '-1px')};
    border-width: ${({ $isActive }) => ($isActive ? '4px' : '7px')};
    border-style: solid;
    border-color: ${({ theme }) => theme.colors.white};
    border-radius: 50%;
  }
`
