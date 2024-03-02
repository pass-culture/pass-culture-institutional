import React, { useState } from 'react'
import { ReactNode } from 'react'
import styled from 'styled-components'

import { OutlinedText } from '../OutlinedText'
import { AmountScreen } from './AmountScreen'
import { BackButton } from './BackButton'
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

  amountScreen15: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_15']
  amountScreen16: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_16']
  amountScreen17: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_17']
  amountScreen18: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_18']

  successScreen: APIResponseData<'api::simulator.simulator'>['attributes']['successScreen']
  failureScreen: APIResponseData<'api::simulator.simulator'>['attributes']['failureScreen']
  tooYoungScreen: APIResponseData<'api::simulator.simulator'>['attributes']['tooYoungScreen']
  tooOldScreen: APIResponseData<'api::simulator.simulator'>['attributes']['tooOldScreen']
  steps: string[]
  topEmoji: string
  bottomEmoji: string
}

type AmountScreen =
  | SimulatorProps['amountScreen15']
  | SimulatorProps['amountScreen16']
  | SimulatorProps['amountScreen17']
  | SimulatorProps['amountScreen18']

export function Simulator(props: SimulatorProps) {
  const currentStep = 'amount' as string

  // Each number in the array represents an answer or validated step
  const [answers, setAnswers] = useState<number[]>([])

  let currentStepElement: ReactNode = null

  if (answers.length === 0) {
    // Age question
    currentStepElement = (
      <Question
        onSubmit={(r) => setAnswers([r])}
        title={props.ageQuestion.title}
        answers={props.ageQuestion.answers.map((a) => a.answer)}
        type="slider"
      />
    )
  } else if (answers.length === 1 && typeof answers[0] === 'number') {
    // Amount screens or failures
    if (answers[0] === 0) {
      // Less than 15 yo
      currentStepElement = (
        <FailureScreen
          title={props.tooYoungScreen.title}
          text={props.tooYoungScreen.text}
          ctaLink={props.tooYoungScreen.cta}
        />
      )
    } else if (answers[0] === 5) {
      // More than 18 yo
      currentStepElement = (
        <FailureScreen
          title={props.tooOldScreen.title}
          text={props.tooOldScreen.text}
          ctaLink={props.tooOldScreen.cta}
        />
      )
    } else {
      // 15, 16, 17, or 18 yo
      const screen = {
        1: props.amountScreen15,
        2: props.amountScreen16,
        3: props.amountScreen17,
        4: props.amountScreen18,
      }[answers[0]] as AmountScreen
      const ageAnswer = answers[0]
      currentStepElement = (
        <AmountScreen
          text={screen.text}
          title={screen.title}
          onNext={() => setAnswers([ageAnswer, 0])}
        />
      )
    }
  } else if (answers.length === 2) {
    // Nationnality question
    const previousAnswers = answers.slice(0, 2)
    currentStepElement = (
      <Question
        onSubmit={(r) => setAnswers([...previousAnswers, r])}
        title={props.nationnalityQuestion.title}
        answers={props.nationnalityQuestion.answers.map((a) => a.answer)}
        type="radio"
      />
    )
  } else if (answers.length === 3) {
    if (answers[2] === 0) {
      // Success screen
      currentStepElement = (
        <ResultScreen
          title={props.successScreen.title}
          steps={props.successScreen.steps.map((s) => s.step)}
          ctaLink={props.successScreen.cta}
          helpText={props.successScreen.needSupport}
          supportLink={props.successScreen.supportLink}
        />
      )
    } else {
      // Residency time question
      const previousAnswers = answers.slice(0, 3)
      currentStepElement = (
        <Question
          onSubmit={(r) => setAnswers([...previousAnswers, r])}
          title={props.residencyQuestion.title}
          answers={props.residencyQuestion.answers.map((a) => a.answer)}
          type="radio"
        />
      )
    }
  } else if (answers.length === 4) {
    if (answers[3] === 0) {
      // More than a year, success
      currentStepElement = (
        <ResultScreen
          title={props.successScreen.title}
          steps={props.successScreen.steps.map((s) => s.step)}
          ctaLink={props.successScreen.cta}
          helpText={props.successScreen.needSupport}
          supportLink={props.successScreen.supportLink}
        />
      )
    } else {
      // Failure
      currentStepElement = (
        <FailureScreen
          title={props.failureScreen.title}
          text={props.failureScreen.text}
          ctaLink={props.failureScreen.cta}
        />
      )
    }
  }

  let displayedSteps = props.steps.slice(0, 1)
  if (answers.length === 2) {
    displayedSteps = props.steps.slice(0, 2)
  } else if (answers.length >= 3) {
    displayedSteps = props.steps.slice(0, 3)
  }

  const handleBackClick = function () {
    setAnswers(answers.slice(0, -1))
  }

  return (
    <Root className={props.className}>
      <Inner $showingResult={currentStep !== 'question'}>
        <Steps>
          {displayedSteps.map((step, i) => (
            <React.Fragment key={step}>
              {i !== 0 && <StepSeparator aria-hidden="true" />}
              <Step
                circleText={(i + 1).toString().padStart(2, '0')}
                surtitle={`ÉTAPE ${i + 1}`}
                title={step}
                isActive={i + 1 === displayedSteps.length}
              />
            </React.Fragment>
          ))}
        </Steps>

        <BackContainer>
          <BackButton onClick={handleBackClick} />
        </BackContainer>

        {currentStepElement}
      </Inner>

      <TopEmoji shadow>{props.topEmoji}</TopEmoji>
      <BottomEmoji shadow>{props.bottomEmoji}</BottomEmoji>
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

const TopEmoji = styled(OutlinedText)`
  position: absolute;
  top: 0;
  right: 3rem;
  font-size: 5rem;
  z-index: 1;
  transform: translateY(-50%) rotate(-16.81deg);

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: none;
  }
`

const BottomEmoji = styled(OutlinedText)`
  position: absolute;
  bottom: 0;
  left: 10rem;
  font-size: 5rem;
  z-index: 1;
  transform: translateY(50%) rotate(8.56deg);

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: none;
  }
`

const Inner = styled.div<{ $showingResult: boolean }>`
  box-shadow: -4px 8px 24px 0px #7d7d7d40;
  background-color: ${({ theme, $showingResult }) =>
    $showingResult ? theme.colors.backgroundGray : theme.colors.white};
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

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    padding: 0 1.5rem;
    margin-top: 0;
  }
`
