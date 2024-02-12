import React, { Ref, useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styled, { css } from 'styled-components'

import ArrowRight from '../../../../public/images/arrow-right.svg'

const loginItems = [
  {
    emoji: '👩‍🎓',
    label: 'Je suis un jeune entre 15 et 18 ans',
    url: '#',
    color: '#94008C',
  },
  {
    emoji: '🎭',
    label: 'Je suis un acteur du secteur culturel',
    url: '#',
    color: '#36106A',
  },
]

type LoginDropdownProps = {
  openButtonElement: HTMLButtonElement | null
  onKeyDown: () => void
  onBlur: () => void
}

export function LoginDropdown({
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
        {loginItems.map((item, i) => (
          <React.Fragment key={i}>
            <StyledLoginDropdownItem>
              <Link href={item.url}>
                {/* @ts-expect-error: FIXME: allow setting inline CSS properties */}
                <span style={{ '--login-item-color': item.color }}>
                  <span>{item.emoji}</span>
                </span>
                <p>{item.label}</p>
                <Image src={ArrowRight} alt="" />
              </Link>
            </StyledLoginDropdownItem>
            {i !== loginItems.length - 1 && <li aria-hidden="true"></li>}
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

const StyledLoginDropdownItem = styled.li`
  ${({ theme }) => css`
    &[aria-hidden] {
      background-color: ${theme.colors.black};
      opacity: 0.2;
      height: 1px;
      width: 100%;
    }

    a {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.875rem;

      > span {
        background-color: var(--login-item-color);
        height: 3.5rem;
        width: 3.5rem;
        border-radius: 0.625rem;
        display: flex;
        align-items: center;
        justify-content: center;

        span {
          font-size: ${theme.fonts.sizes['3xl']};
        }
      }

      p {
        font-weight: ${theme.fonts.weights.semiBold};
        font-size: ${theme.fonts.sizes.xl};
        flex-shrink: 0;
        max-width: 16ch;
      }
    }
  `}
`
