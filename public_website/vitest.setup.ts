import { afterAll, beforeAll, expect } from 'vitest'
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

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
