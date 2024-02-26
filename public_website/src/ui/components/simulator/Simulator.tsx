import React from 'react'
import styled from 'styled-components'

import type { SimulatorQuestion } from './data'
import { Question } from './Question'
import { Step } from './Step'

interface SimulatorProps {
  className?: string
}

export function Simulator(props: SimulatorProps) {
  const question: SimulatorQuestion = {
    title: 'Depuis combien de temps résides-tu en France ?',
    type: 'radio',
    answers: [
      {
        title: 'Depuis plus d’une année',
        next: {
          title: 'C’est noté ! Voici maintenant les étapes à suivre',
          next: null,
        },
      },
      {
        title: 'Depuis moins d’une année',
        next: {
          title:
            'Malheureusement, tu n’es pour le momentpas éligible au pass...',
          next: null,
        },
      },
    ],
  }

  return (
    <Root className={props.className}>
      <Inner>
        <Steps>
          <Step circleText="01" surtitle="ÉTAPE 1" title="Ton âge" />
          <StepSeparator aria-hidden="true" />
          <Step
            circleText="02"
            surtitle="ÉTAPE 2"
            title="Ta nationalité"
            isActive
          />
        </Steps>
        <Question question={question} onSubmit={(r) => console.log(r)} />
      </Inner>
    </Root>
  )
}

const Root = styled.div`
  position: relative;

  &::after {
    position: absolute;
    content: '';
    inset: 0;
    border-radius: 1.875rem;
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: rotate(2.1deg);
  }
`

const Inner = styled.div`
  box-shadow: -4px 8px 24px 0px #7d7d7d40;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
  z-index: 1;
  border-radius: 1.875rem;
  min-height: 42rem;

  display: grid;
  grid-template-columns: auto 1fr;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: block;
  }
`

const Steps = styled.ol`
  padding: 6.25rem 4rem;
  border-right: 1px solid #dedede99;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    flex-direction: row;
    padding: 2rem 1.5rem;
  }
`

const StepSeparator = styled.li`
  height: 2.25rem;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    left: 1.4375rem;
    width: 0.125rem;
    background-color: #cacbd2;
    border-radius: 0.0625rem;
  }

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    height: 0;
    width: 2.25rem;

    &::after {
      left: 0;
      top: 1.4375rem;
      height: 0.125rem;
      width: unset;
    }
  }
`
