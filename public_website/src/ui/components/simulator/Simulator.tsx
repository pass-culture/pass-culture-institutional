import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { OutlinedText } from '../OutlinedText'
import { AmountScreen } from './AmountScreen'
import { BackButton } from './BackButton'
import { FailureScreen } from './FailureScreen'
import { Question } from './Question'
import { ResultScreen } from './ResultScreen'
import { Step } from './Step'
import { APIResponseData } from '@/types/strapi'
import { stripTags } from '@/utils/stripTags'

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
  // Each number in the array represents an answer or validated step
  const [answers, setAnswers] = useState<number[]>([])
  const [isPristine, setIsPristine] = useState(true)

  function onAnswerSubmit(newAnswers: number[]) {
    setAnswers(newAnswers)
    setIsPristine(false)
  }

  // Reset the focus at the start of the current step whenever it changes
  const stepContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (answers.length !== 0 || !isPristine) {
      stepContainerRef.current?.focus()
    }
  }, [answers, isPristine])

  let currentStepElement: ReactNode = null
  let isResultScreen = false
  let stepContainerAriaLabel = ''

  if (answers.length === 0) {
    // Age question
    currentStepElement = (
      <Question
        onSubmit={(r) => onAnswerSubmit([r])}
        title={props.ageQuestion.title}
        answers={props.ageQuestion.answers}
        type="slider"
      />
    )
    stepContainerAriaLabel = props.ageQuestion.title
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
      isResultScreen = true
      stepContainerAriaLabel = props.tooYoungScreen.title
    } else if (answers[0] === 5) {
      // More than 18 yo
      currentStepElement = (
        <FailureScreen
          title={props.tooOldScreen.title}
          text={props.tooOldScreen.text}
          ctaLink={props.tooOldScreen.cta}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = props.tooOldScreen.title
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
          onNext={() => onAnswerSubmit([ageAnswer, 0])}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = screen.title
    }
  } else if (answers.length === 2) {
    // Nationnality question
    const previousAnswers = answers.slice(0, 2)
    currentStepElement = (
      <Question
        onSubmit={(r) => onAnswerSubmit([...previousAnswers, r])}
        title={props.nationnalityQuestion.title}
        answers={props.nationnalityQuestion.answers}
        type="radio"
      />
    )
    stepContainerAriaLabel = props.nationnalityQuestion.title
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
      isResultScreen = true
      stepContainerAriaLabel = props.successScreen.title
    } else {
      // Residency time question
      const previousAnswers = answers.slice(0, 3)
      currentStepElement = (
        <Question
          onSubmit={(r) => setAnswers([...previousAnswers, r])}
          title={props.residencyQuestion.title}
          answers={props.residencyQuestion.answers}
          type="radio"
        />
      )
      stepContainerAriaLabel = props.residencyQuestion.title
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
      isResultScreen = true
      stepContainerAriaLabel = props.successScreen.title
    } else {
      // Failure
      currentStepElement = (
        <FailureScreen
          title={props.failureScreen.title}
          text={props.failureScreen.text}
          ctaLink={props.failureScreen.cta}
        />
      )
      isResultScreen = true
      stepContainerAriaLabel = props.failureScreen.title
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
      <Inner $showingResult={isResultScreen}>
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
          {answers.length > 0 && <BackButton onClick={handleBackClick} />}
        </BackContainer>

        <StepContainer
          tabIndex={-1}
          aria-label={stripTags(stepContainerAriaLabel)}
          ref={stepContainerRef}>
          {currentStepElement}
        </StepContainer>
      </Inner>

      <TopEmoji shadow aria-hidden="true">
        {props.topEmoji}
      </TopEmoji>
      <BottomEmoji shadow aria-hidden="true">
        {props.bottomEmoji}
      </BottomEmoji>
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
    z-index: -1;
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
  box-shadow: ${({ theme }) => theme.shadows.sticker};
  background-color: ${({ theme, $showingResult }) =>
    $showingResult ? theme.colors.lightGray : theme.colors.white};
  position: relative;
  border-radius: 1.875rem;
  min-height: 42rem;

  display: grid;
  grid-template-columns: 21rem 1fr;
  grid-template-rows: auto 1fr;

  @media (width < ${({ theme }) => theme.mediaQueries.mobile}) {
    display: block;
  }
`

const Steps = styled.ol`
  grid-row: 1 / -1;

  padding: 6.25rem 4rem;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};

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
    background-color: ${({ theme }) => theme.colors.darkGray};
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

const StepContainer = styled.div`
  &:focus {
    outline: none;
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
