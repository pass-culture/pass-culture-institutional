import { afterAll, beforeAll, expect } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import * as matchers from 'vitest-axe/matchers'

import 'vitest'
import 'vitest-canvas-mock'
import { server } from '@/tests/server'

beforeAll(() => {
  server.listen()
})

afterAll(() => {
  server.close()
})

expect.extend(matchers)

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
