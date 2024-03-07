# Unit testing analytics

In the component you log the analytics event, you can mock the `logEvent` function:

```ts
import { analyticsProvider } from '@/libs/analytics/analyticsProvider'

vi.mock('@/libs/analytics/analyticsProvider')
const mockLogEvent = analyticsProvider.logEvent
```

Then, you can test that the event is logged correctly:

```ts
expect(mockLogEvent).toHaveBeenCalledWith('my_event', params)
```
