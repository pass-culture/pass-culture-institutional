import React, { useEffect, useRef, useState } from 'react'
import styled, { css } from 'styled-components'

import { ArrowDown } from '../icons/ArrowDown'

/**
 * This a simplify version of scroll anchor, wrap your compoonent with a span
 * and id target-anchor-scroll for scrolling you page to the anchor (only one per page!!)
 *
 */
const ButtonScrollTo = (props: { noTranslate: boolean }) => {
  const { noTranslate } = props
  const prevScrollPos = useRef<number>(0)
  const [isVisible, setIsVisible] = useState<boolean>(true)
  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault()

    const anchorTarget = document.getElementById('target-anchor-scroll')
    anchorTarget?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  useEffect(() => {
    const toggleVisibility = () => {
      const currentScrollPos = window.scrollY

      if (currentScrollPos > 10) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }

      prevScrollPos.current = currentScrollPos
    }

    window.addEventListener('scroll', toggleVisibility)

    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  return (
    <StyledButton
      type="button"
      aria-label="Descendre dans la page"
      $noTranslate={noTranslate}
      $isVisible={isVisible}
      onClick={(event) => handleClick(event)}>
      <StyledWrappSvg>
        <ArrowDown />
      </StyledWrappSvg>
    </StyledButton>
  )
}

export default ButtonScrollTo

const StyledButton = styled.button<{
  $noTranslate?: boolean
  $isVisible: boolean
}>`
  ${({ theme, $noTranslate, $isVisible }) => css`
    width: 4.375rem;
    height: 4.375rem;
    max-width: 4.375rem;
    max-height: 4.375rem;
    min-width: 4.375rem;
    min-height: 4.375rem;
    background-color: ${theme.colors.secondary};
    position: fixed;
    top: calc(100vh - 8rem);
    left: 50%;
    margin-left: -2.1875rem;
    border-radius: 100%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    outline-offset: 0.125rem;
    z-index: 1000;
    ${$noTranslate &&
    css`
      transform: translateY(0rem);
    `};
    ${!$isVisible &&
    css`
      opacity: 0;
      visibilty: hidden;
      cursor: inherit;
      pointer-events: none;
    `};
    &:hover {
      background-color: ${theme.uniqueColors.blueDark};
    }
    &:active {
      outline: 2px solid ${theme.colors.secondary};
    }

    @media (width < ${theme.mediaQueries.tablet}) {
      top: calc(100vh - 10rem);
    }
  `}
`

const StyledWrappSvg = styled.div`
  width: 2.1875rem;
  height: 2.1875rem;
  color: white;
  animation: move 1s ease-in-out infinite;

  @keyframes move {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(0.5rem);
    }
    100% {
      transform: translateY(0);
    }
  }
`
