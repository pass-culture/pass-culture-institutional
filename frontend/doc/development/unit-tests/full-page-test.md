# Full page test

## Render test

```tsx
import React from 'react'
import { describe, expect, it } from 'vitest'

import Home from './index'
import { render } from '@/tests'

describe('Home page', () => {
  it('should render the page', () => {
    const { container } = render(<Home />)

    expect(container).toMatchSnapshot()
  })
})
```

---

## Accessibility

Accessibility test should be on all **pages** or **modals**

```tsx
import React from 'react'
import { describe, expect, it } from 'vitest'
import { axe } from 'vitest-axe'

import Home from './index'
import { render } from '@/tests'

describe('Home page', () => {
  it('should pass axe accessibility tests', async () => {
    const { container } = render(<Home />)

    expect(await axe(container)).toHaveNoViolations()
  })
})
```

> 💡 It is possible to generate an accessible test model with the snippet (vscode) `a11y-test`
