import { APIResponseData } from '@/types/strapi'
import { fetchCMS } from '@/utils/fetchCMS'

export const getPage = async (
  section: string,
  queryParams: string
): Promise<
  | APIResponseData<'api::page.page'>[]
  | APIResponseData<'api::home.home'>[]
  | APIResponseData<'api::ressourcepass.ressourcepass'>[]
  | APIResponseData<'api::news.news'>[]
  | APIResponseData<'api::event.event'>[]
  | APIResponseData<'api::help.help'>
  | APIResponseData<'api::actualites-pass-culture.actualites-pass-culture'>
  | APIResponseData<'api::simulator.simulator'>
  | APIResponseData<'api::liste-jeune.liste-jeune'>
  | APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>
  | APIResponseData<'api::help-cultural-actors.help-cultural-actors'>
  | APIResponseData<'api::help-teachers.help-teachers'>
  | APIResponseData<'api::resource.resource'>[]
  | APIResponseData<'api::liste-offre.liste-offre'>
  | APIResponseData<'api::presse.presse'>
  | APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
> => {
  const apiEndpoint =
    queryParams.trim().length > 0 ? `/${section}?${queryParams}` : `/${section}`
  const response = await fetchCMS<
    | APIResponseData<'api::page.page'>[]
    | APIResponseData<'api::home.home'>[]
    | APIResponseData<'api::ressourcepass.ressourcepass'>[]
    | APIResponseData<'api::event.event'>[]
    | APIResponseData<'api::news.news'>[]
    | APIResponseData<'api::help.help'>
    | APIResponseData<'api::actualites-pass-culture.actualites-pass-culture'>
    | APIResponseData<'api::simulator.simulator'>
    | APIResponseData<'api::actualites-rdv-acteurs-culturel.actualites-rdv-acteurs-culturel'>
    | APIResponseData<'api::liste-jeune.liste-jeune'>
    | APIResponseData<'api::help-cultural-actors.help-cultural-actors'>
    | APIResponseData<'api::help-teachers.help-teachers'>
    | APIResponseData<'api::resource.resource'>[]
    | APIResponseData<'api::liste-offre.liste-offre'>
    | APIResponseData<'api::presse.presse'>
    | APIResponseData<'api::etudes-pass-culture.etudes-pass-culture'>
  >(apiEndpoint)
  const { data } = response
  return data
}
