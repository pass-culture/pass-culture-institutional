# Analytics

We use Firebase Analytics to track usage of the app. Please get in touch with an admin to get Firebase credentials.

## Usage

To track an new event, first add it to the `EventMap` in [analyticsProvider.ts](../../src/libs/analytics/analyticsProvider.ts):

```ts
export type EventMap = {
  // ... existing events
  my_event: my_params
}
```

Then, log it with the `logEvent` function:

```ts
import { analyticsProvider } from '@/libs/analytics/analyticsProvider'

analyticsProvider.logEvent('my_event', params)
```

## Manual testing

To test that the event is logged correctly, you can use the [Google Analytics Debugger](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) extension for Chrome. It will show you the events that are logged in the console.

With this extension, you can also view events logged in the DebugView in the Firebase console.

For further information, please check <https://firebase.google.com/docs/analytics/debugview#enable_debug_mode>.

## Unit testing

Cf. [Unit testing](./unit-tests/analytics.md)
