import { expect } from 'vitest'
import type { AxeMatchers } from 'vitest-axe/matchers'
import * as matchers from 'vitest-axe/matchers'

import 'vitest'
import 'vitest-canvas-mock'

expect.extend(matchers)

declare module 'vitest' {
  export interface Assertion extends AxeMatchers {}
  export interface AsymmetricMatchersContaining extends AxeMatchers {}
}
