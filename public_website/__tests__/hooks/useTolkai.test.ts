import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { renderHook } from '..'
import { useTolkai } from '@/hooks/useTolkai'

const TOLKAI_SCRIPT_SELECTOR =
  'script[src="https://script.tolk.ai/iframe-latest.js"]'
const BOT_ID = 'test-bot-id-123'

const getScript = () => document.querySelector(TOLKAI_SCRIPT_SELECTOR)

beforeEach(() => {
  process.env.NEXT_PUBLIC_TOLKAI_BOT_ID = BOT_ID
  delete window.tcfbot
  delete window.TcfWbchtParams
  getScript()?.remove()
})

afterEach(() => {
  delete window.tcfbot
  delete window.TcfWbchtParams
  getScript()?.remove()
})

describe('useTolkai', () => {
  describe('when chatbot consent is refused', () => {
    it('should not inject the script', () => {
      renderHook(() => useTolkai({ firebase: false, tolkai: false }))

      expect(getScript()).toBeNull()
    })

    it('should not set globals', () => {
      renderHook(() => useTolkai({ firebase: false, tolkai: false }))

      expect(window.tcfbot).toBeUndefined()
      expect(window.TcfWbchtParams).toBeUndefined()
    })
  })

  describe('when chatbot consent is accepted', () => {
    it('should inject the Tolk.ai script in the DOM', () => {
      renderHook(() => useTolkai({ firebase: true, tolkai: true }))

      expect(getScript()).not.toBeNull()
    })

    it('should set window.tcfbot to the bot id', () => {
      renderHook(() => useTolkai({ firebase: true, tolkai: true }))

      expect(window.tcfbot).toBe(BOT_ID)
    })

    it('should set window.TcfWbchtParams with default behaviour', () => {
      renderHook(() => useTolkai({ firebase: true, tolkai: true }))

      expect(window.TcfWbchtParams).toEqual({ behaviour: 'default' })
    })

    it('should not inject the script twice on re-render', () => {
      const { rerender } = renderHook(({ vendors }) => useTolkai(vendors), {
        initialProps: { vendors: { firebase: true, tolkai: true } },
      })

      rerender({ vendors: { firebase: true, tolkai: true } })

      expect(document.querySelectorAll(TOLKAI_SCRIPT_SELECTOR)).toHaveLength(1)
    })
  })

  describe('when NEXT_PUBLIC_TOLKAI_BOT_ID is not defined', () => {
    it('should not inject the script and warn', () => {
      delete process.env.NEXT_PUBLIC_TOLKAI_BOT_ID
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      renderHook(() => useTolkai({ firebase: true, tolkai: true }))

      expect(getScript()).toBeNull()
      expect(warnSpy).toHaveBeenCalledWith(
        '[Tolk.ai] NEXT_PUBLIC_TOLKAI_BOT_ID is not defined. Chatbot will not load.'
      )

      warnSpy.mockRestore()
    })
  })

  describe('cleanup on unmount', () => {
    it('should remove the script from the DOM', () => {
      const { unmount } = renderHook(() =>
        useTolkai({ firebase: true, tolkai: true })
      )

      expect(getScript()).not.toBeNull()
      unmount()
      expect(getScript()).toBeNull()
    })

    it('should clear window globals', () => {
      const { unmount } = renderHook(() =>
        useTolkai({ firebase: true, tolkai: true })
      )

      unmount()

      expect(window.tcfbot).toBeUndefined()
      expect(window.TcfWbchtParams).toBeUndefined()
    })
  })

  describe('when consent is revoked after acceptance', () => {
    it('should remove the script when tolkai consent switches from true to false', () => {
      const { rerender } = renderHook(({ vendors }) => useTolkai(vendors), {
        initialProps: { vendors: { firebase: true, tolkai: true } },
      })

      expect(getScript()).not.toBeNull()

      rerender({ vendors: { firebase: true, tolkai: false } })

      expect(getScript()).toBeNull()
      expect(window.tcfbot).toBeUndefined()
      expect(window.TcfWbchtParams).toBeUndefined()
    })
  })
})
