import { getEvents as getEventsService } from './events.actions'

export const Events = {
  getEvents: (queryParams: string) => getEventsService(queryParams),
}
