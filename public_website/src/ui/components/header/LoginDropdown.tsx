import React, { Ref, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { LoginItem } from './LoginItem'

export type LoginItemProps = {
  Label: string
  URL: string
  Color: string
  Emoji: string
}

type LoginDropdownProps = {
  items: LoginItemProps[]
  openButtonElement: HTMLButtonElement | null
  onKeyDown: () => void
  onBlur: () => void
}

export function LoginDropdown({
  items,
  openButtonElement,
  onKeyDown,
  onBlur,
}: LoginDropdownProps) {
  const loginDropdownRef = useRef<HTMLDivElement>(null)

  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onKeyDown()
    }
  }

  function onClickOutside(e: MouseEvent) {
    if (!loginDropdownRef.current?.contains(e.target as HTMLElement)) {
      if (openButtonElement !== (e.target as HTMLElement)) {
        onBlur()
      }
    } else {
      const { nodeName } = e.target as HTMLElement

      if (
        nodeName === 'A' ||
        (e.target as HTMLElement).parentElement?.nodeName === 'A'
      ) {
        onBlur()
      }
    }
  }

  useEffect(() => {
    const loginDropdownElement = loginDropdownRef.current

    loginDropdownElement?.addEventListener('keydown', onEscape)
    window?.addEventListener('click', onClickOutside)

    return () => {
      loginDropdownElement?.removeEventListener('keydown', onEscape)
      window?.removeEventListener('click', onClickOutside)
    }
  })

  return (
    <StyledLoginDropdown ref={loginDropdownRef}>
      <ul aria-labelledby="login-dropdown" id="login-menu">
        {items.map((item, i) => (
          <React.Fragment key={i}>
            <LoginItem {...item} />
            {i !== items.length - 1 && <li aria-hidden="true"></li>}
          </React.Fragment>
        ))}
      </ul>
    </StyledLoginDropdown>
  )
}

const StyledLoginDropdown = styled.div<{ ref: Ref<HTMLDivElement> }>`
  ${({ theme }) => css`
    position: absolute;
    top: calc(100% + 2rem);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;

    ul {
      background: ${theme.colors.white};
      box-shadow: -4px 8px 14px 0px #9f9f9f26;
      border-radius: 1rem;
      padding: 2rem;
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 2rem;

      &::after {
        content: '';
        width: 2rem;
        height: 2rem;
        background: ${theme.colors.white};
        border-radius: 0.25rem;
        position: absolute;
        top: -0.5rem;
        left: calc(50%);
        transform: translateX(-50%) rotate(45deg);
      }
    }
  `}
`
