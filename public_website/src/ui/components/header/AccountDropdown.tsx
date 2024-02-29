import React, { Ref, useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'

import { AccountItem } from './AccountItem'

export type AccountItemProps = {
  label: string
  url: string
  color: string
  emoji: string
}

type AccountDropdownProps = {
  items: AccountItemProps[]
  openButtonElement: HTMLButtonElement | null
  labelId: string
  align?: 'left' | 'right'
  onKeyDown: () => void
  onBlur: () => void
}

export function AccountDropdown({
  items,
  openButtonElement,
  labelId,
  align,
  onKeyDown,
  onBlur,
}: AccountDropdownProps) {
  const accountDropdownRef = useRef<HTMLDivElement>(null)

  function onEscape(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      onKeyDown()
    }
  }

  function onClickOutside(e: MouseEvent) {
    if (!accountDropdownRef.current?.contains(e.target as HTMLElement)) {
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
    const accountDropdownElement = accountDropdownRef.current

    accountDropdownElement?.addEventListener('keydown', onEscape)
    window?.addEventListener('click', onClickOutside)

    return () => {
      accountDropdownElement?.removeEventListener('keydown', onEscape)
      window?.removeEventListener('click', onClickOutside)
    }
  })

  return (
    <StyledAccountDropdown ref={accountDropdownRef} $align={align}>
      <ul aria-labelledby={labelId} id="account-menu">
        {items.map((item, i) => (
          <React.Fragment key={item.label}>
            <AccountItem {...item} />
            {i !== items.length - 1 && <li aria-hidden="true"></li>}
          </React.Fragment>
        ))}
      </ul>
    </StyledAccountDropdown>
  )
}

const StyledAccountDropdown = styled.div<{
  ref: Ref<HTMLDivElement>
  $align?: 'left' | 'right'
}>`
  ${({ theme, $align }) => css`
    position: absolute;
    top: calc(100% + 2rem);
    left: 50%;
    transform: translateX(-50%);
    width: max-content;

    ${$align === 'right' &&
    `
      right: 0;
      left: auto;
      transform: none;
    `}

    ${$align === 'left' &&
    `
      left: 0;
      transform: none;
    `}

    ul {
      background: ${theme.colors.white};
      box-shadow: ${theme.shadows.popover};
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

        ${$align === 'right' &&
        `
          right: 2rem;
          left: auto;
          transform: rotate(45deg);
        `}

        ${$align === 'left' &&
        `
          left: 2rem;
          transform: rotate(45deg);
        `}
      }
    }
  `}
`
