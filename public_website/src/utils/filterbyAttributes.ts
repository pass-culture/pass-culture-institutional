import { APIResponseData } from '@/types/strapi'

type Filtre =
  | ({ id: number } & Omit<object & { filtre: string }, never>[])
  | undefined

type Data =
  | APIResponseData<'api::event.event'>[]
  | APIResponseData<'api::news.news'>[]

export const filterByAttribute = (filtres: Filtre, data: Data) => {
  const _filtres = structuredClone(filtres)
  const _data = structuredClone(data)

  // Fonction pour obtenir les valeurs uniques d'un attribut
  const uniqueValue = <
    T extends
      | APIResponseData<'api::event.event'>
      | APIResponseData<'api::news.news'>,
  >(
    data: T[],
    attribute: (item: T) => string
  ): string[] => {
    return Array.from(new Set(data.map(attribute)))
  }

  return _filtres?.map((filtre) => {
    let uniqueValues: string[] = []

    switch (filtre.filtre) {
      case "Secteur d'activités":
        uniqueValues = uniqueValue(
          _data as APIResponseData<'api::event.event'>[],
          (item) => item.attributes.secteur
        )
        break
      case 'Catégorie':
        uniqueValues = uniqueValue(
          _data as APIResponseData<'api::news.news'>[],
          (item) => item.attributes.category
        )
        break
      case 'Localisation':
        uniqueValues = uniqueValue(
          _data as APIResponseData<'api::news.news'>[],
          (item) => item.attributes.localisation
        )
        break
      default:
        break
    }

    return {
      ...filtre,
      value: uniqueValues,
    }
  })
}
