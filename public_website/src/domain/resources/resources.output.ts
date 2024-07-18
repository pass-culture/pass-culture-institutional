import { getResources as getResourcesService } from './resources.actions'

export const Resources = {
  getResources: (queryParams: string) => getResourcesService(queryParams),
}
