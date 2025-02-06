import React, { ReactNode, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import { OutlinedText } from '../OutlinedText'
import { AmountScreen } from './AmountScreen'
import { BackButton } from './BackButton'
import { FailureScreen } from './FailureScreen'
import { Question } from './Question'
import { ResultScreen } from './ResultScreen'
import { Step as StepUI } from './Step'
import { theme } from '@/theme/theme'
import { APIResponseData } from '@/types/strapi'
import { stripTags } from '@/utils/stripTags'

interface SimulatorProps {
  className?: string

  ageQuestion: APIResponseData<'api::simulator.simulator'>['attributes']['ageQuestion']
  nationnalityQuestion: APIResponseData<'api::simulator.simulator'>['attributes']['nationnalityQuestion']
  residencyQuestion: APIResponseData<'api::simulator.simulator'>['attributes']['residencyQuestion']

  tooYoungScreen: APIResponseData<'api::simulator.simulator'>['attributes']['tooYoungScreen']
  amountScreen15: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_15']
  amountScreen16: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_16']
  amountScreen17: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_17']
  amountScreen18: APIResponseData<'api::simulator.simulator'>['attributes']['amountScreen_18']
  tooOldScreen: APIResponseData<'api::simulator.simulator'>['attributes']['tooOldScreen']

  successScreen: APIResponseData<'api::simulator.simulator'>['attributes']['successScreen']
  failureScreen: APIResponseData<'api::simulator.simulator'>['attributes']['failureScreen']

  steps: string[]
  topEmoji: string
  bottomEmoji: string
}

enum NationalityAnswer {
  FRANCE = 0,
  OTHER = 1,
}

enum ResidencyAnswer {
  MORE_THAN_A_YEAR = 0,
  LESS_THAN_A_YEAR = 1,
}

enum Step {
  AGE = 'AGE',
  TOO_YOUNG = 'TOO_YOUNG',
  TOO_OLD = 'TOO_OLD',
  NATIONALITY = 'NATIONALITY',
  RESIDENCY = 'RESIDENCY',
  AMOUNT = 'AMOUNT',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
}

/**
 * Store user responses in an object.
 * The answer to the age question is now a number (the index of the chosen answer).
 */
interface StepAnswers {
  age: number | null
  nationality: NationalityAnswer | null
  residency: ResidencyAnswer | null
}

/**
 * Determines the next step based on the current step and the given answer.
 * For the AGE step, the text of the response is checked.
 * If the text contains '-' → TOO_YOUNG, if it contains '+' → TOO_OLD, otherwise proceed.
 */
function getNextStep(
  currentStep: Step,
  answer: number,
  ageAnswers?: string[]
): Step {
  switch (currentStep) {
    case Step.AGE: {
      const answerText = ageAnswers?.[answer]?.trim()
      if (answerText?.includes('-')) return Step.TOO_YOUNG
      if (answerText?.includes('+')) return Step.TOO_OLD
      return Step.NATIONALITY
    }
    case Step.NATIONALITY: {
      if (answer === NationalityAnswer.FRANCE) return Step.AMOUNT
      return Step.RESIDENCY
    }
    case Step.RESIDENCY: {
      if (answer === ResidencyAnswer.MORE_THAN_A_YEAR) return Step.AMOUNT
      return Step.FAILURE
    }
    case Step.AMOUNT: {
      return Step.SUCCESS
    }
    case Step.TOO_YOUNG:
    case Step.TOO_OLD:
    case Step.SUCCESS:
    case Step.FAILURE: {
      return currentStep
    }
  }
}

/**
 * Indicates whether the current step is a result screen.
 */
function isResultStep(step: Step) {
  return (
    step === Step.TOO_YOUNG ||
    step === Step.TOO_OLD ||
    step === Step.SUCCESS ||
    step === Step.FAILURE
  )
}

export function Simulator(props: SimulatorProps) {
  const [currentStep, setCurrentStep] = useState<Step>(Step.AGE)

  /**
   * Store user responses.
   * For the age question, store the index of the selected answer.
   */
  const [stepAnswers, setStepAnswers] = useState<StepAnswers>({
    age: null,
    nationality: null,
    residency: null,
  })

  const stepContainerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    stepContainerRef.current?.focus()
  }, [currentStep])

  /**
   * When an answer is selected, store it and move to the next step.
   */
  function handleAnswer(answer: number) {
    setStepAnswers((prev) => {
      const next = { ...prev }
      switch (currentStep) {
        case Step.AGE:
          next.age = answer
          break
        case Step.NATIONALITY:
          next.nationality = answer as NationalityAnswer
          break
        case Step.RESIDENCY:
          next.residency = answer as ResidencyAnswer
          break
        case Step.AMOUNT:
        default:
          break
      }
      return next
    })
    if (currentStep === Step.AGE) {
      setCurrentStep((prev) =>
        getNextStep(
          prev,
          answer,
          props.ageQuestion.answers.map((a) => a.answer)
        )
      )
    } else {
      setCurrentStep((prev) => getNextStep(prev, answer))
    }
  }

  function handleBackClick() {
    setCurrentStep((prev) => {
      switch (prev) {
        case Step.TOO_OLD:
        case Step.NATIONALITY:
          setStepAnswers((sa) => ({
            ...sa,
            nationality: null,
          }))
          return Step.AGE
        case Step.TOO_YOUNG:
          return Step.AGE
        case Step.RESIDENCY:
          setStepAnswers((sa) => ({
            ...sa,
            residency: null,
          }))
          return Step.NATIONALITY
        case Step.AMOUNT: {
          const { nationality } = stepAnswers
          return nationality === NationalityAnswer.FRANCE
            ? Step.NATIONALITY
            : Step.RESIDENCY
        }
        case Step.SUCCESS:
          return Step.AMOUNT
        case Step.FAILURE:
          return Step.RESIDENCY
        default:
          return Step.AGE
      }
    })
  }

  function getDisplayedSteps(): string[] {
    let maxStepIndex = 0
    switch (currentStep) {
      case Step.AGE:
      case Step.TOO_YOUNG:
      case Step.TOO_OLD:
        maxStepIndex = 1
        break
      case Step.NATIONALITY:
        maxStepIndex = 2
        break
      case Step.RESIDENCY:
        maxStepIndex = 3
        break
      case Step.AMOUNT:
      case Step.SUCCESS:
      case Step.FAILURE:
        maxStepIndex = 4
        break
      default:
        maxStepIndex = 1
    }
    return props.steps.slice(0, maxStepIndex)
  }

  let stepContainerAriaLabel = ''
  let stepComponent: ReactNode = null

  switch (currentStep) {
    case Step.AGE: {
      stepContainerAriaLabel = props.ageQuestion.title
      stepComponent = (
        <Question
          key="age-question"
          onSubmit={handleAnswer}
          title={props.ageQuestion.title}
          answers={props.ageQuestion.answers}
          type="slider"
        />
      )
      break
    }
    case Step.TOO_YOUNG: {
      stepContainerAriaLabel = props.tooYoungScreen.title
      stepComponent = (
        <FailureScreen
          title={props.tooYoungScreen.title}
          text={props.tooYoungScreen.text}
          ctaLink={props.tooYoungScreen.cta}
        />
      )
      break
    }
    case Step.TOO_OLD: {
      stepContainerAriaLabel = props.tooOldScreen.title
      stepComponent = (
        <FailureScreen
          title={props.tooOldScreen.title}
          text={props.tooOldScreen.text}
          ctaLink={props.tooOldScreen.cta}
        />
      )
      break
    }
    case Step.NATIONALITY: {
      stepContainerAriaLabel = props.nationnalityQuestion.title
      stepComponent = (
        <Question
          key="nationality-question"
          onSubmit={handleAnswer}
          title={props.nationnalityQuestion.title}
          answers={props.nationnalityQuestion.answers}
          type="radio"
        />
      )
      break
    }
    case Step.RESIDENCY: {
      stepContainerAriaLabel = props.residencyQuestion.title
      stepComponent = (
        <Question
          key="residency-question"
          onSubmit={handleAnswer}
          title={props.residencyQuestion.title}
          answers={props.residencyQuestion.answers}
          type="radio"
        />
      )
      break
    }
    case Step.AMOUNT: {
      const ageIndex = stepAnswers.age ?? 0
      const ageText = props.ageQuestion.answers[ageIndex]?.answer.trim() ?? ''
      const match = /\d+/.exec(ageText)
      const ageNumber = match ? parseInt(match[0], 10) : null

      let screen
      if (ageNumber !== null) {
        switch (ageNumber) {
          case 15:
            screen = props.amountScreen15
            break
          case 16:
            screen = props.amountScreen16
            break
          case 17:
            screen = props.amountScreen17
            break
          case 18:
            screen = props.amountScreen18
            break
          default:
            screen = props.amountScreen18
        }
      } else {
        screen = props.amountScreen18
      }

      stepContainerAriaLabel = screen.title
      stepComponent = (
        <AmountScreen
          text={screen.text}
          title={screen.title}
          onNext={() => handleAnswer(0)}
        />
      )
      break
    }
    case Step.SUCCESS: {
      stepContainerAriaLabel = props.successScreen.title
      stepComponent = (
        <ResultScreen
          title={props.successScreen.title}
          steps={props.successScreen.steps.map((s) => s.step)}
          ctaLink={props.successScreen.cta}
          helpText={props.successScreen.needSupport}
          supportLink={props.successScreen.supportLink}
        />
      )
      break
    }
    case Step.FAILURE: {
      stepContainerAriaLabel = props.failureScreen.title
      stepComponent = (
        <FailureScreen
          title={props.failureScreen.title}
          text={props.failureScreen.text}
          ctaLink={props.failureScreen.cta}
        />
      )
      break
    }
  }

  const showingResult = isResultStep(currentStep)
  const displayedSteps = getDisplayedSteps()

  return (
    <Root className={props.className}>
      <Inner $showingResult={showingResult}>
        <Steps>
          {displayedSteps.map((step, i) => (
            <React.Fragment key={step}>
              {i !== 0 && <StepSeparator aria-hidden="true" />}
              <StepUI
                circleText={(i + 1).toString().padStart(2, '0')}
                surtitle={`Étape ${i + 1}`}
                title={step}
                isActive={i + 1 === displayedSteps.length}
              />
            </React.Fragment>
          ))}
        </Steps>

        <BackContainer>
          {currentStep !== Step.AGE && <BackButton onClick={handleBackClick} />}
        </BackContainer>

        <StepContainer
          ref={stepContainerRef}
          tabIndex={-1}
          aria-label={stripTags(stepContainerAriaLabel)}>
          {stepComponent}
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
`

const TopEmoji = styled(OutlinedText)`
  position: absolute;
  top: 0;
  right: 3rem;
  font-size: 5rem;
  transform: translateY(-50%) rotate(-16.81deg);

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
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

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    display: none;
  }
`

const Inner = styled.div<{ $showingResult: boolean }>`
  box-shadow: ${({ theme }) => theme.shadows.sticker};
  background-color: ${({ theme, $showingResult }) =>
    $showingResult ? theme.colors.lightGray : theme.colors.white};
  position: relative;
  border-radius: ${theme.radius.sm};
  min-height: 42rem;
  border: 1px solid #cbcdd2;
  display: grid;
  grid-template-columns: 21rem 1fr;
  grid-template-rows: auto 1fr;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    display: block;
    min-height: 41rem;
  }
`

const Steps = styled.ol`
  grid-row: 1 / -1;

  padding: 6.25rem 4rem;
  border-right: 1px solid ${({ theme }) => theme.colors.gray};

  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
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

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
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

  @media (width < ${({ theme }) => theme.mediaQueries.largeDesktop}) {
    padding: 0 1.5rem;
    margin-top: 0;
  }
`
