import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

export const getEvents = async (
  queryParams: string
): Promise<APIResponseData<'api::event.event'>[]> => {
  const apiEndpoint = `/events?${queryParams}`
  const response =
    await fetchCMS<APIResponseData<'api::event.event'>[]>(apiEndpoint)
  const { data } = response
  return data
}
