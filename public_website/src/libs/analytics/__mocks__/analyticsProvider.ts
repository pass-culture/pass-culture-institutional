import { vi } from 'vitest'

export const analyticsProvider = {
  init: vi.fn(),
  logEvent: vi.fn(),
}
