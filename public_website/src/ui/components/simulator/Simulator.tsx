import React from 'react'
import styled from 'styled-components'

import { FailureScreen } from './FailureScreen'
import { Question } from './Question'
import { ResultScreen } from './ResultScreen'
import { Step } from './Step'
import { APIResponseData } from '@/types/strapi'

interface SimulatorProps {
  className?: string

  ageQuestion: APIResponseData<'api::simulator.simulator'>['attributes']['ageQuestion']
  nationnalityQuestion: APIResponseData<'api::simulator.simulator'>['attributes']['nationnalityQuestion']
  residencyQuestion: APIResponseData<'api::simulator.simulator'>['attributes']['residencyQuestion']

  successScreen: APIResponseData<'api::simulator.simulator'>['attributes']['successScreen']
  failureScreen: APIResponseData<'api::simulator.simulator'>['attributes']['failureScreen']
  tooYoungScreen: APIResponseData<'api::simulator.simulator'>['attributes']['tooYoungScreen']
}

export function Simulator(props: SimulatorProps) {
  // const question: SimulatorQuestion = {
  //   title: 'Depuis combien de temps résides-tu en France ?',
  //   type: 'radio',
  //   answers: [
  //     {
  //       title: 'Depuis plus d’une année',
  //       next: {
  //         title: 'C’est noté ! Voici maintenant les étapes à suivre',
  //         next: null,
  //       },
  //     },
  //     {
  //       title: 'Depuis moins d’une année',
  //       next: {
  //         title:
  //           'Malheureusement, tu n’es pour le momentpas éligible au pass...',
  //         next: null,
  //       },
  //     },
  //   ],
  // }

  const question = props.ageQuestion

  // const isShowingResult = true

  const currentStep = 'tooYoung' as string

  return (
    <Root className={props.className}>
      <Inner $showingResult={currentStep !== 'question'}>
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

        <BackContainer>
          <button>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7 1L2 6L6.5 10.5"
                stroke="black"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            Retour
          </button>
        </BackContainer>

        {currentStep === 'question' && (
          <Question
            onSubmit={(r) => console.log(r)}
            title={question.title}
            answers={question.answers.map((a) => a.answer)}
            type="slider"
          />
        )}

        {currentStep === 'success' && (
          <ResultScreen
            title={props.successScreen.title}
            steps={props.successScreen.steps.map((s) => s.step)}
            ctaLink={props.successScreen.cta}
            helpText={props.successScreen.needSupport}
            supportLink={props.successScreen.supportLink}
          />
        )}

        {currentStep === 'failure' && (
          <FailureScreen
            title={props.failureScreen.title}
            text={props.failureScreen.text}
            ctaLink={props.failureScreen.cta}
          />
        )}

        {currentStep === 'tooYoung' && (
          <FailureScreen
            title={props.tooYoungScreen.title}
            text={props.tooYoungScreen.text}
            ctaLink={props.tooYoungScreen.cta}
          />
        )}
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

const Inner = styled.div<{ $showingResult: boolean }>`
  box-shadow: -4px 8px 24px 0px #7d7d7d40;
  background-color: ${({ theme, $showingResult }) =>
    $showingResult ? '#F7F5FB' : theme.colors.white};
  position: relative;
  z-index: 1;
  border-radius: 1.875rem;
  min-height: 42rem;

  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: block;
  }
`

const Steps = styled.ol`
  grid-row: 1 / -1;

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

const BackContainer = styled.div`
  margin-top: 4rem;
  padding: 0 4rem;

  button > svg {
    margin-right: 0.625rem;
  }
`
