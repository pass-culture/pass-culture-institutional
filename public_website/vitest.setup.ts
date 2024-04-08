import { afterAll, beforeAll, expect, vi } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import * as matchers from 'vitest-axe/matchers'

import 'vitest-canvas-mock'
import { server } from './__tests__/server'

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

expect.extend(matchers)

// Mock useRouter and usePathname, required by the Breadcrumb component
vi.mock('next/navigation', async () => {
  const actual = (await vi.importActual('next/navigation')) as object
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    usePathname: vi.fn(),
  }
})

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
