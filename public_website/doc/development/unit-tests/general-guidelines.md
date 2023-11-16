# General guidelines

## FIRST principles

- Fast: Could be run anytime during the development phase
- Independent/Isolated: Test should also follow 3A (Arrange, Act, Assert, ou Given-When-Then) and test one functionality
- Repeatable: Each test should give the same result each time it runs
- Self-validating: The output of a test should be "yes" or "no", and not some values to check
- Thorough: Tests must cover all possibilities and edge cases
- Timely: Test should be written before their feature (TDD)

## When to use snapshot

**Snapshots** are used when testing

- a page
- a modale

**Snapshots** are not used when testing

- a unit component
- a component that is already tested in storybook

---

## When to use queryBy, findBy and getBy

- Prove that an element exists with `getBy` + `expect(…).toBeInTheDocument()`
- Prove that an element does not exist with `queryBy` + `expect(…).toBeNull()`
- Query an element to process some action on it with `getBy` + action
- **Prefer to use** `await findBy`instead of `waitFor(getBy)`or `waitFor(queryBy)` as it is equivalent`,

More details in [react testing library doc](https://testing-library.com/docs/queries/about/#priority)
