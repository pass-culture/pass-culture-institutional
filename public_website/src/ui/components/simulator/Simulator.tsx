import React from 'react'
import styled from 'styled-components'

import { Question } from './Question'
import { Step } from './Step'

interface SimulatorProps {
  className?: string
}

export function Simulator(props: SimulatorProps) {
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
        <Question onSubmit={(r) => console.log(r)} />
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
`

const Steps = styled.ol`
  padding: 6.25rem 4rem;
  border-right: 1px solid #dedede99;
`

const StepSeparator = styled.li`
  height: 2.25rem;
  margin-top: 0.75rem;
  margin-bottom: 0.75rem;
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
`
